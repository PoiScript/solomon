import chalk from 'chalk';
import { exec } from 'child_process';
import {
  existsSync,
  outputFile,
  outputJson,
  readFile,
  readJsonSync,
  unlink,
  writeFile,
} from 'fs-extra';
import { resolve } from 'path';
import { promisify } from 'util';

import { svgo } from './svgo';
import { walk } from './util';

const execAsync = promisify(exec);

const latexTemplate = (latex, inline) => `\\documentclass{article}
${findPackages(latex)
  .map(p => `\\usepackage{${p}}`)
  .join('\n')}
\\pagestyle{empty}
\\setlength{\\textwidth}{\\paperwidth}
\\addtolength{\\textwidth}{-3cm}
\\setlength{\\oddsidemargin}{1.5cm}
\\addtolength{\\oddsidemargin}{-2.54cm}
\\setlength{\\evensidemargin}{\\oddsidemargin}
\\setlength{\\textheight}{\\paperheight}
\\addtolength{\\textheight}{-\\headheight}
\\addtolength{\\textheight}{-\\headsep}
\\addtolength{\\textheight}{-\\footskip}
\\addtolength{\\textheight}{-3cm}
\\setlength{\\topmargin}{1.5cm}
\\addtolength{\\topmargin}{-2.54cm}
\\begin{document}
${inline ? '$' : '$$'}${latex}${inline ? '$' : '$$'}
\\end{document}`;

const packages = {
  amssymb: /\\varnothing/,
  amsmath: [/\\begin{cases}/, /\\begin{aligned}/, /\\text/, /\\i{1,3}nt/],
  esint: /\\oiint/,
};

const findPackages = latex => {
  const res = [];
  for (const p in packages) {
    if (Array.isArray(packages[p])) {
      if (packages[p].some(regex => regex.test(latex))) {
        res.push(p);
      }
    } else if (packages[p].test(latex)) {
      res.push(p);
    }
  }
  return res;
};

type LatexImages = {
  [path: string]: {
    [hash: string]: { optimized: boolean; latex: string; inline: boolean };
  };
};

let ltximgs: LatexImages = {};
if (existsSync('public/ltximg.json')) {
  ltximgs = readJsonSync('public/ltximg.json');
}

export const addLatex = (hash, path, latex, inline) => {
  if (typeof ltximgs[path] === 'undefined') {
    ltximgs[path] = {};
  }

  if (!ltximgs[path][hash]) {
    ltximgs[path][hash] = { optimized: false, latex, inline };
  }
};

const generateSvg = async (hash, latex, path, inline) => {
  const output = resolve(path, 'ltximg');
  const tex = resolve(output, `${hash}.tex`);
  const svg = resolve(output, `${hash}.svg`);
  const dvi = resolve(output, `${hash}.dvi`);
  await outputFile(tex, latexTemplate(latex, inline));
  try {
    await execAsync(
      `latex -interaction nonstopmode -output-directory ${output} ${tex}`,
    );
    await execAsync(`dvisvgm ${dvi} -n -b preview -e -c 1.7 1.5 -o ${svg}`);
  } catch (e) {
    console.log(`Error Occurred when parsing: ${chalk.red(latex)}.`);
    console.log(e.stdout);
  }
};

export const parseLatex = () => {
  const promise = [];

  for (const [path, imgs] of Object.entries(ltximgs)) {
    for (const [hash, { latex, inline }] of Object.entries(imgs)) {
      if (!existsSync(resolve(path, 'ltximg', `${hash}.svg`))) {
        promise.push(generateSvg(hash, latex, path, inline));
      }
    }
  }

  return Promise.all(promise)
    .then(res => {
      if (res.length > 0) {
        console.log(`Parsed ${res.length} latex images.`);
      }
    })
    .then(() => Promise.all([postClean(), optimizeSvg()]))
    .then(() => outputJson('public/ltximg.json', ltximgs));
};

const postClean = () => {
  const promises = [];
  for (const path of walk('public', /\.(aux|dvi|log|tex)$/)) {
    promises.push(unlink(path));
  }
  return Promise.all(promises);
};

const optimizeSvg = () => {
  const promise = [];

  for (const [path, imgs] of Object.entries(ltximgs)) {
    for (const [hash, { optimized }] of Object.entries(imgs)) {
      if (!optimized) {
        const svgPath = resolve(path, 'ltximg', `${hash}.svg`);
        promise.push(
          readFile(svgPath, 'utf-8')
            .then(svg => svgo.optimize(svg))
            .then(svg => {
              ltximgs[path][hash].optimized = true;
              return writeFile(svgPath, svg.data);
            }),
        );
      }
    }
  }

  return Promise.all(promise).then(res => {
    if (res.length > 0) {
      console.log(`Optimized ${res.length} svg files.`);
    }
  });
};

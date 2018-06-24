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

const execAsync = promisify(exec);

const inlineTemp = latex => `\\documentclass[preview]{standalone}
${findPackages(latex)
  .map(p => `\\usepackage{${p}}`)
  .join('\n')}
\\begin{document}
$${latex}$
\\end{document}`;

const displayTemp = latex => `\\documentclass[preview]{standalone}
${findPackages(latex)
  .map(p => `\\usepackage{${p}}`)
  .join('\n')}
\\begin{document}
$$${latex}$$
\\end{document}`;

const packages = {
  amssymb: /\\varnothing/,
  amsmath: [/\\begin{cases}/, /\\text/],
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

export const generateSvg = async (hash, latex, path, inline) => {
  const tex = resolve(path, 'ltximg', `${hash}.tex`);
  const svg = resolve(path, 'ltximg', `${hash}.svg`);
  const dvi = resolve(path, 'ltximg', `${hash}.dvi`);
  await outputFile(tex, (inline ? inlineTemp : displayTemp)(latex));
  await execAsync(
    `latexmk ${tex} -quiet -output-directory=${resolve(path, 'ltximg')}`,
  );
  await execAsync(`dvisvgm ${dvi} -v 0 --no-fonts -o ${svg}`);
  await execAsync(
    `latexmk ${tex} -quiet -C -output-directory=${resolve(path, 'ltximg')}`,
  );
  await unlink(tex);
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

  return Promise.all(promise).then(res => {
    if (res.length > 0) {
      console.log(`Parsed ${res.length} latex images.`);
    }
  });
};

export const optimizeSvg = () => {
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

export const saveJson = () => {
  return outputJson('public/ltximg.json', ltximgs);
};

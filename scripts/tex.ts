import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { outputFileSync, unlinkSync } from 'fs-extra';

const svgs = {};

const inlineTemp = latex => `\\documentclass[preview]{standalone}
\\begin{document}
$${latex}$
\\end{document}`;

const displayTemp = latex => `\\documentclass[preview]{standalone}
\\begin{document}
$$${latex}$$
\\end{document}`;

export const parser = (latex, inline = true) => {
  const md5 = createHash('md5')
    .update(latex)
    .digest('hex');

  if (!svgs[md5]) {
    const tex = `public/ltximg/${md5}.tex`;
    const svg = `public/ltximg/${md5}.svg`;
    const dvi = `public/ltximg/${md5}.dvi`;
    outputFileSync(tex, (inline ? inlineTemp : displayTemp)(latex));
    execSync(`latexmk ${tex} -output-directory=public/ltximg`);
    execSync(`dvisvgm ${dvi} --no-fonts -o ${svg}`);
    execSync(`latexmk ${tex} -C -output-directory=public/ltximg`);
    unlinkSync(tex);
    svgs[md5] = md5;
  }

  return md5;
};

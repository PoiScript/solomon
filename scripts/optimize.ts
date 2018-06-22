import * as SVGO from 'svgo';
import { resolve } from 'path';
import { readFile, writeFile, outputJson } from 'fs-extra';

const svgo = new SVGO({
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: false },
    { cleanupEnableBackground: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: false },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { removeDimensions: true },
    { removeAttrs: { attrs: '(stroke|fill)' } },
  ],
});

export const optimize = ltximgs => {
  const promise = [];
  for (const k in ltximgs) {
    if (ltximgs.hasOwnProperty(k) && !ltximgs[k]) {
      const svgPath = resolve('public/ltximg', `${k}.svg`);
      promise.push(
        readFile(svgPath, 'utf-8')
          .then(svg => svgo.optimize(svg))
          .then(svg => {
            ltximgs[k] = true;
            return writeFile(svgPath, svg.data);
          }),
      );
    }
  }

  return Promise.all(promise).then(res => {
    if (res.length > 0) {
      console.log(`Optimized ${res.length} files.`);
    }
    return outputJson('public/ltximg/ltximg.json', ltximgs);
  });
};

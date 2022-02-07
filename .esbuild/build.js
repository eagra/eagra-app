const parsedArgs = require('yargs-parser')(process.argv.slice(2));
const { build, analyzeMetafile } = require('esbuild');

const sharedConfig = require('./sharedConfig');

const { _, analyze, minify } = parsedArgs;

build({
  ...sharedConfig,
  treeShaking: true,
  metafile: analyze,
  minify,
  logLevel: minify ? 'silent' : undefined,
})
  .then((result) => {
    if (!result.metafile) return;
    analyzeMetafile(result.metafile).then((meta) => console.log(meta));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

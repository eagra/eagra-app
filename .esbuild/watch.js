const { build, serve } = require("esbuild");
const sharedConfig = require("./sharedConfig");

// build the source
build({
  ...sharedConfig,
  metafile: true,
  sourcemap: true,
  watch: {
    onRebuild(error, result) {
      if (error) {
        return console.error(error);
      }

      const time = new Date().toISOString();
      const { errors, warnings } = result;

      console.log(time);
      if (warnings.length > 0) {
        console.log(`${time}:  ⚠️ Compiled with warning:`);
        console.log(warnings);
        return;
      }

      if (errors.length > 0) {
        console.log(`${time}:  ❌ Compiled with errors:`);
        console.log(errors);
        return;
      }

      console.log(`${time}:  ✨ Compiled successfully!`);
    },
  },
}).catch(() => process.exit(1));

// serve
serve({ servedir: "./public", host: "localhost", port: 3000 }, {});

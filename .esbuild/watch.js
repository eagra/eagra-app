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

      const { errors, warnings } = result;

      if (warnings.length > 0) {
        console.log("⚠️ Compiled with warning:");
        console.log(warnings);
        return;
      }

      if (errors.length > 0) {
        console.log("❌ Compiled with errors:");
        console.log(errors);
        return;
      }

      console.log("✨ Compiled successfully!");
    },
  },
}).catch(() => process.exit(1));

// serve
serve({ servedir: "./public", host: "localhost", port: 3000 }, {});

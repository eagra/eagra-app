const wasmLoader = require("esbuild-plugin-wasm").default;

const sharedConfig = {
  entryPoints: ["./src"],
  inject: [".esbuild/polyfills/react-shim.js"],
  bundle: true,
  outfile: "public/dist/index.js",
  loader: { ".svg": "file", ".png": "file" },
  publicPath: "dist",
  format: "esm",
  // jsx pragma for emotion
  jsxFactory: 'jsx',
  plugins: [wasmLoader()],
};

module.exports = sharedConfig;

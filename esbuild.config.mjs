import esbuild from "esbuild";

const options = {
  bundle: true, // Enable bundling
  format: "esm", // Enable ES Modules
  minify: false, // Minify the output for production
  sourcemap: true, // Generate sourcemaps
  loader: {
    ".css": "css", // Handle CSS files
    ".html": "copy", // Handle HTML files
  },
  logLevel: "info",
  entryNames: "[name]",
  assetNames: "assets/[name]-[hash]",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  external: ["node_modules/*"], // Exclude specific modules from being bundled (e.g., node_modules)
  plugins: [],
};

esbuild
  .build({
    entryPoints: ["app/javascripts/index.js", "app/stylesheets/index.css"],
    outdir: "dist",
    ...options,
  })
  .then(() => {
    console.log("Playground build complete.");
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ["app/javascripts/shell.js", "app/stylesheets/shell.css"],
    outdir: "dist/v0.3.14.1",
    ...options,
  })
  .then(() => {
    console.log("Shell build complete.");
  })
  .catch(() => process.exit(1));

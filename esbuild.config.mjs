import esbuild from "esbuild";

const environment = process.env.NODE_ENV;

const options = {
  bundle: true,
  format: "iife",
  minify: environment == "production",
  sourcemap: true,
  loader: {
    ".css": "css",
    ".html": "copy",
  },
  logLevel: "info",
  entryNames: "[name]",
  assetNames: "assets/[name]-[hash]",
  define: {
    "process.env.NODE_ENV": `"${environment}"`,
  },
  external: ["node_modules/*"],
  plugins: [],
};

esbuild
  .build({
    entryPoints: [
      "index.html",
      "app/javascripts/index.tsx",
      "app/stylesheets/index.css",
    ],
    outdir: "dist",
    ...options,
  })
  .then(() => {
    console.log("Playground build complete.");
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ["app/javascripts/shell.ts", "app/stylesheets/shell.css"],
    outdir: "dist/",
    ...options,
  })
  .then(() => {
    console.log("Shell build complete.");
  })
  .catch(() => process.exit(1));

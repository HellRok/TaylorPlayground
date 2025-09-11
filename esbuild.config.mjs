import esbuild from "esbuild";

const options = {
  bundle: true,
  format: "esm",
  minify: true, // The build breaks without because of lezer
  sourcemap: true,
  loader: {
    ".css": "css",
    ".html": "copy",
  },
  logLevel: "info",
  entryNames: "[name]",
  assetNames: "assets/[name]-[hash]",
  define: {
    "process.env.NODE_ENV": '"production"',
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
    outdir: "dist/playground",
    ...options,
  })
  .then(() => {
    console.log("Shell build complete.");
  })
  .catch(() => process.exit(1));

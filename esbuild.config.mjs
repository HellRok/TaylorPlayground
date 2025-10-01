import esbuild from "esbuild";
import fs from 'node:fs'
import path from 'node:path'

const workspace = process.cwd();
const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

const options = {
  bundle: true,
  format: "iife",
  minify: isProduction,
  sourcemap: !isProduction,
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
  metafile: true,
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
  .then((result) => {
    fs.writeFileSync(
      path.join(workspace, "./meta.json"),
      JSON.stringify(result.metafile),
    )
    console.log("Playground build complete.");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

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

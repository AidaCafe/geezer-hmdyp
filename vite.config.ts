import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import monkey, { cdn } from "vite-plugin-monkey";
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginPurgeCss(),
    preact(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        license: "MIT License",
        author: "1shin",
        version: "1.0.0",
        description: "Calculate how much did you paid for PerfectWorldGame.",
        contributionURL: "https://github.com/AidaCafe/geezer-hmdyp",
        match: [
          "https://i.laohu.com/billing/chargeDetailRecord*",
          "https://id.wanmei.com/billing/chargeDetailRecord*",
        ],
      },
      build: {
        externalGlobals: {
          preact: cdn.npmmirror("preact", "dist/preact.min.js"),
          "write-excel-file": cdn.npmmirror(
            "write-excel-file",
            "bundle/write-excel-file.min.js"
          ),
        },
      },
    }),
  ],
});

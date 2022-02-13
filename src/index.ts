/**
 * @Author: Caven
 * @Date: 2022-02-13 14:37:15
 */

import path from "path";
import fs from "fs-extra";
import serveStatic from "serve-static";
import { HtmlTagDescriptor, normalizePath, Plugin } from "vite";

interface VitePluginDcOptions {
  libsPath?: String;
  useUnminified?: Boolean;
}

function vitePluginCesium(
  options: VitePluginDcOptions = { libsPath: "libs", useUnminified: true }
): Plugin {
  const cesiumBuildPath = "./node_modules/cesium/Build";
  let base = "/";
  let outDir = "dist";
  let isBuild = false;
  return {
    name: "vite-plugin-cesium",
    config(config, { command }) {
      isBuild = command === "build";
      base = config.base || "/";
      outDir = config.build?.outDir || "dist";
    },
    configureServer({ middlewares }) {
      middlewares.use(
        `/${options.libsPath}/Cesium`,
        serveStatic(
          normalizePath(
            path.join(
              cesiumBuildPath,
              options.useUnminified ? 'CesiumUnminified' : 'Cesium'
            )
          )
        )
      );
    },
    closeBundle() {
      if (isBuild) {
        try {
          fs.copySync(
            path.join(cesiumBuildPath, "Cesium", "Assets"),
            path.join(outDir, String(options.libsPath), "Cesium", "Assets")
          );
          fs.copySync(
            path.join(cesiumBuildPath, "Cesium", "ThirdParty"),
            path.join(outDir, String(options.libsPath), "Cesium", "ThirdParty")
          );
          fs.copySync(
            path.join(cesiumBuildPath, "Cesium", "Widgets"),
            path.join(outDir, String(options.libsPath), "Cesium", "Widgets")
          );
          fs.copySync(
            path.join(cesiumBuildPath, "Cesium", "Workers"),
            path.join(outDir, String(options.libsPath), "Cesium", "Workers")
          );
          fs.copySync(
            path.join(cesiumBuildPath, "Cesium", "Cesium.js"),
            path.join(outDir, String(options.libsPath), "Cesium", "Cesium.js")
          );
        } catch (e) {}
      }
    },

    transformIndexHtml() {
      let tags: HtmlTagDescriptor[] = [];
      tags.push({
        tag: "script",
        attrs: {
          src: normalizePath(path.join(base, String(options.libsPath), "Cesium", "Cesium.js")),
        },
        injectTo: "head",
      });

      tags.push({
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: normalizePath(
            path.join(base, String(options.libsPath), "Cesium", "Widgets/widgets.css")
          ),
        },
        injectTo: "head",
      });

      return tags;
    },
  };
}

export default vitePluginCesium;

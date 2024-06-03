// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "file:///D:/gitee2/management_system/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/gitee2/management_system/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import AutoImport from "file:///D:/gitee2/management_system/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "D:\\gitee2\\management_system";
var __vite_injected_original_import_meta_url = "file:///D:/gitee2/management_system/vite.config.ts";
var vite_config_default = defineConfig(async ({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "APP_");
  if (command === "serve") {
    console.log(" ---------------> serve");
    return {
      // external: {
      //   vue: 'Vue',
      // },
      esbuild: {
        jsxFactory: "h",
        jsxFragment: "Fragment"
      },
      runtimeCompiler: true,
      // 加上这一段
      plugins: [
        vue(),
        splitVendorChunkPlugin(),
        // legacy({
        //   targets: ['defaults', 'not IE 11'],
        // }),
        // {
        //   ...consoles({ color: 'red'}, files),
        //   enforce: 'pre'
        // },
        // {
        //   ...consoles({ color: 'red' }, files),
        //   enforce: 'pre',
        // },
        AutoImport({
          eslintrc: {
            enabled: false,
            // 若没此json文件，先开启，生成后在关闭
            filepath: "./.eslintrc-auto-import.json",
            // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
            globalsPropValue: true
            // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          },
          imports: ["vue", "vue-router", "pinia"],
          // dirs: [`${new URL('./src/stores/counte.js', import.meta.url)}`], // new URL('./src/stores/counte.js', import.meta.url)
          dts: "./src/auto-imports.d.ts"
        })
      ],
      envPrefix: "VITE_",
      // publicDir: false,
      css: {
        loaderOptions: {
          less: {
            lessOptions: {
              javascriptEnabled: true,
              math: "always"
            }
          }
        }
      },
      module: {
        rules: [
          {
            test: /\.md$/,
            use: [
              {
                loader: path.resolve(__vite_injected_original_dirname, "loader/fileLoader.js")
              }
            ]
          }
        ]
      },
      clearScreen: true,
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("src", __vite_injected_original_import_meta_url))
          // '@com': fileURLToPath(new URL('src/components', import.meta.url)),
        },
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
      },
      define: {
        __APP_ENV__: env.APP_ENV
      },
      build: {
        rollupOptions: {
          // input: {
          //     main: resolve(__dirname, 'index.html'),  // 
          //     nested: resolve(__dirname, 'nested/index.html')
          // }
        },
        commonjsOptions: {
          include: [/linked-dep/, /node_modules/]
        },
        // modulePreload: {
        //   resolveDependencies: (filename, deps, { hostId, hostType }) => {
        //     // console.log('>>>>>>>  fliename', filename, deps)
        //     return deps.filter(condition)
        //   },
        // },
        // cssCodeSplit: true,
        watch: {}
      },
      sourcemap: true,
      server: {
        open: false,
        port: 9e3,
        proxy: {
          "/api": {
            target: "http://42.192.39.253:8085",
            changeOrigin: true,
            //是否跨域
            rewrite: (path2) => path2.replace(/api/, "/")
          },
          "/mmm": {
            target: "http://127.0.0.1:80/",
            changeOrigin: true,
            //是否跨域
            rewrite: (path2) => path2.replace(/mmm/, "/")
          },
          "/sys": {
            target: "http://192.168.1.222:1008/jeecg-boot",
            // 智友本地
            changeOrigin: true,
            //是否跨域
            rewrite: (path2) => path2.replace(/^\/sys/, "/sys")
          }
        }
      }
    };
  } else {
    return {
      // external: {
      //   vue: 'Vue',
      // },
      runtimeCompiler: true,
      // 加上这一段
      productionSourceMap: false,
      plugins: [
        vue(),
        // splitVendorChunkPlugin(),
        // legacy({
        //   targets: ['defaults', 'not IE 11'],
        // }),
        // {
        //   ...consoles({ color: 'red' }, files),
        //   enforce: 'pre',
        // },
        AutoImport({
          eslintrc: {
            enabled: true,
            // 若没此json文件，先开启，生成后在关闭
            filepath: "./.eslintrc-auto-import.json",
            // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
            globalsPropValue: true
            // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          },
          imports: ["vue", "vue-router", "pinia"],
          // dirs: [`${new URL('./src/stores/counte.js', import.meta.url)}`], // new URL('./src/stores/counte.js', import.meta.url)
          dts: "./src/auto-imports.d.ts"
        })
      ],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
        }
      },
      build: {
        commonjsOptions: {
          include: [/linked-dep/, /node_modules/]
        }
      }
    };
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRlZTJcXFxcbWFuYWdlbWVudF9zeXN0ZW1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdpdGVlMlxcXFxtYW5hZ2VtZW50X3N5c3RlbVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2l0ZWUyL21hbmFnZW1lbnRfc3lzdGVtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgeyBjb25zb2xlcyB9IGZyb20gJy4vcGx1Z2lucy9jb25zb2xlJ1xyXG4vLyBpbXBvcnQgbGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcclxuLy8gaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAnLi9sb2FkZXIvQXV0b0ltcG9ydCc7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcblxyXG5cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbi8vICAgcGx1Z2luczogW3Z1ZSgpLFxyXG4vLyAgIEF1dG9JbXBvcnQoe1xyXG4vLyAgICAgZXNsaW50cmM6IHtcclxuLy8gICAgICAgZW5hYmxlZDogZmFsc2UsIC8vIFx1ODJFNVx1NkNBMVx1NkI2NGpzb25cdTY1ODdcdTRFRjZcdUZGMENcdTUxNDhcdTVGMDBcdTU0MkZcdUZGMENcdTc1MUZcdTYyMTBcdTU0MEVcdTU3MjhcdTUxNzNcdTk1RURcclxuLy8gICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gXHU4QkJFXHU3RjZFZXNsaW50cmMtYXV0by1pbXBvcnQuanNvblx1NzUxRlx1NjIxMFx1OERFRlx1NUY4NCBEZWZhdWx0IGAuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uYFxyXG4vLyAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxyXG4vLyAgICAgfSxcclxuLy8gICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcclxuLy8gICAgIC8vIGRpcnM6IFtgJHtuZXcgVVJMKCcuL3NyYy9zdG9yZXMvY291bnRlLmpzJywgaW1wb3J0Lm1ldGEudXJsKX1gXSwgLy8gbmV3IFVSTCgnLi9zcmMvc3RvcmVzL2NvdW50ZS5qcycsIGltcG9ydC5tZXRhLnVybClcclxuLy8gICAgIGR0czogJy4vc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuLy8gICB9KVxyXG4vLyAgIF0sXHJcbi8vICAgLy8gbW9kdWxlOiB7XHJcbi8vICAgLy8gICBydWxlczogW1xyXG4vLyAgIC8vICAgICB7XHJcbi8vICAgLy8gICAgICAgdGVzdDogL1xcLm1kJC8sXHJcbi8vICAgLy8gICAgICAgdXNlOiBbXHJcbi8vICAgLy8gICAgICAgICB7XHJcbi8vICAgLy8gICAgICAgICAgIGxvYWRlcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvYWRlci9maWxlTG9hZGVyLmpzJyksXHJcbi8vICAgLy8gICAgICAgICB9LFxyXG4vLyAgIC8vICAgICAgIF0sXHJcbi8vICAgLy8gICAgIH0sXHJcbi8vICAgLy8gICBdLFxyXG4vLyAgIC8vIH0sXHJcbi8vICAgcmVzb2x2ZToge1xyXG4vLyAgICAgYWxpYXM6IHtcclxuLy8gICAgICAgLy8gJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbi8vICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCdzcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuLy8gICAgIH1cclxuLy8gICB9LFxyXG4vLyAgIG9wdGltaXplRGVwczoge1xyXG4vLyAgICAgaW5jbHVkZTogWyd2dWUvZGlzdC92dWUuZXNtLWJ1bmRsZXIuanMnXSxcclxuLy8gICB9LFxyXG4vLyB9KVxyXG5cclxuXHJcbnZhciBmaWxlcyA9ICcnXHJcbmNvbnN0IGhhbmRsZUF5c25jID0gYXN5bmMgKCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XHJcbiAgICBmcy5yZWFkRmlsZSgnLi9zcmMvX21haW4uanMnLCAndXRmOCcsIChlcnIsIGRhdGEpID0+IHtcclxuICAgICAgZmlsZXMgPSBkYXRhXHJcbiAgICAgIHJlcygpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoeyBjb21tYW5kLCBtb2RlLCBzc3JCdWlsZCB9KSA9PiB7XHJcbiAgLy8gYXdhaXQgaGFuZGxlQXlzbmMoKVxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJ0FQUF8nKVxyXG4gIC8vIHJldHVyblxyXG4gIGlmIChjb21tYW5kID09PSAnc2VydmUnKSB7XHJcbiAgICBjb25zb2xlLmxvZygnIC0tLS0tLS0tLS0tLS0tLT4gc2VydmUnKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLy8gZXh0ZXJuYWw6IHtcclxuICAgICAgLy8gICB2dWU6ICdWdWUnLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICBlc2J1aWxkOiB7XHJcbiAgICAgICAganN4RmFjdG9yeTogJ2gnLFxyXG4gICAgICAgIGpzeEZyYWdtZW50OiAnRnJhZ21lbnQnLFxyXG4gICAgICB9LFxyXG4gICAgICBydW50aW1lQ29tcGlsZXI6IHRydWUsIC8vIFx1NTJBMFx1NEUwQVx1OEZEOVx1NEUwMFx1NkJCNVxyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksXHJcblxyXG4gICAgICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcclxuICAgICAgICAvLyBsZWdhY3koe1xyXG4gICAgICAgIC8vICAgdGFyZ2V0czogWydkZWZhdWx0cycsICdub3QgSUUgMTEnXSxcclxuICAgICAgICAvLyB9KSxcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAuLi5jb25zb2xlcyh7IGNvbG9yOiAncmVkJ30sIGZpbGVzKSxcclxuICAgICAgICAvLyAgIGVuZm9yY2U6ICdwcmUnXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAuLi5jb25zb2xlcyh7IGNvbG9yOiAncmVkJyB9LCBmaWxlcyksXHJcbiAgICAgICAgLy8gICBlbmZvcmNlOiAncHJlJyxcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIC8vIFx1ODJFNVx1NkNBMVx1NkI2NGpzb25cdTY1ODdcdTRFRjZcdUZGMENcdTUxNDhcdTVGMDBcdTU0MkZcdUZGMENcdTc1MUZcdTYyMTBcdTU0MEVcdTU3MjhcdTUxNzNcdTk1RURcclxuICAgICAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gXHU4QkJFXHU3RjZFZXNsaW50cmMtYXV0by1pbXBvcnQuanNvblx1NzUxRlx1NjIxMFx1OERFRlx1NUY4NCBEZWZhdWx0IGAuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uYFxyXG4gICAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcclxuICAgICAgICAgIC8vIGRpcnM6IFtgJHtuZXcgVVJMKCcuL3NyYy9zdG9yZXMvY291bnRlLmpzJywgaW1wb3J0Lm1ldGEudXJsKX1gXSwgLy8gbmV3IFVSTCgnLi9zcmMvc3RvcmVzL2NvdW50ZS5qcycsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICAgIGR0czogJy4vc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgICAgZW52UHJlZml4OiAnVklURV8nLFxyXG4gICAgICAvLyBwdWJsaWNEaXI6IGZhbHNlLFxyXG4gICAgICBjc3M6IHtcclxuICAgICAgICBsb2FkZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICAgIGxlc3NPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgbWF0aDogJ2Fsd2F5cycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIG1vZHVsZToge1xyXG4gICAgICAgIHJ1bGVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRlc3Q6IC9cXC5tZCQvLFxyXG4gICAgICAgICAgICB1c2U6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2FkZXIvZmlsZUxvYWRlci5qcycpLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyU2NyZWVuOiB0cnVlLFxyXG4gICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCdzcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgIC8vICdAY29tJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCdzcmMvY29tcG9uZW50cycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJ10sXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlZmluZToge1xyXG4gICAgICAgIF9fQVBQX0VOVl9fOiBlbnYuQVBQX0VOVixcclxuICAgICAgfSxcclxuICAgICAgYnVpbGQ6IHtcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAvLyBpbnB1dDoge1xyXG4gICAgICAgICAgLy8gICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLCAgLy8gXHJcbiAgICAgICAgICAvLyAgICAgbmVzdGVkOiByZXNvbHZlKF9fZGlybmFtZSwgJ25lc3RlZC9pbmRleC5odG1sJylcclxuICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1vbmpzT3B0aW9uczoge1xyXG4gICAgICAgICAgaW5jbHVkZTogWy9saW5rZWQtZGVwLywgL25vZGVfbW9kdWxlcy9dLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gbW9kdWxlUHJlbG9hZDoge1xyXG4gICAgICAgIC8vICAgcmVzb2x2ZURlcGVuZGVuY2llczogKGZpbGVuYW1lLCBkZXBzLCB7IGhvc3RJZCwgaG9zdFR5cGUgfSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnPj4+Pj4+PiAgZmxpZW5hbWUnLCBmaWxlbmFtZSwgZGVwcylcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGRlcHMuZmlsdGVyKGNvbmRpdGlvbilcclxuICAgICAgICAvLyAgIH0sXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAgICAgd2F0Y2g6IHt9LFxyXG4gICAgICB9LFxyXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICAgIHBvcnQ6IDkwMDAsXHJcbiAgICAgICAgcHJveHk6IHtcclxuICAgICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vNDIuMTkyLjM5LjI1Mzo4MDg1JyxcclxuICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1OERFOFx1NTdERlxyXG4gICAgICAgICAgICByZXdyaXRlOiAocGF0aDogYW55KSA9PiBwYXRoLnJlcGxhY2UoL2FwaS8sICcvJyksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJy9tbW0nOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODAvJyxcclxuICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1OERFOFx1NTdERlxyXG4gICAgICAgICAgICByZXdyaXRlOiAocGF0aDogYW55KSA9PiBwYXRoLnJlcGxhY2UoL21tbS8sICcvJyksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJy9zeXMnOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xOTIuMTY4LjEuMjIyOjEwMDgvamVlY2ctYm9vdCcsIC8vIFx1NjY3QVx1NTNDQlx1NjcyQ1x1NTczMFxyXG4gICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU4REU4XHU1N0RGXHJcbiAgICAgICAgICAgIHJld3JpdGU6IChwYXRoOiBhbnkpID0+IHBhdGgucmVwbGFjZSgvXlxcL3N5cy8sICcvc3lzJyksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC8vIGV4dGVybmFsOiB7XHJcbiAgICAgIC8vICAgdnVlOiAnVnVlJyxcclxuICAgICAgLy8gfSxcclxuICAgICAgcnVudGltZUNvbXBpbGVyOiB0cnVlLCAvLyBcdTUyQTBcdTRFMEFcdThGRDlcdTRFMDBcdTZCQjVcclxuICAgICAgcHJvZHVjdGlvblNvdXJjZU1hcDogZmFsc2UsXHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB2dWUoKSxcclxuICAgICAgICAvLyBzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXHJcbiAgICAgICAgLy8gbGVnYWN5KHtcclxuICAgICAgICAvLyAgIHRhcmdldHM6IFsnZGVmYXVsdHMnLCAnbm90IElFIDExJ10sXHJcbiAgICAgICAgLy8gfSksXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgLi4uY29uc29sZXMoeyBjb2xvcjogJ3JlZCcgfSwgZmlsZXMpLFxyXG4gICAgICAgIC8vICAgZW5mb3JjZTogJ3ByZScsXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIFx1ODJFNVx1NkNBMVx1NkI2NGpzb25cdTY1ODdcdTRFRjZcdUZGMENcdTUxNDhcdTVGMDBcdTU0MkZcdUZGMENcdTc1MUZcdTYyMTBcdTU0MEVcdTU3MjhcdTUxNzNcdTk1RURcclxuICAgICAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gXHU4QkJFXHU3RjZFZXNsaW50cmMtYXV0by1pbXBvcnQuanNvblx1NzUxRlx1NjIxMFx1OERFRlx1NUY4NCBEZWZhdWx0IGAuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uYFxyXG4gICAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcclxuICAgICAgICAgIC8vIGRpcnM6IFtgJHtuZXcgVVJMKCcuL3NyYy9zdG9yZXMvY291bnRlLmpzJywgaW1wb3J0Lm1ldGEudXJsKX1gXSwgLy8gbmV3IFVSTCgnLi9zcmMvc3RvcmVzL2NvdW50ZS5qcycsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICAgIGR0czogJy4vc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBidWlsZDoge1xyXG4gICAgICAgIGNvbW1vbmpzT3B0aW9uczoge1xyXG4gICAgICAgICAgaW5jbHVkZTogWy9saW5rZWQtZGVwLywgL25vZGVfbW9kdWxlcy9dLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsU0FBUyxlQUFlLFdBQVc7QUFFNVMsU0FBUyxjQUFjLFNBQVMsOEJBQThCO0FBQzlELE9B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

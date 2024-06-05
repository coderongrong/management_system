import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { consoles } from './plugins/console'
// import legacy from '@vitejs/plugin-legacy'
// import AutoImport from './loader/AutoImport';
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(),
//   AutoImport({
//     eslintrc: {
//       enabled: false, // 若没此json文件，先开启，生成后在关闭
//       filepath: './.eslintrc-auto-import.json', // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
//       globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
//     },
//     imports: ['vue', 'vue-router', 'pinia'],
//     // dirs: [`${new URL('./src/stores/counte.js', import.meta.url)}`], // new URL('./src/stores/counte.js', import.meta.url)
//     dts: './src/auto-imports.d.ts',
//   })
//   ],
//   // module: {
//   //   rules: [
//   //     {
//   //       test: /\.md$/,
//   //       use: [
//   //         {
//   //           loader: path.resolve(__dirname, 'loader/fileLoader.js'),
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
//   resolve: {
//     alias: {
//       // '@': path.resolve(__dirname, 'src'),
//       '@': fileURLToPath(new URL('src', import.meta.url)),
//     }
//   },
//   optimizeDeps: {
//     include: ['vue/dist/vue.esm-bundler.js'],
//   },
// })


var files = ''
const handleAysnc = async () => {
  return new Promise((res) => {
    fs.readFile('./src/_main.js', 'utf8', (err, data) => {
      files = data
      res()
    })
  })
}

export default defineConfig(async ({ command, mode, ssrBuild }) => {
  // await handleAysnc()
  const env = loadEnv(mode, process.cwd(), 'APP_')
  // return
  if (command === 'serve') {
    console.log(' ---------------> serve')
    return {
      // external: {
      //   vue: 'Vue',
      // },
      esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
      },
      devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
      },
      runtimeCompiler: true, // 加上这一段
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
            enabled: false, // 若没此json文件，先开启，生成后在关闭
            filepath: './.eslintrc-auto-import.json', // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          },
          imports: ['vue', 'vue-router', 'pinia'],
          // dirs: [`${new URL('./src/stores/counte.js', import.meta.url)}`], // new URL('./src/stores/counte.js', import.meta.url)
          dts: './src/auto-imports.d.ts',
        }),
      ],
      envPrefix: 'VITE_',
      // publicDir: false,
      css: {
        loaderOptions: {
          less: {
            lessOptions: {
              javascriptEnabled: true,
              math: 'always',
            },
          },
        },
      },
      module: {
        rules: [
          {
            test: /\.md$/,
            use: [
              {
                loader: path.resolve(__dirname, 'loader/fileLoader.js'),
              },
            ],
          },
        ],
      },
      clearScreen: true,
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('src', import.meta.url)),
          // '@com': fileURLToPath(new URL('src/components', import.meta.url)),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      },
      define: {
        __APP_ENV__: env.APP_ENV,
      },
      build: {
        rollupOptions: {
          // input: {
          //     main: resolve(__dirname, 'index.html'),  // 
          //     nested: resolve(__dirname, 'nested/index.html')
          // }
        },
        commonjsOptions: {
          include: [/linked-dep/, /node_modules/],
        },
        // modulePreload: {
        //   resolveDependencies: (filename, deps, { hostId, hostType }) => {
        //     // console.log('>>>>>>>  fliename', filename, deps)
        //     return deps.filter(condition)
        //   },
        // },
        // cssCodeSplit: true,
        watch: {},
      },
      sourcemap: true,
      server: {
        open: false,
        port: 9000,
        proxy: {
          // '/api': {
          //   target: 'http://42.192.39.253:8085',
          //   changeOrigin: true, //是否跨域
          //   rewrite: (path: any) => path.replace(/^\/api/, '/'),
          // },
          '/api': {
            target: 'http://127.0.0.1:3000/',
            changeOrigin: true, //是否跨域
            rewrite: (path: any) => {
              console.log('代理');
              path.replace(/^\/api/, '/')
            },
          },
          '/sys': {
            target: 'http://192.168.1.222:1008/jeecg-boot', // 智友本地
            changeOrigin: true, //是否跨域
            rewrite: (path: any) => path.replace(/^\/sys/, '/sys'),
          },
        },
      },
    }
  } else {
    return {
      // external: {
      //   vue: 'Vue',
      // },
      runtimeCompiler: true, // 加上这一段
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
            enabled: true, // 若没此json文件，先开启，生成后在关闭
            filepath: './.eslintrc-auto-import.json', // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          },
          imports: ['vue', 'vue-router', 'pinia'],
          // dirs: [`${new URL('./src/stores/counte.js', import.meta.url)}`], // new URL('./src/stores/counte.js', import.meta.url)
          dts: './src/auto-imports.d.ts',
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        commonjsOptions: {
          include: [/linked-dep/, /node_modules/],
        },
      },
    }
  }
})
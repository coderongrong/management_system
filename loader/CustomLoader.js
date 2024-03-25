export default function CustomLoader() {
    return {
      name: 'my-custom-loader',
      transform(src, id) {
        // console.log('------->', src, id)
        // 在这里编写处理特定文件类型的逻辑
        return {
          code: '/* 处理后的代码 */',
          map: null, // 如果需要 source map，则提供对应的 source map
        };
      },
    };
  }
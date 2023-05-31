export function BMPGL() {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      // eslint-disable-next-line
      resolve(BMapGL)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=3O4az1aGzAU8pDSx5BBi1QtCie7BYG37&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  })
}

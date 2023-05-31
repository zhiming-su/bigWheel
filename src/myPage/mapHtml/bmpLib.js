export function BMPGLLib() {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      // eslint-disable-next-line
      resolve(BMapGLLib)
    }
    const script = document.createElement('script')
    //script.type = 'text/javascript'
    script.src = `https://mapopen.bj.bcebos.com/github/BMapGLLib/TrackAnimation/src/TrackAnimation.min.js`
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export const Export=(): void =>{
  const drawPic = (context: WechatMiniprogram.CanvasContext, url: string, quality: number[]): void =>{
    let x = quality[0]
    let y = quality[1]
    let width = quality[2]
    let height = quality[3]
    wx.getImageInfo({
      src: url,
      success: function (res) {
        context.drawImage(res.path, x, y, width, height)
        context.draw()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
  const drawText = (context: WechatMiniprogram.CanvasContext, text: string, quality: number[]): void =>{
    let x = quality[0]
    let y = quality[1]
    let width = quality[2]
    context.setFontSize(30)
    context.fillText(text, x, y, width)
  }
  const context = wx.createCanvasContext('bottleImg')
  const bottleUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottle.png"
  
  let bottlePath: string
  wx.cloud.downloadFile({
    fileID: "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottle.png",
    success: res =>{
      bottlePath = res.tempFilePath      
    },
    fail: res => {
      console.log(res.errMsg)
    }
  })

  const picUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/figs/2.png"
  const bottleHeight = 310
  const bottleWidth = 200
  const titleHeight = 300
  const picWidth = 180

  //画背景
  context.rect(0, 0, 1300, 4000)
  context.setFillStyle("white")
  context.fill()
  context.draw()
  context.setFillStyle("black")
  
  for(let y = 1; y <= 6; ++y){
    for (let x = 1; x <= 5; ++x) {
      //todo 标题
      //画瓶子
      drawPic(context, bottlePath, [50*x+bottleWidth*(x-1), (bottleHeight+100)*(y-1)+titleHeight, bottleWidth, bottleHeight])
      drawPic(context, picUrl, [50*x+bottleWidth*(x-1)+5, (bottleHeight+100)*(y-1)+titleHeight+100, picWidth, picWidth])
      //瓶子下的字
      drawText(context, "有四个字", [50*x+bottleWidth*(x-1)+40, (bottleHeight+50)*y+50*(y-1)+titleHeight, 150])
    }
  }
  //保存
  context.draw(true, function(){
    setTimeout(function(){
      wx.canvasToTempFilePath({
        canvasId: "bottleImg",
        quality: 1,
        success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              console.log("成功保存")
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })
        }
      })
    }, 1000)
    })
}
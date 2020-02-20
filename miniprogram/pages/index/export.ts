export const Export=(bottles: any[],success: Function,needauth: Function,getauth: Function): void =>{
  const drawPic = (context: WechatMiniprogram.CanvasContext, url: string, quality: number[]): void =>{
    let x = quality[0]
    let y = quality[1]
    let width = quality[2]
    let height = quality[3]

    context.drawImage(url, x, y, width, height)

  }
  const drawText = (context: WechatMiniprogram.CanvasContext, text: string, quality: number[]): void =>{
    let x = quality[0]
    let y = quality[1]
    let width = quality[2]
    context.setFontSize(30)
    context.fillText(text, x, y, width)
  }
  const drawAll = (context: WechatMiniprogram.CanvasContext, bottleUrl: string): void =>{
    const bottleHeight = 300
    const bottleWidth = 200
    const titleHeight = 100
    const picWidth = 100

    //画背景
    context.rect(0, 0, 1300, 4000)
    context.setFillStyle("white")
    context.fill()
    //context.draw()
    context.setFillStyle("black")
    
    let bottleIndex = 0
    for(let y = 1; y <= 6; ++y){
      for (let x = 1; x <= 5; ++x) {
        for (let i = 1; i <= bottles[bottleIndex].full; ++i){
          switch(i){
            case 1:{
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 85, (bottleHeight + 100) * (y - 1) + titleHeight + 195, picWidth, picWidth])
              break
            }
            case 2:{
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 150, picWidth, picWidth])
              break
            }
            case 3:{
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 85, (bottleHeight + 100) * (y - 1) + titleHeight + 95, picWidth, picWidth])
              break
            }
            case 4:{
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 50, picWidth, picWidth])
              break
            }
            case 5: {
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 85, (bottleHeight + 100) * (y - 1) + titleHeight-5, picWidth, picWidth])
              break
            }
          }
        }
        //画瓶子
        drawPic(context, bottleUrl, [50 * x + bottleWidth * (x - 1), (bottleHeight + 100) * (y - 1) + titleHeight, bottleWidth, bottleHeight])
        drawText(context, bottles[bottleIndex].name, [50*x+bottleWidth*(x-1)+40, (bottleHeight+50)*y+50*(y-1)+titleHeight, 150])
        bottleIndex++
      }
    }
  }

  const context = wx.createCanvasContext('bottleImg')
  const bottleUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottle.png"
  const backgroundUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/background.jpg"
  let backgroundPath: string

  wx.cloud.downloadFile({
    fileID: backgroundUrl,
    success: res =>{
      backgroundPath = res.tempFilePath
      console.log("Background" + backgroundPath)
      wx.cloud.downloadFile({
        fileID: bottleUrl,
        success: res =>{
          drawAll(context, res.tempFilePath)
    
          context.draw(true, function(){
            wx.canvasToTempFilePath({
              canvasId: "bottleImg",
              quality: 1,
              destWidth: 1300,
              destHeight: 4000,
              success(res) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success() {
                    console.log("Saved")
                    success()
                  },
                  fail(res) {
                    console.log(res.errMsg)
                    wx.getSetting({
                      success(res) {
                        if (!res.authSetting['scope.writePhotosAlbum']) {
                          needauth()
                          wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success () {
                              getauth()
                            },
                            fail () {
                              console.error("Authorization Failed")
                              needauth()
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
          })
    
        }
      })

    }
    })
  
}
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
    x -= (text.length - 4) * 20
    let y = quality[1]
    let width = quality[2]
    context.setFontSize(40)
    context.fillText(text, x, y, width)
  }
  const drawAll = (context: WechatMiniprogram.CanvasContext, bottleUrl: string, bgUrl: string): void =>{
    const bottleHeight = 300
    const bottleWidth = 200
    const titleHeight = 150
    const picWidth = 100

    // //画背景
    // context.rect(0, 0, 1300, 4000)
    // context.setFillStyle("white")
    // context.fill()
    // //context.draw()
    // context.setFillStyle("black")
    context.drawImage(bgUrl, 0, 0, 1300, 2800)

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
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 160, picWidth, picWidth])
              break
            }
            case 3:{
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 85, (bottleHeight + 100) * (y - 1) + titleHeight + 100, picWidth, picWidth])
              break
            }
            case 4:{
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 60, picWidth, picWidth])
              break
            }
            case 5: {
              drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 63, (bottleHeight + 100) * (y - 1) + titleHeight-10, picWidth, picWidth])
              break
            }
          }
        }
        drawPic(context, bottleUrl, [50 * x + bottleWidth * (x - 1), (bottleHeight + 100) * (y - 1) + titleHeight, bottleWidth, bottleHeight])
        drawText(context, bottles[bottleIndex].name, [50*x+bottleWidth*(x-1)+15, (bottleHeight+50)*y+50*(y-1)+titleHeight, 300])
        bottleIndex++
      }
    }
  }

  const context = wx.createCanvasContext('bottleImg')
  const bottleUrl = "https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/bottle.png"
  const backgroundUrl = "https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/background.jpg"
  let backgroundPath: string

  wx.downloadFile({
    url: backgroundUrl,
    success: res =>{
      backgroundPath = res.tempFilePath
      console.log("Background" + backgroundPath)
      wx.downloadFile({
        url: bottleUrl,
        success: res =>{
          drawAll(context, res.tempFilePath, backgroundPath)
    
          context.draw(true, function(){
            wx.canvasToTempFilePath({
              canvasId: "bottleImg",
              quality: 1,
              destWidth: 1300,
              destHeight: 2800,
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
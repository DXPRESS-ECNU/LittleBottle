// app.ts
const URL_PREFIX = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/"

App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.cloud.init()
    GetConfig(URL_PREFIX + "bottlelist1.json")

    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         },
    //       })
    //     }
    //   },
    // })
  },
})

function GetConfig(path: string){
  return wx.cloud.downloadFile({
    fileID: path,
    success: res => {
      console.log(res.tempFilePath)
      LoadConfig(res.tempFilePath)
    }
  })
}

function LoadConfig(path: string){
  var fs = wx.getFileSystemManager()
  var json: string= fs.readFileSync(path, "utf8").toString()
  
  var contents: IBottleConfig[] = JSON.parse(json)
  console.log(contents)
  
  contents.forEach(function (content) {
    console.log(content)
    let b : Bottle = new Bottle(content)
    bottles.push(b)
  });
}

var bottles: Bottle[];

interface IBottleConfig{
  path: string
  name: string
}

class Bottle {
  path: string
  name: string
  full: number

  constructor(content: IBottleConfig) {
    this.path = ""
    wx.cloud.downloadFile({
      fileID: URL_PREFIX + content.path,
      success: res => {
        console.log(res.tempFilePath)
        this.path = res.tempFilePath
      }
    })
    this.name = content.name
    this.full = 0
    console.log(bottles)
  }
}

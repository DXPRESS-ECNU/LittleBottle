// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

interface IBottleConfig{
  path: string
  name: string
}

class Bottle {
  path: string
  name: string
  full: number

  constructor(content: IBottleConfig) {
    this.path = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/"+content.path
    this.name = content.name
    this.full = 0
  }

  click() {
    if (this.full < 5) {
      this.full += 1
    }
    else
    {
      this.full = 0
    }
  }
}

Page({
  data: {
    bottles:[] as Bottle[],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    var bottledata = require('../../bottles/bottles.js')
    var contents: IBottleConfig[] = bottledata.bottlelist
    const bottles = contents.map(config => new Bottle(config))
    console.log(bottles)
    this.setData({
      bottles
    })
  },
})

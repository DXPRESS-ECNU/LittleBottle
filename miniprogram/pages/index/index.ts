// index.ts
// 获取应用实例

import { Export } from "./export"

const app = getApp<IAppOption>()
const URL_PREFIX = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/"

interface IBottleConfig{
  path: string
  name: string
}

class Bottle {
  path: string
  name: string
  full: number

  constructor(content: IBottleConfig) {
    this.path = URL_PREFIX + "figs/" + content.path
    this.name = content.name
    this.full = 0
    
    this.download()
  }

  async download(){
    await wx.cloud.downloadFile({
      fileID: this.path
    }).then(res => {
      //console.log(res.tempFilePath)
      this.path=res.tempFilePath
    }).catch(error => {
      console.error(error)
    })
  }

  update() {
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
    exportbtnDis: false,
    exportbtnText: "分享图片",
  },
  onLoad() {
    //调试用,记得删除
    //Export()

    wx.cloud.init()
    var fs = wx.getFileSystemManager()
    wx.cloud.downloadFile({
      fileID: 'cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottlelist1.json',
      success: res => {
        console.log(res.tempFilePath)
        var contents: IBottleConfig[] = JSON.parse(fs.readFileSync(res.tempFilePath, "utf8").toString())
        const bottles = contents.map(config => new Bottle(config))
        this.setData({
          bottles
        })
        console.log(this.data.bottles)

      },
      fail: console.error
    })
    // var bottledata = require('../../bottles/bottles.js')
    // var contents: IBottleConfig[] = bottledata.bottlelist
    // const bottles = contents.map(config => new Bottle(config))
    // this.setData({
    //   bottles
    // })
    // console.log(this.data.bottles)
  },
  updateBottle(event:any){
    var bottles = this.data.bottles
    var id = event.currentTarget.dataset.index
    bottles[id].update()
    this.setData({
      bottles
    })
  },
  export(){
    this.setData({
      exportbtnDis: true,
      exportbtnText: "正在生成..."
    })
  }
})

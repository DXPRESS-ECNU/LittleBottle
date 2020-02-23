// index.ts
// 获取应用实例

import { Export } from "./export"

const app = getApp<IAppOption>()
const URL_PREFIX = "https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/"

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
    wx.downloadFile({
      url: this.path,
      success: res=>{
        if (res.statusCode === 200)
        {
          this.path = res.tempFilePath
        }
      },
      fail: console.error
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
    isauth: true,
  },
  onLoad() {
    wx.cloud.init()
    var fs = wx.getFileSystemManager()
    wx.downloadFile({
      url: 'https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/bottlelist1.json',
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
      bottles,
      exportbtnDis: false,
      exportbtnText: "分享图片"
    })
  },
  export(){
    this.setData({
      exportbtnDis: true,
      exportbtnText: "正在生成..."
    })
    Export(this.data.bottles, ()=>{
      this.setData({
        exportbtnDis: true,
        exportbtnText: "已保存"
      })
    },()=>{
      this.setData({
        isauth: false
      })
    },()=>{
      this.setData({
        exportbtnDis: false,
        exportbtnText: "分享图片"
      })
    })
  },
  openSetting(){
    wx.openSetting()
    this.setData({
      exportbtnDis: false,
      exportbtnText: "分享图片",
      isauth: true
    })
  }
})

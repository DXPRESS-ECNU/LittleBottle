"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("./export");
const app = getApp();
const URL_PREFIX = "https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/";
class Bottle {
    constructor(content) {
        this.path = URL_PREFIX + "figs/" + content.path;
        this.name = content.name;
        this.full = 0;
        this.download();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            wx.downloadFile({
                url: this.path,
                success: res => {
                    if (res.statusCode === 200) {
                        this.path = res.tempFilePath;
                    }
                },
                fail: console.error
            });
        });
    }
    update() {
        if (this.full < 5) {
            this.full += 1;
        }
        else {
            this.full = 0;
        }
    }
}
Page({
    data: {
        bottles: [],
        exportbtnDis: false,
        exportbtnText: "分享图片",
        isauth: true,
    },
    onLoad() {
        wx.cloud.init();
        var fs = wx.getFileSystemManager();
        wx.downloadFile({
            url: 'https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/bottlelist1.json',
            success: res => {
                console.log(res.tempFilePath);
                var contents = JSON.parse(fs.readFileSync(res.tempFilePath, "utf8").toString());
                const bottles = contents.map(config => new Bottle(config));
                this.setData({
                    bottles
                });
                console.log(this.data.bottles);
            },
            fail: console.error
        });
    },
    updateBottle(event) {
        var bottles = this.data.bottles;
        var id = event.currentTarget.dataset.index;
        bottles[id].update();
        this.setData({
            bottles,
            exportbtnDis: false,
            exportbtnText: "分享图片"
        });
    },
    export() {
        this.setData({
            exportbtnDis: true,
            exportbtnText: "正在生成..."
        });
        export_1.Export(this.data.bottles, () => {
            this.setData({
                exportbtnDis: true,
                exportbtnText: "已保存"
            });
        }, () => {
            this.setData({
                isauth: false
            });
        }, () => {
            this.setData({
                exportbtnDis: false,
                exportbtnText: "分享图片"
            });
        });
    },
    openSetting() {
        wx.openSetting();
        this.setData({
            exportbtnDis: false,
            exportbtnText: "分享图片",
            isauth: true
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLHFDQUFpQztBQUVqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUNoQyxNQUFNLFVBQVUsR0FBRyw2REFBNkQsQ0FBQTtBQU9oRixNQUFNLE1BQU07SUFLVixZQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUViLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRUssUUFBUTs7WUFDWixFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZCxPQUFPLEVBQUUsR0FBRyxDQUFBLEVBQUU7b0JBQ1osSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFDMUI7d0JBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFBO3FCQUM3QjtnQkFDSCxDQUFDO2dCQUNELElBQUksRUFBRSxPQUFPLENBQUMsS0FBSzthQUNwQixDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQTtTQUNmO2FBRUQ7WUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtTQUNkO0lBQ0gsQ0FBQztDQUNGO0FBRUQsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFDLEVBQWM7UUFDdEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsYUFBYSxFQUFFLE1BQU07UUFDckIsTUFBTSxFQUFFLElBQUk7S0FDYjtJQUNELE1BQU07UUFDSixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7UUFDbEMsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNkLEdBQUcsRUFBRSw2RUFBNkU7WUFDbEYsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLFFBQVEsR0FBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDaEcsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTztpQkFDUixDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hDLENBQUM7WUFDRCxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO0lBUUosQ0FBQztJQUNELFlBQVksQ0FBQyxLQUFTO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQy9CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtRQUMxQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE9BQU87WUFDUCxZQUFZLEVBQUUsS0FBSztZQUNuQixhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxZQUFZLEVBQUUsSUFBSTtZQUNsQixhQUFhLEVBQUUsU0FBUztTQUN6QixDQUFDLENBQUE7UUFDRixlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLGFBQWEsRUFBRSxLQUFLO2FBQ3JCLENBQUMsQ0FBQTtRQUNKLENBQUMsRUFBQyxHQUFFLEVBQUU7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQUFDLEdBQUUsRUFBRTtZQUNKLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxNQUFNO2FBQ3RCLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVc7UUFDVCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFlBQVksRUFBRSxLQUFLO1lBQ25CLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXHJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xyXG5cclxuaW1wb3J0IHsgRXhwb3J0IH0gZnJvbSBcIi4vZXhwb3J0XCJcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcbmNvbnN0IFVSTF9QUkVGSVggPSBcImh0dHBzOi8vcWMtcHViZmlsZS5vc3MtY24tc2hhbmdoYWkuYWxpeXVuY3MuY29tL3hjeF9ib3R0bGUvXCJcclxuXHJcbmludGVyZmFjZSBJQm90dGxlQ29uZmlne1xyXG4gIHBhdGg6IHN0cmluZ1xyXG4gIG5hbWU6IHN0cmluZ1xyXG59XHJcblxyXG5jbGFzcyBCb3R0bGUge1xyXG4gIHBhdGg6IHN0cmluZ1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIGZ1bGw6IG51bWJlclxyXG5cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBJQm90dGxlQ29uZmlnKSB7XHJcbiAgICB0aGlzLnBhdGggPSBVUkxfUFJFRklYICsgXCJmaWdzL1wiICsgY29udGVudC5wYXRoXHJcbiAgICB0aGlzLm5hbWUgPSBjb250ZW50Lm5hbWVcclxuICAgIHRoaXMuZnVsbCA9IDBcclxuICAgIFxyXG4gICAgdGhpcy5kb3dubG9hZCgpXHJcbiAgfVxyXG5cclxuICBhc3luYyBkb3dubG9hZCgpe1xyXG4gICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgdXJsOiB0aGlzLnBhdGgsXHJcbiAgICAgIHN1Y2Nlc3M6IHJlcz0+e1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRoaXMucGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGNvbnNvbGUuZXJyb3JcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5mdWxsIDwgNSkge1xyXG4gICAgICB0aGlzLmZ1bGwgKz0gMVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLmZ1bGwgPSAwXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBib3R0bGVzOltdIGFzIEJvdHRsZVtdLFxyXG4gICAgZXhwb3J0YnRuRGlzOiBmYWxzZSxcclxuICAgIGV4cG9ydGJ0blRleHQ6IFwi5YiG5Lqr5Zu+54mHXCIsXHJcbiAgICBpc2F1dGg6IHRydWUsXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICB3eC5jbG91ZC5pbml0KClcclxuICAgIHZhciBmcyA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKClcclxuICAgIHd4LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgIHVybDogJ2h0dHBzOi8vcWMtcHViZmlsZS5vc3MtY24tc2hhbmdoYWkuYWxpeXVuY3MuY29tL3hjeF9ib3R0bGUvYm90dGxlbGlzdDEuanNvbicsXHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB2YXIgY29udGVudHM6IElCb3R0bGVDb25maWdbXSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHJlcy50ZW1wRmlsZVBhdGgsIFwidXRmOFwiKS50b1N0cmluZygpKVxyXG4gICAgICAgIGNvbnN0IGJvdHRsZXMgPSBjb250ZW50cy5tYXAoY29uZmlnID0+IG5ldyBCb3R0bGUoY29uZmlnKSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgYm90dGxlc1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmJvdHRsZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGNvbnNvbGUuZXJyb3JcclxuICAgIH0pXHJcbiAgICAvLyB2YXIgYm90dGxlZGF0YSA9IHJlcXVpcmUoJy4uLy4uL2JvdHRsZXMvYm90dGxlcy5qcycpXHJcbiAgICAvLyB2YXIgY29udGVudHM6IElCb3R0bGVDb25maWdbXSA9IGJvdHRsZWRhdGEuYm90dGxlbGlzdFxyXG4gICAgLy8gY29uc3QgYm90dGxlcyA9IGNvbnRlbnRzLm1hcChjb25maWcgPT4gbmV3IEJvdHRsZShjb25maWcpKVxyXG4gICAgLy8gdGhpcy5zZXREYXRhKHtcclxuICAgIC8vICAgYm90dGxlc1xyXG4gICAgLy8gfSlcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ib3R0bGVzKVxyXG4gIH0sXHJcbiAgdXBkYXRlQm90dGxlKGV2ZW50OmFueSl7XHJcbiAgICB2YXIgYm90dGxlcyA9IHRoaXMuZGF0YS5ib3R0bGVzXHJcbiAgICB2YXIgaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgIGJvdHRsZXNbaWRdLnVwZGF0ZSgpXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBib3R0bGVzLFxyXG4gICAgICBleHBvcnRidG5EaXM6IGZhbHNlLFxyXG4gICAgICBleHBvcnRidG5UZXh0OiBcIuWIhuS6q+WbvueJh1wiXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZXhwb3J0KCl7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBleHBvcnRidG5EaXM6IHRydWUsXHJcbiAgICAgIGV4cG9ydGJ0blRleHQ6IFwi5q2j5Zyo55Sf5oiQLi4uXCJcclxuICAgIH0pXHJcbiAgICBFeHBvcnQodGhpcy5kYXRhLmJvdHRsZXMsICgpPT57XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZXhwb3J0YnRuRGlzOiB0cnVlLFxyXG4gICAgICAgIGV4cG9ydGJ0blRleHQ6IFwi5bey5L+d5a2YXCJcclxuICAgICAgfSlcclxuICAgIH0sKCk9PntcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpc2F1dGg6IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9LCgpPT57XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZXhwb3J0YnRuRGlzOiBmYWxzZSxcclxuICAgICAgICBleHBvcnRidG5UZXh0OiBcIuWIhuS6q+WbvueJh1wiXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb3BlblNldHRpbmcoKXtcclxuICAgIHd4Lm9wZW5TZXR0aW5nKClcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGV4cG9ydGJ0bkRpczogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGJ0blRleHQ6IFwi5YiG5Lqr5Zu+54mHXCIsXHJcbiAgICAgIGlzYXV0aDogdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==
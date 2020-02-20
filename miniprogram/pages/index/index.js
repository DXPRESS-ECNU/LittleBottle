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
const URL_PREFIX = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/";
class Bottle {
    constructor(content) {
        this.path = URL_PREFIX + "figs/" + content.path;
        this.name = content.name;
        this.full = 0;
        this.download();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            yield wx.cloud.downloadFile({
                fileID: this.path
            }).then(res => {
                this.path = res.tempFilePath;
            }).catch(error => {
                console.error(error);
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
    },
    onLoad() {
        wx.cloud.init();
        var fs = wx.getFileSystemManager();
        wx.cloud.downloadFile({
            fileID: 'cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottlelist1.json',
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
            bottles
        });
    },
    export() {
        this.setData({
            exportbtnDis: true,
            exportbtnText: "正在生成..."
        });
        export_1.Export(this.data.bottles);
        this.setData({
            exportbtnDis: false,
            exportbtnText: "分享图片"
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLHFDQUFpQztBQUVqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUNoQyxNQUFNLFVBQVUsR0FBRyw0REFBNEQsQ0FBQTtBQU8vRSxNQUFNLE1BQU07SUFLVixZQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUViLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRUssUUFBUTs7WUFDWixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUMxQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFWixJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQTtTQUNmO2FBRUQ7WUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtTQUNkO0lBQ0gsQ0FBQztDQUNGO0FBRUQsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFDLEVBQWM7UUFDdEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsYUFBYSxFQUFFLE1BQU07S0FDdEI7SUFDRCxNQUFNO1FBQ0osRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNmLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO1FBQ2xDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSw0RUFBNEU7WUFDcEYsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLFFBQVEsR0FBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDaEcsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTztpQkFDUixDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hDLENBQUM7WUFDRCxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO0lBUUosQ0FBQztJQUNELFlBQVksQ0FBQyxLQUFTO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQy9CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtRQUMxQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE9BQU87U0FDUixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxZQUFZLEVBQUUsSUFBSTtZQUNsQixhQUFhLEVBQUUsU0FBUztTQUN6QixDQUFDLENBQUE7UUFDRixlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsWUFBWSxFQUFFLEtBQUs7WUFDbkIsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXHJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xyXG5cclxuaW1wb3J0IHsgRXhwb3J0IH0gZnJvbSBcIi4vZXhwb3J0XCJcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcbmNvbnN0IFVSTF9QUkVGSVggPSBcImNsb3VkOi8vZHh6c2JvdHRsZS1pdThjeC42NDc4LWR4enNib3R0bGUtaXU4Y3gtMTMwMTMyNzMxNS9cIlxyXG5cclxuaW50ZXJmYWNlIElCb3R0bGVDb25maWd7XHJcbiAgcGF0aDogc3RyaW5nXHJcbiAgbmFtZTogc3RyaW5nXHJcbn1cclxuXHJcbmNsYXNzIEJvdHRsZSB7XHJcbiAgcGF0aDogc3RyaW5nXHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgZnVsbDogbnVtYmVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IElCb3R0bGVDb25maWcpIHtcclxuICAgIHRoaXMucGF0aCA9IFVSTF9QUkVGSVggKyBcImZpZ3MvXCIgKyBjb250ZW50LnBhdGhcclxuICAgIHRoaXMubmFtZSA9IGNvbnRlbnQubmFtZVxyXG4gICAgdGhpcy5mdWxsID0gMFxyXG4gICAgXHJcbiAgICB0aGlzLmRvd25sb2FkKClcclxuICB9XHJcblxyXG4gIGFzeW5jIGRvd25sb2FkKCl7XHJcbiAgICBhd2FpdCB3eC5jbG91ZC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICBmaWxlSUQ6IHRoaXMucGF0aFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKHJlcy50ZW1wRmlsZVBhdGgpXHJcbiAgICAgIHRoaXMucGF0aD1yZXMudGVtcEZpbGVQYXRoXHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuZnVsbCA8IDUpIHtcclxuICAgICAgdGhpcy5mdWxsICs9IDFcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5mdWxsID0gMFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgYm90dGxlczpbXSBhcyBCb3R0bGVbXSxcclxuICAgIGV4cG9ydGJ0bkRpczogZmFsc2UsXHJcbiAgICBleHBvcnRidG5UZXh0OiBcIuWIhuS6q+WbvueJh1wiLFxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgd3guY2xvdWQuaW5pdCgpXHJcbiAgICB2YXIgZnMgPSB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpXHJcbiAgICB3eC5jbG91ZC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICBmaWxlSUQ6ICdjbG91ZDovL2R4enNib3R0bGUtaXU4Y3guNjQ3OC1keHpzYm90dGxlLWl1OGN4LTEzMDEzMjczMTUvYm90dGxlbGlzdDEuanNvbicsXHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgICB2YXIgY29udGVudHM6IElCb3R0bGVDb25maWdbXSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHJlcy50ZW1wRmlsZVBhdGgsIFwidXRmOFwiKS50b1N0cmluZygpKVxyXG4gICAgICAgIGNvbnN0IGJvdHRsZXMgPSBjb250ZW50cy5tYXAoY29uZmlnID0+IG5ldyBCb3R0bGUoY29uZmlnKSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgYm90dGxlc1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmJvdHRsZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGNvbnNvbGUuZXJyb3JcclxuICAgIH0pXHJcbiAgICAvLyB2YXIgYm90dGxlZGF0YSA9IHJlcXVpcmUoJy4uLy4uL2JvdHRsZXMvYm90dGxlcy5qcycpXHJcbiAgICAvLyB2YXIgY29udGVudHM6IElCb3R0bGVDb25maWdbXSA9IGJvdHRsZWRhdGEuYm90dGxlbGlzdFxyXG4gICAgLy8gY29uc3QgYm90dGxlcyA9IGNvbnRlbnRzLm1hcChjb25maWcgPT4gbmV3IEJvdHRsZShjb25maWcpKVxyXG4gICAgLy8gdGhpcy5zZXREYXRhKHtcclxuICAgIC8vICAgYm90dGxlc1xyXG4gICAgLy8gfSlcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ib3R0bGVzKVxyXG4gIH0sXHJcbiAgdXBkYXRlQm90dGxlKGV2ZW50OmFueSl7XHJcbiAgICB2YXIgYm90dGxlcyA9IHRoaXMuZGF0YS5ib3R0bGVzXHJcbiAgICB2YXIgaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgIGJvdHRsZXNbaWRdLnVwZGF0ZSgpXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBib3R0bGVzXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZXhwb3J0KCl7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBleHBvcnRidG5EaXM6IHRydWUsXHJcbiAgICAgIGV4cG9ydGJ0blRleHQ6IFwi5q2j5Zyo55Sf5oiQLi4uXCJcclxuICAgIH0pXHJcbiAgICBFeHBvcnQodGhpcy5kYXRhLmJvdHRsZXMpXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBleHBvcnRidG5EaXM6IGZhbHNlLFxyXG4gICAgICBleHBvcnRidG5UZXh0OiBcIuWIhuS6q+WbvueJh1wiXHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuIl19
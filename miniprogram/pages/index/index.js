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
        export_1.Export(this.data.bottles);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLHFDQUFpQztBQUVqQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUNoQyxNQUFNLFVBQVUsR0FBRyw0REFBNEQsQ0FBQTtBQU8vRSxNQUFNLE1BQU07SUFLVixZQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUViLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRUssUUFBUTs7WUFDWixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUMxQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFWixJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQTtTQUNmO2FBRUQ7WUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtTQUNkO0lBQ0gsQ0FBQztDQUNGO0FBRUQsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFDLEVBQWM7UUFDdEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsYUFBYSxFQUFFLE1BQU07S0FDdEI7SUFDRCxNQUFNO1FBQ0osRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNmLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO1FBQ2xDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSw0RUFBNEU7WUFDcEYsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLFFBQVEsR0FBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDaEcsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTztpQkFDUixDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hDLENBQUM7WUFDRCxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO0lBUUosQ0FBQztJQUNELFlBQVksQ0FBQyxLQUFTO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQy9CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtRQUMxQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE9BQU87WUFDUCxZQUFZLEVBQUUsS0FBSztZQUNuQixhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxZQUFZLEVBQUUsSUFBSTtZQUNsQixhQUFhLEVBQUUsU0FBUztTQUN6QixDQUFDLENBQUE7UUFDRixlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcblxyXG5pbXBvcnQgeyBFeHBvcnQgfSBmcm9tIFwiLi9leHBvcnRcIlxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcclxuY29uc3QgVVJMX1BSRUZJWCA9IFwiY2xvdWQ6Ly9keHpzYm90dGxlLWl1OGN4LjY0NzgtZHh6c2JvdHRsZS1pdThjeC0xMzAxMzI3MzE1L1wiXHJcblxyXG5pbnRlcmZhY2UgSUJvdHRsZUNvbmZpZ3tcclxuICBwYXRoOiBzdHJpbmdcclxuICBuYW1lOiBzdHJpbmdcclxufVxyXG5cclxuY2xhc3MgQm90dGxlIHtcclxuICBwYXRoOiBzdHJpbmdcclxuICBuYW1lOiBzdHJpbmdcclxuICBmdWxsOiBudW1iZXJcclxuXHJcbiAgY29uc3RydWN0b3IoY29udGVudDogSUJvdHRsZUNvbmZpZykge1xyXG4gICAgdGhpcy5wYXRoID0gVVJMX1BSRUZJWCArIFwiZmlncy9cIiArIGNvbnRlbnQucGF0aFxyXG4gICAgdGhpcy5uYW1lID0gY29udGVudC5uYW1lXHJcbiAgICB0aGlzLmZ1bGwgPSAwXHJcbiAgICBcclxuICAgIHRoaXMuZG93bmxvYWQoKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZG93bmxvYWQoKXtcclxuICAgIGF3YWl0IHd4LmNsb3VkLmRvd25sb2FkRmlsZSh7XHJcbiAgICAgIGZpbGVJRDogdGhpcy5wYXRoXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2cocmVzLnRlbXBGaWxlUGF0aClcclxuICAgICAgdGhpcy5wYXRoPXJlcy50ZW1wRmlsZVBhdGhcclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5mdWxsIDwgNSkge1xyXG4gICAgICB0aGlzLmZ1bGwgKz0gMVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLmZ1bGwgPSAwXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBib3R0bGVzOltdIGFzIEJvdHRsZVtdLFxyXG4gICAgZXhwb3J0YnRuRGlzOiBmYWxzZSxcclxuICAgIGV4cG9ydGJ0blRleHQ6IFwi5YiG5Lqr5Zu+54mHXCIsXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICB3eC5jbG91ZC5pbml0KClcclxuICAgIHZhciBmcyA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKClcclxuICAgIHd4LmNsb3VkLmRvd25sb2FkRmlsZSh7XHJcbiAgICAgIGZpbGVJRDogJ2Nsb3VkOi8vZHh6c2JvdHRsZS1pdThjeC42NDc4LWR4enNib3R0bGUtaXU4Y3gtMTMwMTMyNzMxNS9ib3R0bGVsaXN0MS5qc29uJyxcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoKVxyXG4gICAgICAgIHZhciBjb250ZW50czogSUJvdHRsZUNvbmZpZ1tdID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocmVzLnRlbXBGaWxlUGF0aCwgXCJ1dGY4XCIpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgY29uc3QgYm90dGxlcyA9IGNvbnRlbnRzLm1hcChjb25maWcgPT4gbmV3IEJvdHRsZShjb25maWcpKVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBib3R0bGVzXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuYm90dGxlcylcclxuICAgICAgfSxcclxuICAgICAgZmFpbDogY29uc29sZS5lcnJvclxyXG4gICAgfSlcclxuICAgIC8vIHZhciBib3R0bGVkYXRhID0gcmVxdWlyZSgnLi4vLi4vYm90dGxlcy9ib3R0bGVzLmpzJylcclxuICAgIC8vIHZhciBjb250ZW50czogSUJvdHRsZUNvbmZpZ1tdID0gYm90dGxlZGF0YS5ib3R0bGVsaXN0XHJcbiAgICAvLyBjb25zdCBib3R0bGVzID0gY29udGVudHMubWFwKGNvbmZpZyA9PiBuZXcgQm90dGxlKGNvbmZpZykpXHJcbiAgICAvLyB0aGlzLnNldERhdGEoe1xyXG4gICAgLy8gICBib3R0bGVzXHJcbiAgICAvLyB9KVxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kYXRhLmJvdHRsZXMpXHJcbiAgfSxcclxuICB1cGRhdGVCb3R0bGUoZXZlbnQ6YW55KXtcclxuICAgIHZhciBib3R0bGVzID0gdGhpcy5kYXRhLmJvdHRsZXNcclxuICAgIHZhciBpZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgYm90dGxlc1tpZF0udXBkYXRlKClcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGJvdHRsZXMsXHJcbiAgICAgIGV4cG9ydGJ0bkRpczogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGJ0blRleHQ6IFwi5YiG5Lqr5Zu+54mHXCJcclxuICAgIH0pXHJcbiAgfSxcclxuICBleHBvcnQoKXtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGV4cG9ydGJ0bkRpczogdHJ1ZSxcclxuICAgICAgZXhwb3J0YnRuVGV4dDogXCLmraPlnKjnlJ/miJAuLi5cIlxyXG4gICAgfSlcclxuICAgIEV4cG9ydCh0aGlzLmRhdGEuYm90dGxlcylcclxuICB9XHJcbn0pXHJcbiJdfQ==
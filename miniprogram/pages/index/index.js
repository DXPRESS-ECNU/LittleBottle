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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBQ2hDLE1BQU0sVUFBVSxHQUFHLDREQUE0RCxDQUFBO0FBTy9FLE1BQU0sTUFBTTtJQUtWLFlBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBRWIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ2pCLENBQUM7SUFFSyxRQUFROztZQUNaLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTthQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUVaLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQTtZQUM1QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFBO1NBQ2Y7YUFFRDtZQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1NBQ2Q7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUMsRUFBYztRQUN0QixZQUFZLEVBQUUsS0FBSztRQUNuQixhQUFhLEVBQUUsTUFBTTtLQUN0QjtJQUNELE1BQU07UUFJSixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7UUFDbEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFDcEIsTUFBTSxFQUFFLDRFQUE0RTtZQUNwRixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQzdCLElBQUksUUFBUSxHQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUNoRyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtnQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPO2lCQUNSLENBQUMsQ0FBQTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFaEMsQ0FBQztZQUNELElBQUksRUFBRSxPQUFPLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUE7SUFRSixDQUFDO0lBQ0QsWUFBWSxDQUFDLEtBQVM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDL0IsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO1FBQzFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsT0FBTztTQUNSLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGFBQWEsRUFBRSxTQUFTO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xyXG4vLyDojrflj5blupTnlKjlrp7kvotcclxuXHJcbmltcG9ydCB7IEV4cG9ydCB9IGZyb20gXCIuL2V4cG9ydFwiXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxyXG5jb25zdCBVUkxfUFJFRklYID0gXCJjbG91ZDovL2R4enNib3R0bGUtaXU4Y3guNjQ3OC1keHpzYm90dGxlLWl1OGN4LTEzMDEzMjczMTUvXCJcclxuXHJcbmludGVyZmFjZSBJQm90dGxlQ29uZmlne1xyXG4gIHBhdGg6IHN0cmluZ1xyXG4gIG5hbWU6IHN0cmluZ1xyXG59XHJcblxyXG5jbGFzcyBCb3R0bGUge1xyXG4gIHBhdGg6IHN0cmluZ1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIGZ1bGw6IG51bWJlclxyXG5cclxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBJQm90dGxlQ29uZmlnKSB7XHJcbiAgICB0aGlzLnBhdGggPSBVUkxfUFJFRklYICsgXCJmaWdzL1wiICsgY29udGVudC5wYXRoXHJcbiAgICB0aGlzLm5hbWUgPSBjb250ZW50Lm5hbWVcclxuICAgIHRoaXMuZnVsbCA9IDBcclxuICAgIFxyXG4gICAgdGhpcy5kb3dubG9hZCgpXHJcbiAgfVxyXG5cclxuICBhc3luYyBkb3dubG9hZCgpe1xyXG4gICAgYXdhaXQgd3guY2xvdWQuZG93bmxvYWRGaWxlKHtcclxuICAgICAgZmlsZUlEOiB0aGlzLnBhdGhcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgLy9jb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoKVxyXG4gICAgICB0aGlzLnBhdGg9cmVzLnRlbXBGaWxlUGF0aFxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmZ1bGwgPCA1KSB7XHJcbiAgICAgIHRoaXMuZnVsbCArPSAxXHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZnVsbCA9IDBcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIGJvdHRsZXM6W10gYXMgQm90dGxlW10sXHJcbiAgICBleHBvcnRidG5EaXM6IGZhbHNlLFxyXG4gICAgZXhwb3J0YnRuVGV4dDogXCLliIbkuqvlm77niYdcIixcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIC8v6LCD6K+V55SoLOiusOW+l+WIoOmZpFxyXG4gICAgLy9FeHBvcnQoKVxyXG5cclxuICAgIHd4LmNsb3VkLmluaXQoKVxyXG4gICAgdmFyIGZzID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKVxyXG4gICAgd3guY2xvdWQuZG93bmxvYWRGaWxlKHtcclxuICAgICAgZmlsZUlEOiAnY2xvdWQ6Ly9keHpzYm90dGxlLWl1OGN4LjY0NzgtZHh6c2JvdHRsZS1pdThjeC0xMzAxMzI3MzE1L2JvdHRsZWxpc3QxLmpzb24nLFxyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50ZW1wRmlsZVBhdGgpXHJcbiAgICAgICAgdmFyIGNvbnRlbnRzOiBJQm90dGxlQ29uZmlnW10gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhyZXMudGVtcEZpbGVQYXRoLCBcInV0ZjhcIikudG9TdHJpbmcoKSlcclxuICAgICAgICBjb25zdCBib3R0bGVzID0gY29udGVudHMubWFwKGNvbmZpZyA9PiBuZXcgQm90dGxlKGNvbmZpZykpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGJvdHRsZXNcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ib3R0bGVzKVxyXG5cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogY29uc29sZS5lcnJvclxyXG4gICAgfSlcclxuICAgIC8vIHZhciBib3R0bGVkYXRhID0gcmVxdWlyZSgnLi4vLi4vYm90dGxlcy9ib3R0bGVzLmpzJylcclxuICAgIC8vIHZhciBjb250ZW50czogSUJvdHRsZUNvbmZpZ1tdID0gYm90dGxlZGF0YS5ib3R0bGVsaXN0XHJcbiAgICAvLyBjb25zdCBib3R0bGVzID0gY29udGVudHMubWFwKGNvbmZpZyA9PiBuZXcgQm90dGxlKGNvbmZpZykpXHJcbiAgICAvLyB0aGlzLnNldERhdGEoe1xyXG4gICAgLy8gICBib3R0bGVzXHJcbiAgICAvLyB9KVxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kYXRhLmJvdHRsZXMpXHJcbiAgfSxcclxuICB1cGRhdGVCb3R0bGUoZXZlbnQ6YW55KXtcclxuICAgIHZhciBib3R0bGVzID0gdGhpcy5kYXRhLmJvdHRsZXNcclxuICAgIHZhciBpZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgYm90dGxlc1tpZF0udXBkYXRlKClcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGJvdHRsZXNcclxuICAgIH0pXHJcbiAgfSxcclxuICBleHBvcnQoKXtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGV4cG9ydGJ0bkRpczogdHJ1ZSxcclxuICAgICAgZXhwb3J0YnRuVGV4dDogXCLmraPlnKjnlJ/miJAuLi5cIlxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==
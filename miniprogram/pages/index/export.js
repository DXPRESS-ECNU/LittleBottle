"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = (bottles, success, needauth, getauth) => {
    const drawPic = (context, url, quality) => {
        let x = quality[0];
        let y = quality[1];
        let width = quality[2];
        let height = quality[3];
        context.drawImage(url, x, y, width, height);
    };
    const drawText = (context, text, quality) => {
        let x = quality[0];
        x -= (text.length - 4) * 20;
        let y = quality[1];
        let width = quality[2];
        context.setFontSize(40);
        context.fillText(text, x, y, width);
    };
    const drawAll = (context, bottleUrl, bgUrl) => {
        const bottleHeight = 300;
        const bottleWidth = 200;
        const titleHeight = 150;
        const picWidth = 100;
        context.drawImage(bgUrl, 0, 0, 1300, 2800);
        let bottleIndex = 0;
        for (let y = 1; y <= 6; ++y) {
            for (let x = 1; x <= 5; ++x) {
                for (let i = 1; i <= bottles[bottleIndex].full; ++i) {
                    switch (i) {
                        case 1: {
                            drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 85, (bottleHeight + 100) * (y - 1) + titleHeight + 195, picWidth, picWidth]);
                            break;
                        }
                        case 2: {
                            drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 160, picWidth, picWidth]);
                            break;
                        }
                        case 3: {
                            drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 85, (bottleHeight + 100) * (y - 1) + titleHeight + 100, picWidth, picWidth]);
                            break;
                        }
                        case 4: {
                            drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 60, picWidth, picWidth]);
                            break;
                        }
                        case 5: {
                            drawPic(context, bottles[bottleIndex].path, [50 * x + bottleWidth * (x - 1) + 63, (bottleHeight + 100) * (y - 1) + titleHeight - 10, picWidth, picWidth]);
                            break;
                        }
                    }
                }
                drawPic(context, bottleUrl, [50 * x + bottleWidth * (x - 1), (bottleHeight + 100) * (y - 1) + titleHeight, bottleWidth, bottleHeight]);
                drawText(context, bottles[bottleIndex].name, [50 * x + bottleWidth * (x - 1) + 15, (bottleHeight + 50) * y + 50 * (y - 1) + titleHeight, 300]);
                bottleIndex++;
            }
        }
    };
    const context = wx.createCanvasContext('bottleImg');
    const bottleUrl = "https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/bottle.png";
    const backgroundUrl = "https://qc-pubfile.oss-cn-shanghai.aliyuncs.com/xcx_bottle/background.jpg";
    let backgroundPath;
    wx.downloadFile({
        url: backgroundUrl,
        success: res => {
            backgroundPath = res.tempFilePath;
            console.log("Background" + backgroundPath);
            wx.downloadFile({
                url: bottleUrl,
                success: res => {
                    drawAll(context, res.tempFilePath, backgroundPath);
                    context.draw(true, function () {
                        wx.canvasToTempFilePath({
                            canvasId: "bottleImg",
                            quality: 1,
                            destWidth: 1300,
                            destHeight: 2800,
                            success(res) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                    success() {
                                        console.log("Saved");
                                        success();
                                    },
                                    fail(res) {
                                        console.log(res.errMsg);
                                        wx.getSetting({
                                            success(res) {
                                                if (!res.authSetting['scope.writePhotosAlbum']) {
                                                    needauth();
                                                    wx.authorize({
                                                        scope: 'scope.writePhotosAlbum',
                                                        success() {
                                                            getauth();
                                                        },
                                                        fail() {
                                                            console.error("Authorization Failed");
                                                            needauth();
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxNQUFNLEdBQUMsQ0FBQyxPQUFjLEVBQUMsT0FBaUIsRUFBQyxRQUFrQixFQUFDLE9BQWlCLEVBQVEsRUFBRTtJQUNsRyxNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQXdDLEVBQUUsR0FBVyxFQUFFLE9BQWlCLEVBQVEsRUFBRTtRQUNqRyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFdkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFN0MsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUF3QyxFQUFFLElBQVksRUFBRSxPQUFpQixFQUFRLEVBQUU7UUFDbkcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQzNCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLENB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LENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7NERBQ3JDLFFBQVEsRUFBRSxDQUFBO3dEQUNaLENBQUM7cURBQ0YsQ0FBQyxDQUFBO2lEQUNIOzRDQUNILENBQUM7eUNBQ0YsQ0FBQyxDQUFBO29DQUNKLENBQUM7aUNBQ0YsQ0FBQyxDQUFBOzRCQUNKLENBQUM7eUJBQ0YsQ0FBQyxDQUFBO29CQUNKLENBQUMsQ0FBQyxDQUFBO2dCQUVKLENBQUM7YUFDRixDQUFDLENBQUE7UUFFSixDQUFDO0tBQ0EsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEV4cG9ydD0oYm90dGxlczogYW55W10sc3VjY2VzczogRnVuY3Rpb24sbmVlZGF1dGg6IEZ1bmN0aW9uLGdldGF1dGg6IEZ1bmN0aW9uKTogdm9pZCA9PntcclxuICBjb25zdCBkcmF3UGljID0gKGNvbnRleHQ6IFdlY2hhdE1pbmlwcm9ncmFtLkNhbnZhc0NvbnRleHQsIHVybDogc3RyaW5nLCBxdWFsaXR5OiBudW1iZXJbXSk6IHZvaWQgPT57XHJcbiAgICBsZXQgeCA9IHF1YWxpdHlbMF1cclxuICAgIGxldCB5ID0gcXVhbGl0eVsxXVxyXG4gICAgbGV0IHdpZHRoID0gcXVhbGl0eVsyXVxyXG4gICAgbGV0IGhlaWdodCA9IHF1YWxpdHlbM11cclxuXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh1cmwsIHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcblxyXG4gIH1cclxuICBjb25zdCBkcmF3VGV4dCA9IChjb250ZXh0OiBXZWNoYXRNaW5pcHJvZ3JhbS5DYW52YXNDb250ZXh0LCB0ZXh0OiBzdHJpbmcsIHF1YWxpdHk6IG51bWJlcltdKTogdm9pZCA9PntcclxuICAgIGxldCB4ID0gcXVhbGl0eVswXVxyXG4gICAgeCAtPSAodGV4dC5sZW5ndGggLSA0KSAqIDIwXHJcbiAgICBsZXQgeSA9IHF1YWxpdHlbMV1cclxuICAgIGxldCB3aWR0aCA9IHF1YWxpdHlbMl1cclxuICAgIGNvbnRleHQuc2V0Rm9udFNpemUoNDApXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHksIHdpZHRoKVxyXG4gIH1cclxuICBjb25zdCBkcmF3QWxsID0gKGNvbnRleHQ6IFdlY2hhdE1pbmlwcm9ncmFtLkNhbnZhc0NvbnRleHQsIGJvdHRsZVVybDogc3RyaW5nLCBiZ1VybDogc3RyaW5nKTogdm9pZCA9PntcclxuICAgIGNvbnN0IGJvdHRsZUhlaWdodCA9IDMwMFxyXG4gICAgY29uc3QgYm90dGxlV2lkdGggPSAyMDBcclxuICAgIGNvbnN0IHRpdGxlSGVpZ2h0ID0gMTUwXHJcbiAgICBjb25zdCBwaWNXaWR0aCA9IDEwMFxyXG5cclxuICAgIC8vIC8v55S76IOM5pmvXHJcbiAgICAvLyBjb250ZXh0LnJlY3QoMCwgMCwgMTMwMCwgNDAwMClcclxuICAgIC8vIGNvbnRleHQuc2V0RmlsbFN0eWxlKFwid2hpdGVcIilcclxuICAgIC8vIGNvbnRleHQuZmlsbCgpXHJcbiAgICAvLyAvL2NvbnRleHQuZHJhdygpXHJcbiAgICAvLyBjb250ZXh0LnNldEZpbGxTdHlsZShcImJsYWNrXCIpXHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShiZ1VybCwgMCwgMCwgMTMwMCwgMjgwMClcclxuXHJcbiAgICBsZXQgYm90dGxlSW5kZXggPSAwXHJcbiAgICBmb3IobGV0IHkgPSAxOyB5IDw9IDY7ICsreSl7XHJcbiAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDU7ICsreCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGJvdHRsZXNbYm90dGxlSW5kZXhdLmZ1bGw7ICsraSl7XHJcbiAgICAgICAgICBzd2l0Y2goaSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgZHJhd1BpYyhjb250ZXh0LCBib3R0bGVzW2JvdHRsZUluZGV4XS5wYXRoLCBbNTAgKiB4ICsgYm90dGxlV2lkdGggKiAoeCAtIDEpICsgODUsIChib3R0bGVIZWlnaHQgKyAxMDApICogKHkgLSAxKSArIHRpdGxlSGVpZ2h0ICsgMTk1LCBwaWNXaWR0aCwgcGljV2lkdGhdKVxyXG4gICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICBkcmF3UGljKGNvbnRleHQsIGJvdHRsZXNbYm90dGxlSW5kZXhdLnBhdGgsIFs1MCAqIHggKyBib3R0bGVXaWR0aCAqICh4IC0gMSkgKyA1LCAoYm90dGxlSGVpZ2h0ICsgMTAwKSAqICh5IC0gMSkgKyB0aXRsZUhlaWdodCArIDE2MCwgcGljV2lkdGgsIHBpY1dpZHRoXSlcclxuICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgZHJhd1BpYyhjb250ZXh0LCBib3R0bGVzW2JvdHRsZUluZGV4XS5wYXRoLCBbNTAgKiB4ICsgYm90dGxlV2lkdGggKiAoeCAtIDEpICsgODUsIChib3R0bGVIZWlnaHQgKyAxMDApICogKHkgLSAxKSArIHRpdGxlSGVpZ2h0ICsgMTAwLCBwaWNXaWR0aCwgcGljV2lkdGhdKVxyXG4gICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICBkcmF3UGljKGNvbnRleHQsIGJvdHRsZXNbYm90dGxlSW5kZXhdLnBhdGgsIFs1MCAqIHggKyBib3R0bGVXaWR0aCAqICh4IC0gMSkgKyA1LCAoYm90dGxlSGVpZ2h0ICsgMTAwKSAqICh5IC0gMSkgKyB0aXRsZUhlaWdodCArIDYwLCBwaWNXaWR0aCwgcGljV2lkdGhdKVxyXG4gICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSA1OiB7XHJcbiAgICAgICAgICAgICAgZHJhd1BpYyhjb250ZXh0LCBib3R0bGVzW2JvdHRsZUluZGV4XS5wYXRoLCBbNTAgKiB4ICsgYm90dGxlV2lkdGggKiAoeCAtIDEpICsgNjMsIChib3R0bGVIZWlnaHQgKyAxMDApICogKHkgLSAxKSArIHRpdGxlSGVpZ2h0LTEwLCBwaWNXaWR0aCwgcGljV2lkdGhdKVxyXG4gICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd1BpYyhjb250ZXh0LCBib3R0bGVVcmwsIFs1MCAqIHggKyBib3R0bGVXaWR0aCAqICh4IC0gMSksIChib3R0bGVIZWlnaHQgKyAxMDApICogKHkgLSAxKSArIHRpdGxlSGVpZ2h0LCBib3R0bGVXaWR0aCwgYm90dGxlSGVpZ2h0XSlcclxuICAgICAgICBkcmF3VGV4dChjb250ZXh0LCBib3R0bGVzW2JvdHRsZUluZGV4XS5uYW1lLCBbNTAqeCtib3R0bGVXaWR0aCooeC0xKSsxNSwgKGJvdHRsZUhlaWdodCs1MCkqeSs1MCooeS0xKSt0aXRsZUhlaWdodCwgMzAwXSlcclxuICAgICAgICBib3R0bGVJbmRleCsrXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbnRleHQgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdib3R0bGVJbWcnKVxyXG4gIGNvbnN0IGJvdHRsZVVybCA9IFwiaHR0cHM6Ly9xYy1wdWJmaWxlLm9zcy1jbi1zaGFuZ2hhaS5hbGl5dW5jcy5jb20veGN4X2JvdHRsZS9ib3R0bGUucG5nXCJcclxuICBjb25zdCBiYWNrZ3JvdW5kVXJsID0gXCJodHRwczovL3FjLXB1YmZpbGUub3NzLWNuLXNoYW5naGFpLmFsaXl1bmNzLmNvbS94Y3hfYm90dGxlL2JhY2tncm91bmQuanBnXCJcclxuICBsZXQgYmFja2dyb3VuZFBhdGg6IHN0cmluZ1xyXG5cclxuICB3eC5kb3dubG9hZEZpbGUoe1xyXG4gICAgdXJsOiBiYWNrZ3JvdW5kVXJsLFxyXG4gICAgc3VjY2VzczogcmVzID0+e1xyXG4gICAgICBiYWNrZ3JvdW5kUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcclxuICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kXCIgKyBiYWNrZ3JvdW5kUGF0aClcclxuICAgICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgICB1cmw6IGJvdHRsZVVybCxcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT57XHJcbiAgICAgICAgICBkcmF3QWxsKGNvbnRleHQsIHJlcy50ZW1wRmlsZVBhdGgsIGJhY2tncm91bmRQYXRoKVxyXG4gICAgXHJcbiAgICAgICAgICBjb250ZXh0LmRyYXcodHJ1ZSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xyXG4gICAgICAgICAgICAgIGNhbnZhc0lkOiBcImJvdHRsZUltZ1wiLFxyXG4gICAgICAgICAgICAgIHF1YWxpdHk6IDEsXHJcbiAgICAgICAgICAgICAgZGVzdFdpZHRoOiAxMzAwLFxyXG4gICAgICAgICAgICAgIGRlc3RIZWlnaHQ6IDI4MDAsXHJcbiAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNhdmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZylcclxuICAgICAgICAgICAgICAgICAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzLmF1dGhTZXR0aW5nWydzY29wZS53cml0ZVBob3Rvc0FsYnVtJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkYXV0aCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd3guYXV0aG9yaXplKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiAnc2NvcGUud3JpdGVQaG90b3NBbGJ1bScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0YXV0aCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbCAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBdXRob3JpemF0aW9uIEZhaWxlZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkYXV0aCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICB9KVxyXG4gIFxyXG59Il19
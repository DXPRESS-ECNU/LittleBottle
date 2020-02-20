"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = function (bottles) {
    var drawPic = function (context, url, quality) {
        var x = quality[0];
        var y = quality[1];
        var width = quality[2];
        var height = quality[3];
        wx.downloadFile({
            url: url,
            success: function (res) {
                if (res.statusCode == 200) {
                    console.log(res.tempFilePath);
                    context.drawImage(res.tempFilePath, x, y, width, height);
                }
            },
            fail: function (res) {
                console.log(res.errMsg);
            }
        });
    };
    var drawText = function (context, text, quality) {
        var x = quality[0];
        var y = quality[1];
        var width = quality[2];
        context.setFontSize(30);
        context.fillText(text, x, y, width);
    };
    var context = wx.createCanvasContext('bottleImg');
    var bottleUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottle.png";
    var picUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/1.png";
    var bottleHeight = 310;
    var bottleWidth = 200;
    var titleHeight = 300;
    var picWidth = 180;
    for (var y = 1; y <= 6; ++y) {
        for (var x = 1; x <= 5; ++x) {
            drawPic(context, bottleUrl, [50 * x + bottleWidth * (x - 1), (bottleHeight + 100) * (y - 1) + titleHeight, bottleWidth, bottleHeight]);
            drawPic(context, picUrl, [50 * x + bottleWidth * (x - 1) + 5, (bottleHeight + 100) * (y - 1) + titleHeight + 100, picWidth, picWidth]);
            drawText(context, "有四个字", [50 * x + bottleWidth * (x - 1) + 40, (bottleHeight + 50) * y + 50 * (y - 1) + titleHeight, 150]);
        }
    }
    context.draw(true, function () {
        setTimeout(function () {
            wx.canvasToTempFilePath({
                canvasId: "bottleImg",
                quality: 1,
                success: function (res) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function () {
                            console.log("成功保存");
                        },
                        fail: function (res) {
                            console.log(res.errMsg);
                        }
                    });
                }
            });
        }, 3000);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxNQUFNLEdBQUMsVUFBQyxPQUFpQjtJQUNwQyxJQUFNLE9BQU8sR0FBRyxVQUFDLE9BQXNCLEVBQUUsR0FBVyxFQUFFLE9BQWlCO1FBQ3JFLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQVd2QixFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ2QsR0FBRyxFQUFFLEdBQUc7WUFDUixPQUFPLFlBQUMsR0FBRztnQkFDVCxJQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUUsR0FBRyxFQUFDO29CQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtvQkFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2lCQUN6RDtZQUNILENBQUM7WUFDRCxJQUFJLFlBQUMsR0FBRztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0lBQ0QsSUFBTSxRQUFRLEdBQUcsVUFBQyxPQUFzQixFQUFFLElBQVksRUFBRSxPQUFpQjtRQUN2RSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFckMsQ0FBQyxDQUFBO0lBQ0QsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ25ELElBQU0sU0FBUyxHQUFHLHNFQUFzRSxDQUFBO0lBQ3hGLElBQU0sTUFBTSxHQUFHLGlFQUFpRSxDQUFBO0lBQ2hGLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQTtJQUN4QixJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUE7SUFDdkIsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFBO0lBQ3ZCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTtJQUNwQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFHM0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUE7WUFDdEgsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsV0FBVyxHQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtZQUVsSCxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksR0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ3RHO0tBQ0Y7SUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixVQUFVLENBQUM7WUFDVCxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPLFlBQUMsR0FBRztvQkFDVCxFQUFFLENBQUMsc0JBQXNCLENBQUM7d0JBQ3hCLFFBQVEsRUFBRSxHQUFHLENBQUMsWUFBWTt3QkFDMUIsT0FBTzs0QkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dCQUNyQixDQUFDO3dCQUNELElBQUksWUFBQyxHQUFHOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dCQUN6QixDQUFDO3FCQUNGLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1IsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRXhwb3J0PShib3R0bGVzOiBCb3R0bGVbXSk6IHZvaWQgPT57XHJcbiAgY29uc3QgZHJhd1BpYyA9IChjb250ZXh0OiBDYW52YXNDb250ZXh0LCB1cmw6IHN0cmluZywgcXVhbGl0eTogbnVtYmVyW10pOiB2b2lkID0+e1xyXG4gICAgbGV0IHggPSBxdWFsaXR5WzBdXHJcbiAgICBsZXQgeSA9IHF1YWxpdHlbMV1cclxuICAgIGxldCB3aWR0aCA9IHF1YWxpdHlbMl1cclxuICAgIGxldCBoZWlnaHQgPSBxdWFsaXR5WzNdXHJcbiAgICAvLyB3eC5nZXRJbWFnZUluZm8oe1xyXG4gICAgLy8gICBzcmM6IHVybCxcclxuICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgLy8gICAgIGNvbnRleHQuZHJhd0ltYWdlKHJlcy5wYXRoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgLy8gICAgIC8vY29udGV4dC5kcmF3KHRydWUpXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KVxyXG4gICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgdXJsOiB1cmwsXHJcbiAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICBpZihyZXMuc3RhdHVzQ29kZT09MjAwKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50ZW1wRmlsZVBhdGgpXHJcbiAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShyZXMudGVtcEZpbGVQYXRoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbChyZXMpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGNvbnN0IGRyYXdUZXh0ID0gKGNvbnRleHQ6IENhbnZhc0NvbnRleHQsIHRleHQ6IHN0cmluZywgcXVhbGl0eTogbnVtYmVyW10pOiB2b2lkID0+e1xyXG4gICAgbGV0IHggPSBxdWFsaXR5WzBdXHJcbiAgICBsZXQgeSA9IHF1YWxpdHlbMV1cclxuICAgIGxldCB3aWR0aCA9IHF1YWxpdHlbMl1cclxuICAgIGNvbnRleHQuc2V0Rm9udFNpemUoMzApXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHksIHdpZHRoKVxyXG4gICAgLy9jb250ZXh0LmRyYXcodHJ1ZSlcclxuICB9XHJcbiAgY29uc3QgY29udGV4dCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ2JvdHRsZUltZycpXHJcbiAgY29uc3QgYm90dGxlVXJsID0gXCJjbG91ZDovL2R4enNib3R0bGUtaXU4Y3guNjQ3OC1keHpzYm90dGxlLWl1OGN4LTEzMDEzMjczMTUvYm90dGxlLnBuZ1wiXHJcbiAgY29uc3QgcGljVXJsID0gXCJjbG91ZDovL2R4enNib3R0bGUtaXU4Y3guNjQ3OC1keHpzYm90dGxlLWl1OGN4LTEzMDEzMjczMTUvMS5wbmdcIlxyXG4gIGNvbnN0IGJvdHRsZUhlaWdodCA9IDMxMFxyXG4gIGNvbnN0IGJvdHRsZVdpZHRoID0gMjAwXHJcbiAgY29uc3QgdGl0bGVIZWlnaHQgPSAzMDBcclxuICBjb25zdCBwaWNXaWR0aCA9IDE4MFxyXG4gIGZvcihsZXQgeSA9IDE7IHkgPD0gNjsgKyt5KXtcclxuICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDU7ICsreCkge1xyXG4gICAgICAvL3RvZG8g5qCH6aKYXHJcbiAgICAgIC8v55S755O25a2QXHJcbiAgICAgIGRyYXdQaWMoY29udGV4dCwgYm90dGxlVXJsLCBbNTAqeCtib3R0bGVXaWR0aCooeC0xKSwgKGJvdHRsZUhlaWdodCsxMDApKih5LTEpK3RpdGxlSGVpZ2h0LCBib3R0bGVXaWR0aCwgYm90dGxlSGVpZ2h0XSlcclxuICAgICAgZHJhd1BpYyhjb250ZXh0LCBwaWNVcmwsIFs1MCp4K2JvdHRsZVdpZHRoKih4LTEpKzUsIChib3R0bGVIZWlnaHQrMTAwKSooeS0xKSt0aXRsZUhlaWdodCsxMDAsIHBpY1dpZHRoLCBwaWNXaWR0aF0pXHJcbiAgICAgIC8v55O25a2Q5LiL55qE5a2XXHJcbiAgICAgIGRyYXdUZXh0KGNvbnRleHQsIFwi5pyJ5Zub5Liq5a2XXCIsIFs1MCp4K2JvdHRsZVdpZHRoKih4LTEpKzQwLCAoYm90dGxlSGVpZ2h0KzUwKSp5KzUwKih5LTEpK3RpdGxlSGVpZ2h0LCAxNTBdKVxyXG4gICAgfVxyXG4gIH1cclxuICBjb250ZXh0LmRyYXcodHJ1ZSwgZnVuY3Rpb24oKXtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xyXG4gICAgICAgIGNhbnZhc0lkOiBcImJvdHRsZUltZ1wiLFxyXG4gICAgICAgIHF1YWxpdHk6IDEsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+S/neWtmFwiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSwgMzAwMClcclxuICAgIH0pXHJcbn0iXX0=
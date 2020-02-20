"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = function () {
    var drawPic = function (context, url, quality) {
        var x = quality[0];
        var y = quality[1];
        var width = quality[2];
        var height = quality[3];
        wx.getImageInfo({
            src: url,
            success: function (res) {
                context.drawImage(res.path, x, y, width, height);
                context.draw(true);
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
        context.draw(true);
    };
    var context = wx.createCanvasContext('bottleImg');
    var bottleUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/bottle.png";
    var picUrl = "cloud://dxzsbottle-iu8cx.6478-dxzsbottle-iu8cx-1301327315/figs/1.png";
    var bottleHeight = 310;
    var bottleWidth = 200;
    var titleHeight = 300;
    var picWidth = 180;
    context.rect(0, 0, 1300, 4000);
    context.setFillStyle("white");
    context.fill();
    context.draw();
    context.setFillStyle("black");
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
        }, 6000);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxNQUFNLEdBQUM7SUFDbEIsSUFBTSxPQUFPLEdBQUcsVUFBQyxPQUFzQixFQUFFLEdBQVcsRUFBRSxPQUFpQjtRQUNyRSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkIsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNkLEdBQUcsRUFBRSxHQUFHO1lBQ1IsT0FBTyxFQUFFLFVBQVUsR0FBRztnQkFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUNoRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3BCLENBQUM7WUFDRCxJQUFJLEVBQUUsVUFBVSxHQUFHO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0lBQ0QsSUFBTSxRQUFRLEdBQUcsVUFBQyxPQUFzQixFQUFFLElBQVksRUFBRSxPQUFpQjtRQUN2RSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsV0FBVyxD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SixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDUixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBFeHBvcnQ9KCk6IHZvaWQgPT57XHJcbiAgY29uc3QgZHJhd1BpYyA9IChjb250ZXh0OiBDYW52YXNDb250ZXh0LCB1cmw6IHN0cmluZywgcXVhbGl0eTogbnVtYmVyW10pOiB2b2lkID0+e1xyXG4gICAgbGV0IHggPSBxdWFsaXR5WzBdXHJcbiAgICBsZXQgeSA9IHF1YWxpdHlbMV1cclxuICAgIGxldCB3aWR0aCA9IHF1YWxpdHlbMl1cclxuICAgIGxldCBoZWlnaHQgPSBxdWFsaXR5WzNdXHJcbiAgICB3eC5nZXRJbWFnZUluZm8oe1xyXG4gICAgICBzcmM6IHVybCxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHJlcy5wYXRoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICAgIGNvbnRleHQuZHJhdyh0cnVlKVxyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgY29uc3QgZHJhd1RleHQgPSAoY29udGV4dDogQ2FudmFzQ29udGV4dCwgdGV4dDogc3RyaW5nLCBxdWFsaXR5OiBudW1iZXJbXSk6IHZvaWQgPT57XHJcbiAgICBsZXQgeCA9IHF1YWxpdHlbMF1cclxuICAgIGxldCB5ID0gcXVhbGl0eVsxXVxyXG4gICAgbGV0IHdpZHRoID0gcXVhbGl0eVsyXVxyXG4gICAgY29udGV4dC5zZXRGb250U2l6ZSgzMClcclxuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSwgd2lkdGgpXHJcbiAgICBjb250ZXh0LmRyYXcodHJ1ZSlcclxuICB9XHJcbiAgY29uc3QgY29udGV4dCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ2JvdHRsZUltZycpXHJcbiAgY29uc3QgYm90dGxlVXJsID0gXCJjbG91ZDovL2R4enNib3R0bGUtaXU4Y3guNjQ3OC1keHpzYm90dGxlLWl1OGN4LTEzMDEzMjczMTUvYm90dGxlLnBuZ1wiXHJcbiAgY29uc3QgcGljVXJsID0gXCJjbG91ZDovL2R4enNib3R0bGUtaXU4Y3guNjQ3OC1keHpzYm90dGxlLWl1OGN4LTEzMDEzMjczMTUvZmlncy8xLnBuZ1wiXHJcbiAgY29uc3QgYm90dGxlSGVpZ2h0ID0gMzEwXHJcbiAgY29uc3QgYm90dGxlV2lkdGggPSAyMDBcclxuICBjb25zdCB0aXRsZUhlaWdodCA9IDMwMFxyXG4gIGNvbnN0IHBpY1dpZHRoID0gMTgwXHJcblxyXG4gIGNvbnRleHQucmVjdCgwLCAwLCAxMzAwLCA0MDAwKVxyXG4gIGNvbnRleHQuc2V0RmlsbFN0eWxlKFwid2hpdGVcIilcclxuICBjb250ZXh0LmZpbGwoKVxyXG4gIGNvbnRleHQuZHJhdygpXHJcbiAgY29udGV4dC5zZXRGaWxsU3R5bGUoXCJibGFja1wiKVxyXG5cclxuICBmb3IobGV0IHkgPSAxOyB5IDw9IDY7ICsreSl7XHJcbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSA1OyArK3gpIHtcclxuICAgICAgLy90b2RvIOagh+mimFxyXG4gICAgICAvL+eUu+eTtuWtkFxyXG4gICAgICBkcmF3UGljKGNvbnRleHQsIGJvdHRsZVVybCwgWzUwKngrYm90dGxlV2lkdGgqKHgtMSksIChib3R0bGVIZWlnaHQrMTAwKSooeS0xKSt0aXRsZUhlaWdodCwgYm90dGxlV2lkdGgsIGJvdHRsZUhlaWdodF0pXHJcbiAgICAgIGRyYXdQaWMoY29udGV4dCwgcGljVXJsLCBbNTAqeCtib3R0bGVXaWR0aCooeC0xKSs1LCAoYm90dGxlSGVpZ2h0KzEwMCkqKHktMSkrdGl0bGVIZWlnaHQrMTAwLCBwaWNXaWR0aCwgcGljV2lkdGhdKVxyXG4gICAgICAvL+eTtuWtkOS4i+eahOWtl1xyXG4gICAgICBkcmF3VGV4dChjb250ZXh0LCBcIuacieWbm+S4quWtl1wiLCBbNTAqeCtib3R0bGVXaWR0aCooeC0xKSs0MCwgKGJvdHRsZUhlaWdodCs1MCkqeSs1MCooeS0xKSt0aXRsZUhlaWdodCwgMTUwXSlcclxuICAgIH1cclxuICB9XHJcbiAgLy/kv53lrZhcclxuICBjb250ZXh0LmRyYXcodHJ1ZSwgZnVuY3Rpb24oKXtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xyXG4gICAgICAgIGNhbnZhc0lkOiBcImJvdHRsZUltZ1wiLFxyXG4gICAgICAgIHF1YWxpdHk6IDEsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+S/neWtmFwiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSwgNjAwMClcclxuICAgIH0pXHJcbn0iXX0=
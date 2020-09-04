var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import toPX from 'to-px';
import GIF from './gif.js';
var ulink = window.ulink; // 强制类型转换
var Poster = /** @class */ (function () {
    function Poster(option) {
        this.gifList = [];
        this.imageList = [];
        this.isFinish = false;
        this.gifIsFinish = true;
        this.option = option;
        this.canvas = document.querySelector(option.canvas);
        this.context = this.canvas.getContext("2d");
        // 缓冲区
        this.cacheCanvas = document.createElement('canvas');
        this.cacheCanvasCxt = this.cacheCanvas.getContext("2d");
        this.ratio = 1;
        this.setSize(option.width, option.height);
        this.create();
    }
    Poster.prototype.setSize = function (width, height) {
        var canvasWidth = toPX(width) || window.innerWidth;
        var canvasHeight = toPX(height) || window.innerHeight;
        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';
        this.canvas.width = canvasWidth * this.ratio;
        this.canvas.height = canvasHeight * this.ratio;
        this.context.scale(this.ratio, this.ratio);
        // 设置缓冲区大小        
        this.cacheCanvas.style.width = canvasWidth + 'px';
        this.cacheCanvas.style.height = canvasHeight + 'px';
        this.cacheCanvas.width = canvasWidth * this.ratio;
        this.cacheCanvas.height = canvasHeight * this.ratio;
        this.cacheCanvasCxt.scale(this.ratio, this.ratio);
    };
    Poster.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, item, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.option.content.length)) return [3 /*break*/, 10];
                        item = this.option.content[i];
                        if (!(item.type === 'image')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.addImage(item)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(item.type === 'gif')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.render(item, 0)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(item.type === 'text')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.addText(item)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        if (!(item.type === 'video')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.addVideo(item)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 1];
                    case 10:
                        this.context.drawImage(this.cacheCanvas, 0, 0, this.cacheCanvas.width, this.cacheCanvas.height);
                        this.isFinish = true;
                        if (this.option.success) {
                            this.option.success(this.canvas);
                        }
                        else {
                            image = new Image();
                            image.src = this.canvas.toDataURL('image/png', 1);
                            image.style.position = "absolute";
                            image.style.top = "0px";
                            image.style.left = "0px";
                            image.style.width = "100%";
                            image.style.height = "100%";
                            document.body.appendChild(image);
                            this.canvas.style.display = "none";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Poster.prototype.addImage = function (item) {
        var _this = this;
        return new Promise(function (res) {
            var _a = _this.setPosition(item.left, item.top, item.marginLeft, item.marginTop), x = _a.x, y = _a.y;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var image = new Image();
            image.setAttribute("crossOrigin", 'Anonymous'); //' 必须在src赋值钱执行！！！！！！
            image.src = item.url + '?time=' + new Date().getTime();
            image.onload = function () {
                canvas.width = toPX(item.width) * _this.ratio;
                canvas.height = toPX(item.height) * _this.ratio;
                context.drawImage(image, 0, 0, toPX(item.width), toPX(item.height)); // 改变图片大小到1080*980
                if (item.mask && item.mask.type === "round") {
                    context.globalCompositeOperation = "destination-in";
                    context.fillRect(0, 0, 50, 50);
                }
                else if (item.mask && item.mask.type === "circle") {
                    context.globalCompositeOperation = "destination-in";
                    context.arc(toPX(item.width) / 2, toPX(item.width) / 2, toPX(item.width) / 2, 0, Math.PI * 2, true);
                    context.fill();
                }
                else if (item.mask && item.mask.type === "polygon") {
                    context.globalCompositeOperation = "destination-in";
                    context.beginPath();
                    // context.fillStyle="#f00";
                    // context.strokeStyle ="#f00";
                    item.mask.point.forEach(function (item, index) {
                        if (index === 0) {
                            context.moveTo(toPX(item[0]), toPX(item[1]));
                        }
                        else {
                            context.lineTo(toPX(item[0]), toPX(item[1]));
                        }
                    });
                    context.closePath();
                    context.fill();
                    context.restore();
                }
                _this.cacheCanvasCxt.drawImage(canvas, x, y, toPX(item.width), toPX(item.height)); // 改变图片大小到1080*980
                res(image);
            };
        });
    };
    Poster.prototype.addText = function (item) {
        var _this = this;
        return new Promise(function (res) {
            var _a = _this.setPosition(item.left, item.top, item.marginLeft, item.marginTop), x = _a.x, y = _a.y;
            _this.cacheCanvasCxt.font = (item.fontWeight || 'normal') + ' ' + toPX(item.fontSize) + 'px 微软雅黑 ';
            _this.cacheCanvasCxt.fillStyle = item.color;
            _this.cacheCanvasCxt.textAlign = item.align || "left";
            var align = 0;
            if (item.align === "center") {
                align = toPX(item.width) || window.innerWidth / 2;
            }
            else if (item.align === "right") {
                align = toPX(item.width) || window.innerWidth;
            }
            var maxWidth = toPX(item.width) || window.innerWidth;
            var arrText = item.text.split('');
            var line = '';
            for (var n = 0; n < arrText.length; n++) {
                var testLine = line + arrText[n];
                var metrics = _this.cacheCanvasCxt.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    _this.cacheCanvasCxt.fillText(line, x + align, y);
                    line = arrText[n];
                    y += toPX(item.lineHeight);
                }
                else {
                    line = testLine;
                }
            }
            _this.cacheCanvasCxt.fillText(line, x + align, y);
            res();
        });
    };
    Poster.prototype.addVideo = function (item) {
        var _this = this;
        return new Promise(function (res) {
            var _a = _this.setPosition(item.left, item.top, item.marginLeft, item.marginTop), x = _a.x, y = _a.y;
            // const video = document.querySelector('video')
            var video = document.createElement('video');
            video.src = item.url;
            video.loop = true;
            video.setAttribute('playsinline', '');
            console.log(item.autoPlay);
            if (item.autoPlay) {
                document.addEventListener("WeixinJSBridgeReady", function () {
                    video.play();
                }, false);
                video.play();
            }
            setInterval(function () {
                _this.cacheCanvasCxt.drawImage(video, x, y, toPX(item.width), toPX(item.height)); //绘制视频
            }, 10);
            res();
        });
    };
    Poster.prototype.getPixelRatio = function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    Poster.prototype.setPosition = function (x, y, marginLeft, marginTop) {
        if (marginLeft === void 0) { marginLeft = "0rem"; }
        if (marginTop === void 0) { marginTop = "0rem"; }
        return { x: toPX(x) + toPX(marginLeft), y: toPX(y) + toPX(marginTop) };
    };
    Poster.prototype.render = function (item, i) {
        var _this = this;
        return new Promise(function (res) {
            if (i >= 24) {
                i = 0;
            }
            // this.context.save();            
            var _a = _this.setPosition(item.left, item.top, item.marginLeft, item.marginTop), x = _a.x, y = _a.y;
            var image;
            if (_this.imageList[i]) {
                image = _this.imageList[i];
                _this.context.clearRect(0, 0, _this.canvas.width + 1, _this.canvas.height + 1);
                _this.context.drawImage(_this.cacheCanvas, 0, 0, _this.canvas.width, _this.canvas.height);
                _this.context.drawImage(image, x, y, toPX(item.width), toPX(item.height));
                setTimeout(function () {
                    i++;
                    requestAnimationFrame(function () { _this.render(item, i); });
                    res();
                }, 30);
            }
            else {
                image = new Image();
                image.setAttribute("crossOrigin", 'Anonymous'); //' 必须在src赋值钱执行！！！！！！
                image.src = item.url.replace('{i}', String(i)); // + '?time=' + new Date().getTime()
                _this.imageList.push(image);
                image.onload = function () {
                    _this.context.clearRect(0, 0, _this.canvas.width + 1, _this.canvas.height + 1);
                    _this.context.drawImage(_this.cacheCanvas, 0, 0, _this.canvas.width, _this.canvas.height);
                    _this.context.drawImage(image, x, y, toPX(item.width), toPX(item.height));
                    setTimeout(function () {
                        i++;
                        requestAnimationFrame(function () { _this.render(item, i); });
                        res();
                    }, 30);
                };
            }
        });
    };
    Poster.prototype.creatGif = function (num, imgWidth) {
        if (imgWidth === void 0) { imgWidth = '7.5rem'; }
        return __awaiter(this, void 0, void 0, function () {
            var typeGif, width_1, height_1, promiseList, _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isFinish) {
                            if (ulink) {
                                ulink.toast({
                                    content: "画布未加载完成",
                                    duration: 3000,
                                });
                            }
                            else {
                                alert('画布未加载完成');
                            }
                            return [2 /*return*/];
                        }
                        if (!this.gifIsFinish) {
                            return [2 /*return*/];
                        }
                        this.gifIsFinish = false;
                        typeGif = this.option.content.filter(function (item) { return item.type === 'gif'; });
                        if (!(typeGif.length !== 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.photograph()];
                    case 1:
                        _a.sent();
                        if (ulink) {
                            ulink.Dialog.showLoading();
                        }
                        width_1 = toPX(imgWidth);
                        height_1 = width_1 / this.canvas.width * this.canvas.height;
                        this.gif = new GIF({
                            workers: 2,
                            quality: 1,
                            width: width_1,
                            height: height_1
                        });
                        promiseList = [];
                        _loop_1 = function (i) {
                            var img, canvas, context, work, p;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        img = new Image();
                                        img.src = this_1.canvas.toDataURL('image/png', 1);
                                        canvas = document.createElement('canvas');
                                        context = canvas.getContext('2d');
                                        canvas.width = width_1;
                                        canvas.height = height_1;
                                        work = function () {
                                            return new Promise(function (res) {
                                                img.onload = function () {
                                                    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width_1, height_1);
                                                    _this.gifList.push(canvas);
                                                    res(canvas);
                                                };
                                            });
                                        };
                                        p = work();
                                        promiseList.push(p);
                                        return [4 /*yield*/, new Promise(function (res) {
                                                setTimeout(function () {
                                                    res();
                                                }, 200);
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < num)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        Promise.all(promiseList).then(function () {
                            _this.gifList.forEach(function (item) {
                                _this.gif.addFrame(item, { delay: 200 });
                            });
                            _this.gif.on('finished', function (blob) { return __awaiter(_this, void 0, void 0, function () {
                                var base64, image;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (ulink) {
                                                ulink.Dialog.hideLoading();
                                            }
                                            return [4 /*yield*/, this.blobToBase64(blob)];
                                        case 1:
                                            base64 = _a.sent();
                                            this.gifIsFinish = true;
                                            if (this.option.createdGif) {
                                                this.option.createdGif(base64);
                                            }
                                            else {
                                                image = new Image();
                                                image.src = String(base64);
                                                image.style.position = "absolute";
                                                image.style.border = "5px solid #fff";
                                                image.style.borderRadius = "3px";
                                                image.style.bottom = "0";
                                                image.style.right = "0";
                                                image.style.width = "50%";
                                                image.style.height = "50%";
                                                image.style.marginLeft = -(image.width / 2) + 'px';
                                                image.style.marginTop = -(image.height / 2) + 'px';
                                                document.body.appendChild(image);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            _this.gif.render();
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Poster.prototype.blobToBase64 = function (blob) {
        return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                resolve(e.target.result);
            };
            // readAsDataURL
            fileReader.readAsDataURL(blob);
            fileReader.onerror = function () {
                reject(new Error('blobToBase64 error'));
            };
        });
    };
    Poster.prototype.photograph = function () {
        return new Promise(function (res) {
            var div = document.createElement('div');
            div.style.position = "absolute";
            div.style.top = "0px";
            div.style.left = "0px";
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.backgroundColor = '#fff';
            document.body.appendChild(div);
            var opacity = 1;
            var timer = setInterval(function () {
                if (opacity <= 0) {
                    document.body.removeChild(div);
                    clearInterval(timer);
                    res();
                }
                div.style.opacity = String(opacity);
                opacity = opacity - 0.1;
            }, 50);
        });
    };
    return Poster;
}());
export default Poster;

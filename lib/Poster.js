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
var Poster = /** @class */ (function () {
    function Poster(option) {
        this.option = option;
        this.canvas = document.querySelector(option.canvas);
        this.canvas.style.display = "none";
        this.context = this.canvas.getContext("2d");
        this.setSize(option.width, option.height);
        this.create();
    }
    Poster.prototype.setSize = function (width, height) {
        this.canvas.width = toPX(width) || window.innerWidth;
        this.canvas.height = toPX(height) || window.innerHeight;
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
                        if (!(i < this.option.content.length)) return [3 /*break*/, 5];
                        item = this.option.content[i];
                        if (!(item.type === 'image')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.addImage(item)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.addText(item);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        image = new Image();
                        image.src = this.canvas.toDataURL();
                        image.style.position = "absolute";
                        image.style.top = "0px";
                        image.style.left = "0px";
                        image.style.width = "100%";
                        image.style.height = "100%";
                        document.body.appendChild(image);
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
            image.src = item.url;
            image.setAttribute("crossOrigin", 'anonymous');
            image.onload = function () {
                canvas.width = toPX(item.width);
                canvas.height = toPX(item.height);
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
                _this.context.drawImage(canvas, x, y, toPX(item.width), toPX(item.height)); // 改变图片大小到1080*980
                res(image);
            };
        });
    };
    Poster.prototype.addText = function (item) {
        var _a = this.setPosition(item.left, item.top, item.marginLeft, item.marginTop), x = _a.x, y = _a.y;
        this.context.font = (item.fontWeight || 'normal') + ' ' + toPX(item.fontSize) + 'px 微软雅黑 ';
        this.context.fillStyle = item.color;
        this.context.textAlign = item.align || "left";
        var align = 0;
        if (item.align === "center") {
            align = toPX(item.width) || window.innerWidth / 2;
        }
        else if (item.align === "right") {
            align = toPX(item.width) || window.innerWidth;
        }
        this.context.fillText(item.text, x + align, y + toPX(item.fontSize), toPX(item.width) || window.innerWidth);
    };
    Poster.prototype.setPosition = function (x, y, marginLeft, marginTop) {
        if (marginLeft === void 0) { marginLeft = "0rem"; }
        if (marginTop === void 0) { marginTop = "0rem"; }
        return { x: toPX(x) + toPX(marginLeft), y: toPX(y) + toPX(marginTop) };
    };
    return Poster;
}());
export default Poster;

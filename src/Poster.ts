
import toPX from 'to-px'

type itemType = "image" | "text"
type maskType = "circle" | "round" | "polygon"

interface Option {
    canvas: string
    width?: string
    height?: string
    autoRun?: boolean
    content: Array<PosterItem>
}
interface PosterItem {
    type: itemType
    top: string
    left: string
    [propName: string]: any
}

interface PosterText extends PosterItem {
    text?: string
    fontSize?: string
    width?: string,
    color?: string
    align?: CanvasTextAlign
    fontWeight?: string
    lineHeight?: string
}
interface Position {
    x: number
    y: number
}
interface PosterImage extends PosterItem {
    url?: string
    width?: string
    height?: string
    marginLeft?: string
    marginTop?: string
    mask?: {
        type: maskType
        point?: number[]
        radius?: string
    }
}
export default class Poster {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private option: Option
    private ratio: number
    constructor(option: Option) {
        this.option = option
        this.canvas = document.querySelector(option.canvas)
        this.context = this.canvas.getContext("2d")
        this.ratio = this.getPixelRatio(this.context)
        console.log(this.ratio)
        this.setSize(option.width, option.height)
        this.create()
    }
    private setSize(width: string, height: string): void {
        
        this.canvas.width = toPX(width) || window.innerWidth
        this.canvas.height = toPX(height) || window.innerHeight

        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.style.height = this.canvas.height + 'px';
        this.canvas.width = this.canvas.width * this.ratio;
        this.canvas.height = this.canvas.height * this.ratio;
        // 放大倍数
        this.context.scale(this.ratio, this.ratio);
    }
    private async create(): Promise<any> {

        for (let i = 0; i < this.option.content.length; i++) {
            const item = this.option.content[i]
            if (item.type === 'image') {
                await this.addImage(item)
            } else {
                await this.addText(item)
            }

        }

        const image: HTMLImageElement = new Image()
        image.src = this.canvas.toDataURL('image/png', 1)
        image.style.position = "absolute"
        image.style.top = "0px"
        image.style.left = "0px"
        image.style.width = "100%"
        image.style.height = "100%"
        document.body.appendChild(image)
        this.canvas.style.display = "none"
    }
    private addImage(item: PosterImage): Promise<any> {
        return new Promise((res) => {
            const { x, y } = this.setPosition(item.left, item.top, item.marginLeft, item.marginTop)
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const image = new Image()
            image.setAttribute("crossOrigin", 'Anonymous')  //' 必须在src赋值钱执行！！！！！！
            image.src = item.url + '?time=' + new Date().getTime()
            image.onload = () => {
                canvas.width = toPX(item.width)
                canvas.height = toPX(item.height)
                context.drawImage(image, 0, 0, toPX(item.width), toPX(item.height))   // 改变图片大小到1080*980
                if (item.mask && item.mask.type === "round") {
                    context.globalCompositeOperation = "destination-in"
                    context.fillRect(0, 0, 50, 50)
                } else if (item.mask && item.mask.type === "circle") {
                    context.globalCompositeOperation = "destination-in"
                    context.arc(toPX(item.width) / 2, toPX(item.width) / 2, toPX(item.width) / 2, 0, Math.PI * 2, true);
                    context.fill();
                } else if (item.mask && item.mask.type === "polygon") {
                    context.globalCompositeOperation = "destination-in"
                    context.beginPath();
                    // context.fillStyle="#f00";
                    // context.strokeStyle ="#f00";
                    item.mask.point.forEach((item, index) => {
                        if (index === 0) {
                            context.moveTo(toPX(item[0]), toPX(item[1]));
                        } else {
                            context.lineTo(toPX(item[0]), toPX(item[1]))
                        }
                    })
                    context.closePath();
                    context.fill()
                    context.restore()
                }
                console.log(image.width, image.height)
                this.context.drawImage(canvas, x, y, toPX(item.width), toPX(item.height))   // 改变图片大小到1080*980
                res(image)
            }
        })
    }
    private addText(item: PosterText): Promise<any> {
        return new Promise((res) => {
            let { x, y } = this.setPosition(item.left, item.top, item.marginLeft, item.marginTop)
            this.context.font = (item.fontWeight || 'normal') + ' ' + toPX(item.fontSize) + 'px 微软雅黑 '
            this.context.fillStyle = item.color
            this.context.textAlign = item.align || "left"
            let align = 0
            if (item.align === "center") {
                align = toPX(item.width) || window.innerWidth / 2
            } else if (item.align === "right") {
                align = toPX(item.width) || window.innerWidth
            }
            const maxWidth = toPX(item.width) || window.innerWidth
            let arrText = item.text.split('');
            let line = '';
            for (let n = 0; n < arrText.length; n++) {
                let testLine = line + arrText[n];
                let metrics = this.context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    this.context.fillText(line, x + align, y);
                    line = arrText[n];
                    y += toPX(item.lineHeight);
                } else {
                    line = testLine;
                }
            }
            this.context.fillText(line, x + align, y);
            res()
        })


    }
    getPixelRatio(context) {

        const backingStore = context.backingStorePixelRatio ||

            context.webkitBackingStorePixelRatio ||

            context.mozBackingStorePixelRatio ||

            context.msBackingStorePixelRatio ||

            context.oBackingStorePixelRatio ||

            context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;

    }
    private setPosition(x: string, y: string, marginLeft: string = "0rem", marginTop: string = "0rem"): Position {
        return { x: toPX(x) + toPX(marginLeft), y: toPX(y) + toPX(marginTop) }
    }
}
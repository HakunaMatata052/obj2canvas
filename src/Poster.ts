import * as toPX from 'to-px'
import GIF from './gif.js'

type itemType = "image" | "text" | "video" | "gif"
type maskType = "circle" | "round" | "polygon"

let ulink: any = (<any>window).ulink  // 强制类型转换

interface Option {
    canvas: string
    width?: string
    height?: string
    autoRun?: boolean
    success?: Function
    content: Array<PosterItem>
}
interface PosterItem {
    type: itemType
    top: string
    left: string,
    num?: number
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
    private gif: GIF
    private gifList: HTMLCanvasElement[]
    public isFinish: boolean
    constructor(option: Option) {
        this.gifList = []
        this.isFinish = false
        this.option = option
        this.canvas = document.querySelector(option.canvas)
        this.context = this.canvas.getContext("2d")
        this.ratio = this.getPixelRatio(this.context)
        this.setSize(option.width, option.height)
        this.create()
    }
    private setSize(width: string, height: string): void {
        const canvasWidth = toPX(width) || window.innerWidth
        const canvasHeight = toPX(height) || window.innerHeight
        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';
        this.canvas.width = canvasWidth * this.ratio;
        this.canvas.height = canvasHeight * this.ratio;
        // 放大倍数
        this.context.scale(this.ratio, this.ratio);
    }
    private async create(): Promise<any> {
        for (let i = 0; i < this.option.content.length; i++) {
            const item = this.option.content[i]
            if (item.type === 'image') {
                await this.addImage(item)
            } else if (item.type === 'gif') {
                await this.render(item.url, item.num, 0)
            } else if (item.type === 'text') {
                await this.addText(item)
            }
        }
        this.isFinish = true
        if (this.option.autoRun !== false) {
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
        if (this.option.success) {
            this.option.success(this.canvas)
        }
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
    private getPixelRatio(context) {
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
    private render(url: string, num: number, i: number) {
        return new Promise((res) => {
            if (i >= 24) {
                i = 0
            }
            const image = new Image()
            image.setAttribute("crossOrigin", 'Anonymous')  //' 必须在src赋值钱执行！！！！！！
            image.src = url.replace('{i}', String(i)) // + '?time=' + new Date().getTime()
            image.onload = () => {
                let { x, y } = this.setPosition('20vw', '62vh')
                this.context.drawImage(image, x, y, toPX('3rem'), toPX('3rem') / toPX('5.07rem') * toPX('6.64rem'))
                setTimeout(() => {
                    i++
                    requestAnimationFrame(() => { this.render(url, num, i) })
                    res()
                }, 30);
            }
        })

    }
    public async creatGif(num: number, imgWidth: string = '7.5rem') {
        if (!this.isFinish) {
            if (ulink) {
                ulink.toast({
                    content: "画布未加载完成",  //toast展示的文案
                    duration: 3000,  //toast展示时长，单位毫秒（ms）
                });
            } else {
                alert('画布未加载完成')
            }
            return
        }
        const typeGif = this.option.content.filter(item => item.type === 'gif')
        if (typeGif.length !== 0) {
            await this.photograph()
            if (ulink) {
                ulink.Dialog.showLoading()
            }
            const width = toPX(imgWidth)
            const height = width / this.canvas.width * this.canvas.height
            this.gif = new GIF({
                workers: 2,
                quality: 1,
                width,
                height
            })
            let promiseList = []
            for (let i = 0; i < num; i++) {
                let img = new Image()
                img.src = this.canvas.toDataURL('image/png', 1)
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.width = width
                canvas.height = height
                let work = () => {
                    return new Promise(res => {
                        img.onload = () => {
                            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height)
                            this.gifList.push(canvas)
                            res(canvas)
                        }
                    })
                }
                let p = work()
                promiseList.push(p)
                await new Promise(res => {
                    setTimeout(() => {
                        res()
                    }, 200)
                })
            }
            Promise.all(promiseList).then(() => {
                this.gifList.forEach(item => {
                    this.gif.addFrame(item, { delay: 200 })
                })
                this.gif.on('finished', async (blob: Blob) => {
                    if (ulink) {
                        ulink.Dialog.hideLoading()
                    }
                    const base64 = await this.blobToBase64(blob)
                    const image: HTMLImageElement = new Image()
                    image.src = String(base64)
                    image.style.position = "absolute"
                    image.style.border = "5px solid #fff"
                    image.style.borderRadius = "3px"
                    image.style.bottom = "0"
                    image.style.right = "0"
                    image.style.width = "50%"
                    image.style.height = "50%"
                    image.style.marginLeft = -(image.width / 2) + 'px'
                    image.style.marginTop = -(image.height / 2) + 'px'
                    document.body.appendChild(image)
                });
                this.gif.render();
            })
        }
    }
    private blobToBase64(blob: Blob) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(e.target.result);
            };
            // readAsDataURL
            fileReader.readAsDataURL(blob);
            fileReader.onerror = () => {
                reject(new Error('blobToBase64 error'));
            };
        })
    }
    private photograph() {
        return new Promise((res) => {
            const div: HTMLElement = document.createElement('div')
            div.style.position = "absolute"
            div.style.top = "0px"
            div.style.left = "0px"
            div.style.width = "100%"
            div.style.height = "100%"
            div.style.backgroundColor = '#fff'
            document.body.appendChild(div)
            let opacity = 1
            let timer = setInterval(() => {
                if (opacity <= 0) {
                    document.body.removeChild(div)
                    clearInterval(timer)
                    res()
                }
                div.style.opacity = String(opacity)
                opacity = opacity - 0.1
            }, 50)
        })
    }
}
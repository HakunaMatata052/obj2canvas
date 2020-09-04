# 概述
使用对象方式生成一个canvas画布并生成图片，可在移动端实现长按分享海报
对象中可以设置海报的文字及样式，图片大小、位置和遮罩形状

# 安装
```
npm install obj2canvas
```

# 使用
HTML
```html
<canvas id="canvas"></canvas>
```
JS
```javascript
import Poster from 'obj2canvas'
new Poster({
    canvas: "#canvas",
    // width: "100%",
    // height: "100%",
    autoRun:false, // 是否自动生成img图片
    success:function (canvas:HTMLCanvasElement) {  // 画布绘制完成后的回调函数，如果设置autoRun=false,可以在该回调中自行生成img图片
        const image: HTMLImageElement = new Image()
        image.src = canvas.toDataURL('image/png', 1)
        image.style.position = "absolute"
        image.style.top = "0px"
        image.style.left = "0px"
        image.style.width = "100%"
        image.style.height = "100%"
        document.body.appendChild(image)
        canvas.style.display = "none"
    },
    content: [               
        {
            type: "image",  //图片类型
            url: "/bg9.jpg",  //图片地址(支持跨域)
            top: "50vh",   //相对于canvas顶部的距离  （支持rem，vh,vw,不支持百分比）
            left: "0",      //相对于canvas左边的距离  （支持rem，vh,vw,不支持百分比）
            width: "7.5rem",    //图片宽度 （支持rem，vh,vw,不支持百分比）
            height: "16.20rem", //图片高度 （支持rem，vh,vw,不支持百分比）
            marginTop: "-8.1rem", //图片相对于canvas的上外边距 （支持rem，vh,vw,不支持百分比）
        },
        {
            type: "image",
            url: "http://thirdwx.qlogo.cn/mmopen/vi_32/o8z8JIpTZT4vmkfm6Olfq2VwAE2ibH7YU4G3P8iaPI26u9HQlFDwux7LSpHQ4yBRAB6JLt0VIZG07YScyYvkWGxA/132",
            top: "50vh",
            left: "50vw",
            width: "1.29rem",
            height: "1.29rem",
            marginLeft: "-2.77rem", //图片相对于canvas的左外边距 （支持rem，vh,vw,不支持百分比）
            marginTop: "4.25rem",
            mask: {
                type: "circle" //圆形遮罩方式（circle | polygon）
            }
        },
        {
            type: "text", //文本类型
            text: "全服排名99", //文本内容
            fontSize: "1.13rem", //字体大小
            width:"7.5rem", //文本最大宽度
            fontWeight: "bold", //文本加粗
            color: "#f00", //文本颜色
            align: "center",  //文本对齐方式
            top: "50vh", 
            left: "0rem",
            marginTop:"-5.4rem"
        },
                 
        {
            type: "image",
            url: "/qrcode.png",
            top: "50vh",
            left: "50vw",
            width: "1.29rem",
            height: "1.29rem",
            marginLeft: "1.77rem",
            marginTop: "4.25rem",
            mask:{
                type:"polygon",  // 多边形遮罩
                point:[["0rem","0rem"],["1.29rem","0rem"],["0rem","1.29rem"]]  //用一个二位数组表示遮罩的坐标点（先对于图片左上位置），需要至少三个点来绘制一个遮罩
            }
        },
        {
            type:"gif",  //在画布内绘制一组循环播放的序列帧
            url:"/static/{i}.png",  // 序列帧图片路径，其中{i}表示序列帧的编号，必须从0开始顺排
            top:"20vw",
            left:"62vh",
            width:"3rem",
            height:"6.64rem",
            num:10    //序列帧的总数
        }
    ]
})
```
# 属性
```js
poster.isFinish
```
可获取画布是否渲染完毕

# 方法
```js
poster.creatGif(15,"5rem")
```
使用该方法可生成gif动图，第一个参数是动图的帧数，第二个参数是gif的宽度（不建议超过7.5rem）宽度越大生成时间越长，过大会导致生成失败，建议3-7.5rem


# 关于居中
由于需要生成移动端的海报，所以一般都是整平的，这时就需要设置居中
背景居中可以使用这个公式
```js
{
    type: "image",
    url: "//game.gtimg.cn/images/ulink/act/3195/a20200629my/bg9.jpg",
    top:"50vh",     //top设置50vh 即高度的50%
    left:"0",  //left设置0或0rem
    width: "7.5rem",     //宽度设置7.5rem或100vw即100%的宽
    height: "16.20rem",   //高度设置和图片大小一直的高度即可
    marginTop: "-8.1rem", //上边距设置高度一半的相反数
}
```
元素居中与背景类似，`top`设置`50vh`,`marginTop`设置正值则是元素从垂直中点的位置向下的位移，负值相反
水平居中同理`left`设置`50vw`即50%的宽度,`marginLeft`设置正值则是元素从水平中点的位置向右的位移，负值相反

# 更新
- 2020-9-1 text类型增加多行文本支持，行高属性（lineHeight）

# bug反馈
[点击这里](https://github.com/HakunaMatata052/obj2canvas)反馈bug，或push代码
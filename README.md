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
    content: [
        
        {
            type: "image",
            url: "//game.gtimg.cn/images/ulink/act/3195/a20200629my/bg9.jpg",
            top: "50vh",
            left: "0",
            width: "7.5rem",
            height: "16.20rem",
            marginTop: "-8.1rem",
        },
        {
            type: "image",
            url: "http://thirdwx.qlogo.cn/mmopen/vi_32/o8z8JIpTZT4vmkfm6Olfq2VwAE2ibH7YU4G3P8iaPI26u9HQlFDwux7LSpHQ4yBRAB6JLt0VIZG07YScyYvkWGxA/132",
            top: "50vh",
            left: "50vw",
            width: "1.29rem",
            height: "1.29rem",
            marginLeft: "-2.77rem",
            marginTop: "4.25rem",
            mask: {
                type: "circle"
            }
        },
        {
            type: "text",
            text: "全服排名99阿萨的",
            fontSize: "1.13rem",
            lineHeight:"1.3rem",
            width:"3rem",
            fontWeight: "bold",
            color: "#f00",
            align: "left",
            top: "50vh",
            left: "0rem",
            marginTop:"-4.4rem"
        },
        
        {
            type: "image",
            url: "//game.gtimg.cn/images/ulink/act/3195/a20200629my/qrcode.png",
            top: "50vh",
            left: "50vw",
            width: "1.29rem",
            height: "1.29rem",
            marginLeft: "1.77rem",
            marginTop: "4.25rem",
            mask:{
                type:"polygon",
                point:[["0rem","0rem"],["1.29rem","0rem"],["0rem","1.29rem"]]
            }
        },

    ]
})
```

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
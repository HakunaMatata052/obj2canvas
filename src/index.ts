import './assets/less/index.less'
import Poster from './Poster'
// import VConsole from 'vconsole'
// new VConsole()
const poster = new Poster({
    canvas: "#canvas",
    // width: "100%",
    // height: "100%",
    autoRun:false,
    success:function (canvas:HTMLCanvasElement) {
        // console.log(canvas)        
        // const image: HTMLImageElement = new Image()
        // image.src = canvas.toDataURL('image/png', 1)
        // image.style.position = "absolute"
        // image.style.top = "0px"
        // image.style.left = "0px"
        // image.style.width = "100%"
        // image.style.height = "100%"
        // document.body.appendChild(image)
        // canvas.style.display = "none"
    },
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
            url: "//thirdwx.qlogo.cn/mmopen/vi_32/o8z8JIpTZT4vmkfm6Olfq2VwAE2ibH7YU4G3P8iaPI26u9HQlFDwux7LSpHQ4yBRAB6JLt0VIZG07YScyYvkWGxA/132",
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
            text: "全服排名99",
            fontSize: "1.13rem",
            lineHeight:"1.3rem",
            // width:"3rem",
            fontWeight: "bold",
            color: "#f00",
            align: "center",
            top: "50vh",
            left: "0rem",
            marginTop:"-4.2rem"
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
        {
            type:"gif",
            url:"/static/{i}.png",
            top:"20vw",
            left:"62vh",
            width:"3rem",
            height:"6.64rem",
            num:10
        }

    ]
})

document.getElementById('gif').addEventListener('click',()=>{
    poster.creatGif(15,"5rem")
})

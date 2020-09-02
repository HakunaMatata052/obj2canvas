// import Poster from 'obj2canvas'
// new Poster({
//     canvas:'#canvas',
//     content:[]
// })
import './assets/less/index.less'
import Poster from './Poster'
import VConsole from 'vconsole'
new VConsole()

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

    ]
})
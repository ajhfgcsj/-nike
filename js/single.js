//用于设置商品图片和价格
let imgSrc=localStorage.getItem('goods');
// console.log(JSON.parse(imgSrc)[0].src );

// console.log($$('.thumb-image>img').src);
$$('.thumb-image>img').src=JSON.parse(imgSrc)[0].src;
$$('.item_price').innerHTML=JSON.parse(imgSrc)[0].price;
$$('#img').src=JSON.parse(imgSrc)[0].src;



// 加入购物车设置
$$('#add1').onclick=function(){
    // 点击的时候在localStorage中获得数据，获取购物车信息
    let user=localStorage.getItem('users');
    let user10=JSON.parse(user)[0].ids;
    console.log(user10);
    let goodss=localStorage.getItem(user10);
    // 获取号码
    let numbers=document.querySelectorAll('.check-one')
    // console.log(numbers);
    let numberss='随机大小';
    Array.from(numbers).forEach(k=>{
        // console.log(k);
        if(k.checked){
            numberss=k.nextElementSibling.innerHTML;
            // console.log(numberss);
        }
    });
    // console.log(numberss);
    // 获取完成


    // 获取颜色
    let selects=$$('#country1');
    // 缩影
    let indexss=selects.selectedIndex;
    // console.log(indexss);
    // 颜色
    let color=selects.options[indexss].text;
    // console.log(color);
    /******************/ 
    



    // 得到该商品的信息
    let id=JSON.parse(imgSrc)[0].id;
    let name=JSON.parse(imgSrc)[0].name;
    let src=JSON.parse(imgSrc)[0].src;
    let price=JSON.parse(imgSrc)[0].price;
    let num='';
    num=JSON.parse(imgSrc)[0].num;

    // 先判断购物车中是否为空
    if(goodss){
        // 不为空的时候
        goodss=JSON.parse(goodss);
        let ensureGoods=false;
        goodss.forEach(v=>{
            // console.log(v)
            if(v.id==id){
                v.num=v.num-0+1;
                ensureGoods=true;
                v.color=color;
                v.numberss=numberss;
            }
        })
        // console.log(!ensureGoods);
        // console.log(id)
        // 如果该商品在购物车中没有，就加入
        if(!ensureGoods){
            goodss.unshift({id,name,src,price,num:1,numberss,color});
        }
        // 最后更新localStorage,也就是更新购物车
        localStorage.setItem(user10,JSON.stringify(goodss));

    }else{
        // 没有就先加一个
        let tmpGoods={id,name,src,price,num:1,numberss,color};
        let goodsAll=[tmpGoods];
        // 存入localStorage
        localStorage.setItem(user10,JSON.stringify(goodsAll));
    }
}


// 放大镜特效
// 移入
$$('#small1').onmouseover=function(){
    $$('#big1').style.display='block';
    $$('#small-1').style.display='block';
   



}
// console.log($$('.single-right-left'));
$$('.single-right-left').style.position='static';
// 移出
$$('#small1').onmouseout=function(){
    $$('#big1').style.display='none';
    $$('#small-1').style.display='none';
}
// 移动
$$('#small1').onmousemove=function(eve){
 // 镜片
 let sH=$$('#small1').offsetHeight;
 let sW=$$('#small1').offsetWidth;
 // console.log(sH,sW);
 // 鼠标位置
 let mx=eve.pageX;
 let my=eve.pageY;
//  console.log(mx,my);
 // 得到盒子位置
 let boxx=$$('.flexslider').offsetTop;
 let boxy=$$('.flexslider').offsetLeft;
//  console.log($$('.flexslider'));
//  console.log(boxx,boxy);
 // 滑块坐标
 let tmX=mx+50-sH/2;
 let tmH=my-120-sW/2;

 if(tmX<0) tmX=0;
 if(tmH<0) tmH=0;

 if(tmX>325) tmX=325;
 if(tmH>325) tmH=325;

 let w=$$('#big1').offsetWidth-$$('#img').offsetWidth;
 let h=$$('#big1').offsetWidth-$$('#img').offsetWidth;
 let bh=tmH/325*h;
 let bw=tmX/325*w;

 $$('#img').style.top=bh+'px';
 $$('#img').style.left=bw+'px';

 // 设置给镜片
 $$('#small-1').style.top=tmH+'px';
 $$('#small-1').style.left=tmX+'px';
}
// console.log($$('#small1'));
// console.log($$('#big1'));











$$("#trigger-overlay").onclick=function(){
    location.href='checkout.html';
}

function $$(data){
    return document.querySelector(data)
}
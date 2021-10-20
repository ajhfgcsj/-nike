let span1=document.querySelectorAll('#head .bottom .right span');
// console.log(span1);
Array.from(span1).forEach((v,k)=>{
    // console.log(v,k)
    v.onmouseover=fnOver;
    v.onmouseout=fnOut;
})
function fnOver(){
    this.style.background='#cfcaca';
}
function fnOut(){
    this.style.background='';
}
let inpt1=document.querySelector('#head .bottom .right .inpt')
inpt1.onmouseover=fnOver;
inpt1.onmouseout=fnOut;
inpt1.onfocus=function(){
    // 去掉input获取焦点时的边框、
    this.style.outline='none';

}




// 假轮播js
// 先获取节点
let fakeBanner=$$('#bottomHead .mains .fakeBanner');
// console.log(fakeBanner);
let fakeBanners=$$$('#bottomHead .mains .fakeBanner div');
// console.log(fakeBanners);
let mains=$$("#bottomHead .mains");
let W=mains.offsetWidth;
// console.log(W);
// 左右箭头节点获取
let leftObj=$$('#bottomHead .span1');
let rightObj=$$('#bottomHead .span2');

// console.log(rightObj)

let index=0;
let timess='';

// 克隆一个第一个div用于最后一个到第一个的转换好看
let cloneDiv=fakeBanners[0].cloneNode(true);
// 最加在滑动盒子最后面
fakeBanner.appendChild(cloneDiv);
fakeBanners=$$$('#bottomHead .mains .fakeBanner div');
// console.log(fakeBanners);

// 右边箭头
rightObj.onclick=function(){
    // console.log('11111111')
    let target='';
    // 用于传递index到了最后一个div，在这时设置盒子的left为0，看起来没有秒换的效果
    let status=false;
    // 判断是否到了最后一张
    if(index==fakeBanners.length-2){
        index++;
        target=index*(W-20);
        index=0;
        status=true;
    }else{
        index++;
        target=index*(W-20);
    }
    // 假banner的运动效果
    move(fakeBanner,{left:-target},function(){
        status&&(fakeBanner.style.left='0px');
    })
}
// 左边箭头
leftObj.onclick=function(){
    // console.log('11111111')
    index--;
    if(index==-1){
        fakeBanner.style.left=-fakeBanners.length*W+'px';
        index=fakeBanners.length-1;  
    }
    let target=index*(W-20);
    move(fakeBanner,{left:-target},function(){
        status&&(fakeBanner.style.left='0px');
    });
}
// 自动播放
function auto(){
    timess=setInterval(()=>{
        rightObj.onclick();
    },3000)
}
auto();
// 鼠标移入身体清除定时器
mains.onmouseover=function(){
    clearInterval(timess);
}
// 移出开启自动播放
mains.onmouseout=function(){
    auto();
}

// 运动函数
var times = '';
    function move(ele, target, cb) {
      clearInterval(times);
     times = setInterval(function () {
        var onOff = true;
        // 遍历运动的方向和目标
        for (let attr in target) {
          // attr 表示运动的属性
          // console.log(attr);
          // 获取元素属性的实时值
          let tmpVal = parseInt(getPos(ele, attr))
          // 计算speed
          // console.log(tmpVal, attr);
          let speed = (target[attr] - tmpVal) / 10;
          // 取整
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          // 停止计时器,当一个属性运动到位置,设置开关状态
          if (tmpVal == target[attr]) onOff = true;
          // 让元素动起来
          ele.style[attr] = tmpVal + speed + 'px';
        }

        // 判断开关状态,清除定时器
        for (var moveAttr in target) {
          // 如果不相等,就说明有属性没有运动到位置,定时器不能停止
          if (target[moveAttr] !== parseInt(getPos(ele, moveAttr))) {
            onOff = false;
            break;
          }
        }
        if (onOff) {
          clearInterval(times);
          cb && cb();
        }
        // console.log(1111);
      }, 30)
    }
    // 获取元素的实时位置的函数
    function getPos(obj, attr) {
      if (obj.currentStyle) {   // 获取css的样式
        return obj.currentStyle[attr];
      } else {
        return getComputedStyle(obj)[attr]
      }
    }
// 轮播结束


// 商品列表展示
    // 使用axios读取goods商品数据
    axios.get('./goods.json').then(data=>{
      // console.log(data);
      let html='';
     
      JSON.parse(data).forEach(v=>{
        html+=`<div onclick="shoesFn(${v.id},'${v.src}','${v.name2}','${v.price}')" class="shoes${v.id} col-xs-6 col-md-4 " infoId="${v.id}">
        <img src="${v.src}" alt="">
        <h3>${v.name}</h3>
        <h4>${v.name2}</h4>
        <h4>${v.color}</h4>
        <h3>${v.price}</h3>
    </div>`;
      })
      $$('#right').innerHTML=html;
      // console.log($$('#right').children);
      // Array.from($$('#right').children).forEach(v=>{
      //   // console.log(v);
      //   v.onclick=shoesFn;
      // })
    })
    function shoesFn(id,src,name,price){
      location.href='single.html';
      console.log(id,src,name,price);
      // let goods=this
      // 存入物品信息在localStorage中
      let goodss={id,src,name,price};
      let goodsss=[goodss];
      localStorage.setItem('goods',JSON.stringify(goodsss));
    }



    setTimeout(function(){
      // 设置无限加载商品

        // 可视区高度
      let lookH=window.innerHeight;
      // 可视区宽度
      let lookW=window.innerWidth;
      // 商品高度
      let imagH=$$('#right').children[0].offsetHeight;
      // 商品高度
      let imagW=$$('#right').children[0].offsetHeight;
      // console.log(lookH,lookW,imagH,imagW);
      // 一排商品个数
      let num=Math.floor(lookW/imagW);
      // console.log(Math.ceil(lookW/imagW)-1);
      // // 内容高度
      // let conH=$$('#right').children.length/num*imagH;
      // console.log(conH)
      

      // console.log($$('#right').children.length);
      // 下滑运动样式
      let bottomH3=$$('#bottom .headB1 h3')
      heights=265;
  
      // 获取滚动条高度
      // console.log(heights);
      window.onscroll=function(){
        let a=document.documentElement.scrollTop;
        // 内容高度
      let conH=$$('#right').children.length/num*imagH-280;
        // console.log(a,conH)
        if(a>=heights){
          move(bottomH3,{fontSize:16})
          // $('#bottom .headB1 h3').animate({
          //   fontSize:16
          // },800)
          // move($$('#bottom .left'),{top:37})
          // $('#bottom .left').animate({top:37},1000)
          
        }else{
          move(bottomH3,{fontSize:25})
          $('#bottom .left').animate({top:47},1000)
        };

        if(a>conH){
          setTimeout(function(){
          for(let i=0;i<num;i++){
            let num2=random1(0,7);
            let cloneDiv=$$('#right').children[num2].cloneNode(true);
            // console.log(num2,cloneDiv);
            $$('#right').appendChild(cloneDiv);
          }
          },500)
        }
        
      }
    },10)
    
    
              // let userss=localStorage.getItem('users');
    // localStorage.setItem('users',[{user6:'&nbsp;'}])
    // 得到名字
    let userss=localStorage.getItem('users');
    if(userss==null){
      var user6='用户名'
      var ids='id'
      var user7={user6,ids}
         user7=[user7]
              // let  user5={user6};
              // let  user4=[user5]
                console.log(user7);
                localStorage.setItem('users',JSON.stringify(user7))
    }
    // console.log(userss);
    let usersss=JSON.parse(userss)
    $$('#register4').innerHTML=usersss[0].user6;
    console.log(usersss[0].ids);
    if(Number(usersss[0].ids)){
      $$('#register2>a').innerHTML='切换用户'
    }



    // 弹窗的js,登录
    // console.log(register2)
    $$('#register2').onclick=function(){
      $$('#popup1').style.display='block';
      // 获取名字和密码
      let user=$$('#registers .user').value;
      let pow=$$('#registers .pow').value;

      // 判断用户名是否为空
      $$('#registers .user').onblur=function(){
        user=$$('#registers .user').value;
        if(!user){
          $$('#registers .user').nextElementSibling.innerHTML='用户名不能为空';
          $$('#registers .user').nextElementSibling.style.cssText="opacity:1;color:red";
      }else{
        $$('#registers .user').nextElementSibling.innerHTML='&nbsp;';
      }

      }


      // 判断密码是否为空
      $$('#registers .pow').onblur=function(){
        pow=$$('#registers .pow').value;
        if(!pow){
          $$('#registers .pow').nextElementSibling.innerHTML='密码不能为空';
          $$('#registers .pow').nextElementSibling.style.cssText="opacity:1;color:red";
      }else{
        $$('#registers .pow').nextElementSibling.innerHTML='&nbsp;';
      }
      }


      $$("#register3").onclick=function(){
        user=$$('#registers .user').value;
        pow=$$('#registers .pow').value;
        // 首先获取数据库中数据
        let arr=[];
        let index='';
        let powArr=[];

        // 登录判断
        let x=false;
        let y=false;
        axios.get('./lib/enroll.php',{
          fn:"get"
        }).then(data=>{
          let obj=JSON.parse(data);
          // console.log(typeof(JSON.parse(data)));
          // console.log(JSON.parse(data));
          // console.log(JSON.parse(data)[0]);
          obj.forEach(v=>{
            // console.log(v);
            arr.push(v.user);
            // powArr.push(v.password);

          })
          // console.log(arr);
          if(arr.indexOf(user)==-1){
            $$('#registers .user').nextElementSibling.innerHTML='用户名不存在';
            $$('#registers .user').nextElementSibling.style.cssText="opacity:1;color:red";
            x=false;
          }else{
            index=arr.indexOf(user);
            // console.log(index);
            x=true;
          }
          // 得到对应id号
          ids=obj[index].id;
          // console.log(ids)
          // console.log(obj[index].password);
          // 判断密码是否正确
          if(obj[index].password==pow){
            y=true;
          }else{
            $$('#registers .pow').nextElementSibling.innerHTML='密码错误';
            $$('#registers .pow').nextElementSibling.style.cssText="opacity:1;color:red";
            y=false;
          }
          // console.log(x,y);
          
          if(x&&y){
            $$('#registers .foot').style.display='block';
            let user6=obj[index].user
            let ids=obj[index].id
            let user7={user6,ids}
            user7=[user7]
            // let  user5={user6};
            // let  user4=[user5]
              console.log(user7);
              localStorage.setItem('users',JSON.stringify(user7))
              // let userss=localStorage.getItem('users');
              // console.log(userss);

            setTimeout(function(){
              location.href='index.html';
              


              
            },2000)
          }
        })
      }
    




    }
    $$('#popup1>span').onclick=function(){
      $$('#popup1').style.display='none';
    }

    
    





//随机数的产生
function random1(min, max) {
  return Math.round((Math.random() * (max - min) + min));
}  

function $$(taga){
    return document.querySelector(taga);
}
function $$$(taga){
    return document.querySelectorAll(taga);
}
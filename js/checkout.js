//用于读取localStorage中数据然后加载购物车
function goods1(){
    let user=localStorage.getItem('users');
    let user10=JSON.parse(user)[0].ids;
    let good=localStorage.getItem(user10);
    // console.log(good);
    let goods=JSON.parse(good);
    // console.log(goods);
    let html='';
    goods.forEach(v=>{
        // console.log(v);
        html+=`<tr class="rem1">
        <td class="invert"><input class="check-one check" type="checkbox"/></td>
        <td class="invert-image"><a href="single.html">
        <img src="${v.src}" alt=" " class="img-responsive"></a>
        <p>${v.color}</p>
        <p>${v.numberss}</p>
        </td>
        <td class="invert">
            <div class="quantity">
                <div class="quantity-select">
                    <div class="entry value-minus">&nbsp;</div>
                    <div class="entry value"><span>${v.num}</span></div>
                    <div class="entry value-plus active">&nbsp;</div>
                </div>
            </div>
        </td>
        <td class="invert">${v.name}</td>

        <td class="invert">${v.price}</td>
        <td class="invert">
            <div class="rem">
                <div class="close1"> </div>
            </div>

        </td>
    </tr>`;
    })
    $$('#mains').innerHTML=html;
    // oneObj=document.querySelectorAll('#foot .check-one');
}
goods1();
// 购物车加载完成


// 全选等选择性功能
// 全选框
let allObj= $$('#foot .check-all');
let oneObj=document.querySelectorAll('.check-one');

allObj.onclick=function(){
    // console.log(this);
    if(this.checked){
        Array.from(oneObj).forEach(v=>{
            // console.log(v);
            v.checked=true;
        })
    }else{
        Array.from(oneObj).forEach(v=>{
            // console.log(v);
            v.checked=false;
        })
    }
    infoFn();
}


// 对单选循环，循环绑定单选，加减，价格数量的改变
    Array.from(oneObj).forEach((v,k)=>{
        // 得到爷爷盒子tr
        let a=v.parentNode.parentNode;
        // 得到删除节点
        let lastObj=a.lastElementChild;
        // let num=0;
        // console.log(lastObj,k);
        // v.onclick=function(){
        //     // console.log(v);
        //     // this.checked&&num++;
        //     if(this.checked){
        //         num++;
        //     }else{
        //         num--;
        //     }
        //     // console.log(num)
        //     if(num==len){
        //         allObj.checked=true;
        //     }else{
        //         allObj.checked=false; 
        //     }
        //     infoFn();
        // }
        oneFn(v);
        amounts(v,k);
        removes(lastObj,k);
        // console.log(lastObj);

        
    })



    // 单选
    let nums=0;
function oneFn(v){
    console.log(v);
    let len=oneObj.length;
        // console.log(v);
        v.onclick=function(){
            // console.log(v);
            // this.checked&&num++;
            if(this.checked){
                nums++;
            }else{
                nums--;
            }
            console.log(nums,len);
            // console.log(num)
            if(nums==len){
                allObj.checked=true;
            }else{
                allObj.checked=false; 
            }
            console.log(nums,len);
            infoFn();
        }
}

// 单选完毕



// 加减数量
function amounts(v,k){
            a=v.parentNode.parentNode;
            // console.log(a.parentNode.parentNode);
            let b=a.querySelector('.value-minus');
            let c=a.querySelector('.value-plus');
            b.onclick=function(){
                // console.log(a);
                let span1=this.nextElementSibling;
                // console.log(span1);
                // console.log(span1.querySelector('span').innerHTML)
                let num=span1.querySelector('span').innerHTML-0;
                num--;
                if(num==0){
                    //删除该商品
                    num=1;
                }
                span1.querySelector('span').innerHTML=num;
                // console.log(num);
                
                if(v.checked){
                    infoFn();
                }
                alters(k,num);
            }
            c.onclick=function(){
                // console.log(this);
                let span1=this.previousElementSibling;
                let num=span1.querySelector('span').innerHTML-0;
                num++;
                span1.querySelector('span').innerHTML=num;
                if(v.checked){
                    infoFn();
                }
                alters(k,num);
            }
 
}
//加减数量结束

//改变localStorage中商品信息
function alters(k,num){
    let user=localStorage.getItem('users');
    let user10=JSON.parse(user)[0].ids;
    let goods=localStorage.getItem(user10);
    goods=JSON.parse(goods);
    goods[k].num=num;
    console.log(goods[k].num,k);
    localStorage.setItem(user10,JSON.stringify(goods));
}

// 删除该物品
function removes(lastObj,k){
    // console.log(lastObj,k);
    let user=localStorage.getItem('users');
    let user10=JSON.parse(user)[0].ids;
    let goods=localStorage.getItem(user10);
    goods=JSON.parse(goods);
    // console.log(goods);
    lastObj.onclick=function(){
        goods.splice(k,1)
        console.log(goods);
        // delete goods[k];
        // let sda=goods;
        // console.log(sda);
        localStorage.setItem(user10,JSON.stringify(goods));
        location.reload();
    }
    
}
// 删除完毕



// 更新数量和价格
function infoFn(){
    // 数量
    let num=0;
    let price=0;
    Array.from(oneObj).forEach(v=>{
        if(v.checked){
            let a=v.parentNode.parentNode;
            // console.log(a)
            // 数量
            let sum=a.querySelector('.entry>span').innerHTML-0;
            num=num+sum;
            // 价格
            let b=a.lastElementChild;
            let c=b.previousElementSibling;
            let price1=c.innerHTML;
            price1=price1.substr(1)-0;
            // console.log();
            price+=sum*price1;
        }
        // console.log(num)
        $$('#selectedTotal').innerHTML=num;
        $$("#priceTotal").innerHTML=price;
    })
}
// 更新数量完


// 更新localStorage中商品信息
// console.log(Array.from(oneObj));





$$("#trigger-overlay").onclick=function(){
    location.href='checkout.html';
}

function $$(taga){
    return document.querySelector(taga)
}
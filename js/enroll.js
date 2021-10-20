
    // 获取注册表单节点
    let menu1=$$('#menu1');
    var user1=$$('#user1').value;
    var pwd1=$$('#pwd1').value;
    var email1=$$('#email1').value;
    var x=false;
        var y=false;
        var z=false;
    // 名字
    $$('#user1').onblur=function(){
        user1=$$('#user1').value;
        
        // console.log(user1,pwd1,email1);
        // 正则
        let reg=/(^[\u4e00-\u9fa5]{2,5}$|^[a-zA-Z]{3,18}$|^[\u4e00-\u9fa5]{2}[a-zA-Z]{0,5}$)/;
        if(reg.test(user1)){
            this.nextElementSibling.innerHTML='名字符合要求';
            this.nextElementSibling.style.cssText="opacity:1;color:green";
            x=true;
        }else{
            this.nextElementSibling.innerHTML='名字不符合要求'
            this.nextElementSibling.style.cssText="opacity:1;color:red";
            // console.log(user1);
            x=false;
        }
        let arr=[];
        axios.get('./lib/enroll.php',{
            fn:"get"
          }).then(data=>{
            //   console.log(JSON.parse(data)[0]);
              let obj=JSON.parse(data);
              obj.forEach(v=>{
                // console.log(v);
                arr.push(v.user);
                // powArr.push(v.password);
    
              })
              if(arr.indexOf(user1)!=-1){
                $$('#user1').nextElementSibling.innerHTML='用户名存在,请重新输入';
                $$('#user1').nextElementSibling.style.cssText="opacity:1;color:red";
                x=false;
              }else{
                // index=arr.indexOf(user);
                // console.log(index);
                x=true;
              }

          })
    }
// 密码
$$('#pwd1').onblur=function(){
    pwd1=$$('#pwd1').value;
    let reg=/^[0-9a-zA-Z_]{6,20}$/;
    // console.log(reg.test(pwd1));
    if(pwd1.length>=6&&pwd1.length<=20){
        if(reg.test(pwd1)){
            this.nextElementSibling.innerHTML='密码符合要求';
            this.nextElementSibling.style.cssText="opacity:1;color:green";
            y=true;
        }else{
            this.nextElementSibling.innerHTML='只能是数字、字母和下划线';
            this.nextElementSibling.style.cssText="opacity:1;color:red";
            y=false;
        }
        
    }else if(pwd1.length==''){
        this.nextElementSibling.innerHTML='密码不能为空';
        this.nextElementSibling.style.cssText="opacity:1;color:red";
        y=false;
    }else{
        this.nextElementSibling.innerHTML='密码长度不合适！！！';
        this.nextElementSibling.style.cssText="opacity:1;color:red";
        y=false;
    }
    
}

// 邮箱
$$('#email1').onblur=function(){
    email1=$$('#email1').value;
    let reg=/^[0-9]{6,10}(\@qq\.com){1}$/;
    if(reg.test(email1)){
        this.nextElementSibling.innerHTML='邮箱符合要求';
            this.nextElementSibling.style.cssText="opacity:1;color:green";
            z=true;
    }else{
        this.nextElementSibling.innerHTML='请输入正确QQ邮箱后缀@qq.com';
            this.nextElementSibling.style.cssText="opacity:1;color:red";
            z=false;
    }
}
$$('#enroll1').onclick=function(){
    console.log(x,y,z)
    user1=$$('#user1').value;
    pwd1=$$('#pwd1').value;
    email1=$$('#email1').value;
 
    if(!user1){
        $$('#user1').nextElementSibling.innerHTML='用户名不能为空';
    }
    if(!pwd1){
        $$('#pwd1').nextElementSibling.innerHTML='密码不能为空';
    }
    if(!email1){
        $$('#email1').nextElementSibling.innerHTML='邮箱不能为空';
    }


    if(x&&y&&z){
        axios.get('./lib/enroll.php',{
            fn:'add',
            user1,
            pwd1,
            email1
    
        }).then(data=>{
            console.log(data)
        });
        $$('#menu1 .foot').style.opacity='1';
    }
    
}
$$("#trigger-overlay").onclick=function(){
    location.href='checkout.html';
}



function $$(bata){
    return document.querySelector(bata);
}
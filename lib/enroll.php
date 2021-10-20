<?php
// 引入mysql文件
include('./mysql.php');
// 获取访问的方法
$fn = $_GET['fn'];
// add()  get() 
$fn();
// 添加数据的方法
function add(){
   // echo 222;
    $user1 = $_GET['user1'];
    $pwd1 = $_GET['pwd1'];
    $email1 = $_GET['email1'];
 
    // echo $idea;
    // echo $pos;
    // echo $title;
  //  die;
  $sql = "insert into nikeUser values(null,'$user1','$pwd1','$email1')";

  $res = query($sql);
  echo $res;
}

// 获取数据的方法
function get(){


    // 获取总长度
    $sql="select * from nikeUser";
    $res=select($sql);
    print_r(json_encode($res));
}

// 删除数据的方法
function del(){
    $id = $_GET['infoId'];
    $sql = 'delete from nikeUser where id='.$id;
    $res = query($sql);
    echo $res;

}
?>
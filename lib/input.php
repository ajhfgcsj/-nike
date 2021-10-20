<?php
// 引入mysql文件
include('./mysql.php');
// 获取访问的方法
$fn = $_GET['fn'];
// add()  get() 
$fn();
// 获取数据的方法
function get(){


    // 获取总长度
    $sql="select * from nikeUser order by id limit $start,$length";
    $res=select($sql);
    print_r(json_encode([
      'pData'=>$res,
      'cPage'=>$cPage
    ]));
}
?>
<?php
namespace Home\Controller;
use Think\Controller;

class BaseController extends Controller{


	public function _initialize() {

        // 这里面不能有比如跳转到 Wechat类的函数，否则会死循环了

    }

}
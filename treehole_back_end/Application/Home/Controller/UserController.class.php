<?php
namespace Home\Controller;

use Think\Controller;
class UserController extends BaseController {
	
    /**
     * 用户注册
     * @return [type] [description]
     */
    public function sign() {

        // 校验参数是否存在
    	if (!$_POST['username']) {
    		$return_data = array();
    		$return_data['error_code'] = 1;
    		$return_data['msg'] = '参数不足: username';

    		$this->ajaxReturn($return_data);
    	}

    	if (!$_POST['phone']) {
    		$return_data = array();
    		$return_data['error_code'] = 1;
    		$return_data['msg'] = '参数不足: phone';

    		$this->ajaxReturn($return_data);
    	}

    	if (!$_POST['password']) {
    		$return_data = array();
    		$return_data['error_code'] = 1;
    		$return_data['msg'] = '参数不足: password';

    		$this->ajaxReturn($return_data);
    	}

    	if (!$_POST['password_again']) {
    		$return_data = array();
    		$return_data['error_code'] = 1;
    		$return_data['msg'] = '参数不足: password_again';

    		$this->ajaxReturn($return_data);
    	}

    	// 检验两次密码是否输入一致
    	if ($_POST['password'] != $_POST['password_again']) {
    		$return_data = array();
    		$return_data['error_code'] = 2;
    		$return_data['msg'] = '两次密码不一致';

    		$this->ajaxReturn($return_data);
    	}

    	// 检验手机号是否已被注册
		$User = M('User');

    	// 构造查询条件
    	$where = array();
    	$where['phone'] = $_POST['phone'];
    	$user = $User->where($where)->find();

    	if ($user) {
    		// 如果存在，提示已注册
    		$return_data = array();
    		$return_data['error_code'] = 3;
    		$return_data['msg'] = '该手机号已被注册';

    		$this->ajaxReturn($return_data);
    	} else {
    		// 如果尚未注册，则注册
    		$data = array();
    		$data['username'] = $_POST['username'];
    		$data['phone'] = $_POST['phone'];
    		// 密码经过md5函数加密，得到32位字符串
    		$data['password'] = md5($_POST['password']);
    		$data['face_url'] = $_POST['face_url'];

    		// 插入数据
    		// add函数添加数据成功后，返回的是该条数据的id
    		$result = $User->add($data);

    		if ($result) {
				$return_data = array();
	    		$return_data['error_code'] = 0;
	    		$return_data['msg'] = '注册成功';
	    		$return_data['data']['user_id'] = $result;
	    		$return_data['data']['username'] = $_POST['username'];
	    		$return_data['data']['phone'] = $_POST['phone'];
	    		$return_data['data']['face_url'] = $_POST['face_url'];

	    		$this->ajaxReturn($return_data);
    		} else {
    			// 插入数据执行失败
				$return_data = array();
	    		$return_data['error_code'] = 4;
	    		$return_data['msg'] = '注册失败';

	    		$this->ajaxReturn($return_data);
    		}
    	}
    }


     /**
     * 用户登录
     * @return [type] [description]
     */
    public function login() {

        // 校验参数是否存在

    	if (!$_POST['phone']) {
    		$return_data = array();
    		$return_data['error_code'] = 1;
    		$return_data['msg'] = '参数不足: phone';

    		$this->ajaxReturn($return_data);
    	}

    	if (!$_POST['password']) {
    		$return_data = array();
    		$return_data['error_code'] = 1;
    		$return_data['msg'] = '参数不足: password';

    		$this->ajaxReturn($return_data);
    	}


    	// 查询用户
		$User = M('User');

    	// 构造查询条件
    	$where = array();
    	$where['phone'] = $_POST['phone'];
    	$user = $User->where($where)->find();

    	if ($user) {
    		// 如果查询到该手机号用户
    		if (md5($_POST['password']) != $user['password']) {
    			$return_data = array();
	    		$return_data['error_code'] = 3;
	    		$return_data['msg'] = '密码不正确，请重新输入';

	    		$this->ajaxReturn($return_data);
    		} else {
    			// 如果密码相等
    			$return_data = array();
	    		$return_data['error_code'] = 0;
	    		$return_data['msg'] = '登录成功';

	    		$return_data['data']['user_id'] = $user['id'];
	    		$return_data['data']['username'] = $user['username'];
	    		$return_data['data']['phone'] = $user['phone'];
	    		$return_data['data']['face_url'] = $user['face_url'];

	    		$this->ajaxReturn($return_data);
    		}


    		
    	} else {
    		// 用户不存在
			$return_data = array();
    		$return_data['error_code'] = 2;
    		$return_data['msg'] = '不存在该手机号用户，请注册';
    		
    		$this->ajaxReturn($return_data);
    	}
    }
}


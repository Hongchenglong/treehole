<?php

namespace app\index\controller;

use \think\Db;

class User extends BaseController {
    /**
     * 用户注册
     * @return [type] [description]
     */
    public function sign()
    {
      
        // 校验参数是否存在
        if (empty($_POST['username'])) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足: username';

            return json($return_data);
            // $this->ajaxReturn($return_data); tp3的用法
        }

        if (empty($_POST['phone'])) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足: phone';

            return json($return_data);
        }

        if (empty($_POST['password'])) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足: password';

            return json($return_data);
        }

        if (empty($_POST['password_again'])) {
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足: password_again';

            return json($return_data);
        }

        // 检验两次密码是否输入一致
        if ($_POST['password'] != $_POST['password_again']) {
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg'] = '两次密码不一致';

            return json($return_data);
        }
        
        // 检验手机号是否已被注册
        $User = Db('User');

        // 构造查询条件
        $where = array();
        $where['phone'] = $_POST['phone'];
        $user = $User->where($where)->find();
        
        if ($user) {
            // 如果存在，提示已注册
            $return_data = array();
            $return_data['error_code'] = 3;
            $return_data['msg'] = '该手机号已被注册';
            
            return json($return_data);
        } else {
            
            // 如果尚未注册，则注册
            $data = array();
            $data['username'] = $_POST['username'];
            $data['phone'] = $_POST['phone'];
            // 密码经过md5函数加密，得到32位字符串
            $data['password'] = md5($_POST['password']);
            
            // dump($data);
            // 插入数据
            // 返回新增数据的自增主键，可以使用getLastInsID方法
            $result = $User->insertGetId($data);
            
            // dump($result);
            if ($result) {
                $return_data = array();
                $return_data['error_code'] = 0;
                $return_data['msg'] = '注册成功';
                $return_data['data']['user_id'] = $result;
                $return_data['data']['username'] = $_POST['username'];
                $return_data['data']['phone'] = $_POST['phone'];

                return json($return_data);
            } else {
                // 插入数据执行失败
                $return_data = array();
                $return_data['error_code'] = 4;
                $return_data['msg'] = '注册失败';

                return json($return_data);
            }
        }
    }

}
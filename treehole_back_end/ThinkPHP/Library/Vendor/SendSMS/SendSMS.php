<?php 

class SendSMS
{
    /**
     * url前半部分
     */
    private $BASE_URL = "https://api.miaodiyun.com/20150822/";
    /**
     * url中的accountSid。如果接口验证级别是主账户则传网站“个人中心”页面的“账户ID”，
     */
    private $ACCOUNT_SID = "568efcd961d24d2e82d0c471906d5602"; // 主账户
    private $AUTH_TOKEN = "d0c66c9e62904cffbcff899cb5cc21c2";
    /**
     * 请求的内容类型，application/x-www-form-urlencoded
     */
    private $CONTENT_TYPE = "application/x-www-form-urlencoded";
    /**
     * 期望服务器响应的内容类型，可以是application/json或application/xml
     */
    private $ACCEPT = "application/json";
    /**
     * 创建url
     *
     * @param funAndOperate
     *            请求的功能和操作
     * @return
     */
    public function createUrl($funAndOperate)
    {
        // 时间戳
        date_default_timezone_set("Asia/Shanghai");
        $timestamp = date("YmdHis");
        return $this->BASE_URL . $funAndOperate;
    }
    public function createSig()
    {
        $timestamp = date("YmdHis");
        // 签名
        $sig = md5($this->ACCOUNT_SID . $this->AUTH_TOKEN . $timestamp);
        return $sig;
    }
    public function createBasicAuthData()
    {
        $timestamp = date("YmdHis");
        // 签名
        $sig = md5($this->ACCOUNT_SID .$this->AUTH_TOKEN . $timestamp);
        return array("accountSid" => $this->ACCOUNT_SID, "timestamp" => $timestamp, "sig" => $sig, "respDataType"=> "JSON");
    }
    /**
     * 创建请求头
     * @param body
     * @return
     */
    public function createHeaders()
    {
      
        $headers = array('Content-type: ' . $this->CONTENT_TYPE, 'Accept: ' .$this->ACCEPT);
        return $headers;
    }
    /**
     * post请求
     *
     * @param funAndOperate
     *            功能和操作
     * @param body
     *            要post的数据
     * @return
     * @throws IOException
     */
    public function post($funAndOperate, $body)
    {
        // 构造请求数据
        $url = $this->createUrl($funAndOperate);
        $headers = $this->createHeaders();
        // echo("url:<br/>" . $url . "\n");
        // echo("<br/><br/>body:<br/>" . json_encode($body));
        // echo("<br/><br/>headers:<br/>");
        // var_dump($headers);
        // 要求post请求的消息体为&拼接的字符串，所以做下面转换
        $fields_string = "";
        foreach ($body as $key => $value) {
            $fields_string .= $key . '=' . $value . '&';
        }
        rtrim($fields_string, '&');
        // 提交请求
        $con = curl_init();
        curl_setopt($con, CURLOPT_URL, $url);
        curl_setopt($con, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($con, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($con, CURLOPT_HEADER, 0);
        curl_setopt($con, CURLOPT_POST, 1);
        curl_setopt($con, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($con, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($con, CURLOPT_POSTFIELDS, $fields_string);
        $result = curl_exec($con);
        curl_close($con);
        return "" . $result;
    }
    //发送通知短信
    public function send_notice_sms($to,$content){
        /**
         * url中{function}/{operation}?部分
         */
        $funAndOperate = "industrySMS/sendSMS";
        // 生成body
        $body = $this->createBasicAuthData();
        // 在基本认证参数的基础上添加短信内容和发送目标号码的参数
        $body['smsContent'] = $content;
        $body['to'] = $to;
        // 提交请求
        $result['code'] = $this->post($funAndOperate, $body);
        $result['body'] = $body;
        // echo("<br/>result:<br/><br/>");
        // var_dump($result);
        return $result;
    }
}
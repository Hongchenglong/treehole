<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15-9-21
 * Time: 下午2:35
 */
/*
 * author : chenbin
 * date ： 15/9/12
 * email : 525945448@qq.com
 * */
namespace Org\Com;
class EmojiSon extends emoji{
    /*获取emoji 替换符*/
    public function getEmoji($text){
        //从softbank 开始
        $methodConfig = array(
            'emoji_softbank_to_unified',
            'emoji_google_to_unified',
            'emoji_docomo_to_unified',
            'emoji_kddi_to_unified'
        );
        $res = null;
        $c = null;
        foreach($methodConfig as $row){

            $res = $this->$row($text);
            $c = self::compare($text,$res);
            if($c){
               $res = $this->emoji_unified_to_html($res);
               return $res;
               break;
            }
        }
        return $res;
    }
    /*对比*/
    private  static function compare($p1,$p2){
        if($p1 === $p2){
            return false;
        }else{
            return true;
        }
    }
} 

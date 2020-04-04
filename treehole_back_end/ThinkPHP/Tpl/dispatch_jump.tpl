<?php
    if(C('LAYOUT_ON')) {
        echo '{__NOLAYOUT__}';
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>跳转中</title>
    <style>
        .buffer{
            background-color: black;
            height: 100%;
            width: 60%;
            margin: auto;
            filter: alpha(Opacity=60);
            -moz-opacity: 0.6;
            opacity: 0.85;
            border-radius: 7px;
        }

        .buffer_tip{
            color: wheat;
            font-size: 30px;
            display: block;
            padding-top: 10px;
            text-align: center;
        }
        .spinner {
            margin: 16px auto 57px;
            width: 32px;
            height: 32px;
            position: relative;
        }

        .cube1, .cube2 {
            background-color: #67CF22;
            width: 30px;
            height: 30px;
            position: absolute;
            top: 0;
            left: 0;

            -webkit-animation: cubemove 1.8s infinite ease-in-out;
            animation: cubemove 1.8s infinite ease-in-out;
        }

        .cube2 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }

        @-webkit-keyframes cubemove {
            25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
            50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
            75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
            100% { -webkit-transform: rotate(-360deg) }
        }

        @keyframes cubemove {
            25% {
                transform: translateX(42px) rotate(-90deg) scale(0.5);
                -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
            } 50% {
                  transform: translateX(42px) translateY(42px) rotate(-179deg);
                  -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
              } 50.1% {
                    transform: translateX(42px) translateY(42px) rotate(-180deg);
                    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
                } 75% {
                      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
                      -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
                  } 100% {
                        transform: rotate(-360deg);
                        -webkit-transform: rotate(-360deg);
                    }
        }

        #href{
            color: wheat;
            font-size: 20px;
        }
        a:link{
            text-decoration:none;
        }
    </style>
</head>
<body>

<div class='buffer' id='buffer' >
        <span class='buffer_tip' id='buffer_tip' >
        <php>
                if(isset($message)) {
                        echo $message;
                }else{
                        if(!empty($error)) {
                                echo $error;
                        }else{
                                echo '操作出现错误';
                        }
                }
        </php>
        <a id="href" href="<?php echo($jumpUrl); ?>">(<b id="wait"><?php echo($waitSecond); ?></b>s)</a>
        </span>
    <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
    </div>
</div>

<script type="text/javascript">
    (function(){
        var wait = document.getElementById('wait'),href = document.getElementById('href').href;
        var interval = setInterval(function(){
            var time = --wait.innerHTML;
            if(time <= 0) {
                location.href = href;
                clearInterval(interval);
            };
        }, 1000);
    })();
</script>
</body>
</html>

(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime;
    var lastPercentage = 0;

    function format(duration){//处理时间显示样式
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10){
            minute = "0" + minute; 
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    function renderTime(duration){//渲染歌时长
        curDuration = duration;
        lastPercentage = 0;
        updata(0);
        var allTime = format(duration);
        $scope.find(".all-time").html(allTime);
    }
    function processorRender(percentage){
        var percent = (percentage - 1) * 100 +"%";
        $scope.find(".pro-top").css({
            transform : "translateX("+ percent +")"
        })
    }
    function updata(percentage){//渲染歌的进度时间
        var time = percentage * curDuration;
        time = format(time);
        $scope.find(".cur-time").html(time);
        processorRender(percentage)
    }
    function start(percent){//计时函数
        lastPercentage = percent === undefined ? lastPercentage : percent;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percentage = lastPercentage + (curTime - startTime)/(curDuration * 1000);
            if(percentage < 1){
                updata(percentage);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId)
            }
        }
        frame()
    }
    function stop(){//歌曲暂停
        var stopTime = new Date().getTime();
        lastPercentage = lastPercentage + (stopTime - startTime)/(curDuration*1000)
        cancelAnimationFrame(frameId)
    }
    root.processor = {
        renderTime,
        start,
        stop,
        updata
    }
}(window.Zepto,window.player || (window.player = {})))
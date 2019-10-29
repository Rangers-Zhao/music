var root = window.player;
var $scope = $(document.body);
var render = root.render; //引入渲染模块
var songList;
var controlManager = root.controlManager;//引入切歌处理模块
var controlmanager;
var audioplayer = new root.audioPlayer();//引入播放控制模块
var processor = root.processor;//引入进度条处理模块

$scope.on("play:change",function(event,index){
    var cursong = songList[index];
    render(cursong);
    audioplayer.setAudioSource(cursong.audio)
    if(audioplayer.status == "play"){
        audioplayer.play();
        processor.start();
    }
    processor.renderTime(cursong.duration)
})

//切歌点击事件
$scope.find(".prev-btn").on("click",function(){
    var index = controlmanager.prev();
    $scope.trigger("play:change",index)
})
$scope.find(".next-btn").on("click",function(){
    var index = controlmanager.next();
    $scope.trigger("play:change",index)
})

//播放点击事件
$scope.find(".play-btn").on("click",function(){
    $(this).toggleClass("playing")//有这class删除，没有添加上
    if(audioplayer.status == "pause"){
        audioplayer.play()
        processor.start()
    }else{
        audioplayer.pause()
        processor.stop()
    }
})

//进度条拖动
function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart",function(e){
        processor.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1 || percentage < 0 ){
            percentage = 0;
        }
        processor.updata(percentage)
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1 || percentage < 0 ){
            percentage = 0;
        }
        processor.updata(percentage);
        var index = controlmanager.index;
        var curDuration = songList[index].duration;
        var duration = curDuration * percentage;
        audioplayer.jumpToPlay(duration);
        processor.start();
        $scope.find(".play-btn").addClass("playing")
    })
}

//请求数据函数
function getData(url,cb) {
    $.ajax({
        url:url,
        type:"GET",
        success:cb,
        error:function(e){
            console.log(e)
        }
    })
}

function successCb(data){
    controlmanager = new controlManager(data.length)
    songList = data;
    $scope.trigger("play:change",0)
    bindTouch();
}
getData("/mock/data.json",successCb)
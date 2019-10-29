(function($,root){
    var $scope = $(document.body);
    function audioPlayer(){
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent()
    }
    audioPlayer.prototype = {
        bindEvent(){
            $(this.audio).on("ended",function(){
                $scope.find('.next-btn').trigger("click")
            })
        },
        play(){//播放方法
            this.audio.play();
            this.status = "play";
        },
        pause(){//暂停方法
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay(time){
            this.audio.currentTime = time;
            this.play(); 
        }
    }
    root.audioPlayer = audioPlayer;
}(window.Zepto,window.player||(window.player = {})))
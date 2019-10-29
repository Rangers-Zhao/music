//渲染函数模块
(function($,root){
    var $scope = $(document.body)
    function renderInfo(data){//渲染歌曲信息函数
        var html = "<h1 class='song-name'>"+data.song+"</h1>" +
                    "<h3 class='singer-name'>"+data.singer+"</h3>"+
                    "<h3 class='album-name'>"+data.album+"</h3>";
        $scope.find(".song-info").html(html);
    } 
    function renderImage(src){//渲染图片函数
        var image = new Image();
        image.onload = function(){
            $scope.find(".song-img .img-wrapper img").attr("src",src);
        }
        image.src = src;
    }
    function renderIslike(isLike){//歌曲喜爱渲染
        if(isLike){
            $scope.find(".like-btn").addClass("liked")
        }else{
            $scope.find(".like-btn").removeClass("liked")
        }
    }
    root.render = function(data){//导出模块/暴露接口
        renderInfo(data)
        renderImage(data.image)
        renderIslike(data.isLike)
    }
}(window.Zepto,window.player||(window.player = {})))

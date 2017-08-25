$(function(){
  //banner自动高度 加载时
  bannerSet();
  // grid自动适应  加载时
  gridSet();

  $(window).resize(function(){
    //banner自动高度 窗口变化时
  	bannerSet();
    // grid自动适应  窗口变化时
    gridSet();
  });

  // 滚动事件
  $(window).scroll(function(){
    // 滚动时 顶部栏出现
    if(window.scrollY==0){
      $("#masthead").removeClass("header_bg_active");
    }else{
      $("#masthead").addClass("header_bg_active");
    }
    //滚动时grid栏增加class以达到延迟显示
    if ((window.scrollY>winHeight/2))
    {
      $("article.gridItem:not('.gridItemTxt')").slice(0, 2).addClass("scroll_active");
    } 
    if((window.scrollY>winHeight)){
      $("article.gridItem:not('.gridItemTxt')").slice(2, 5).addClass("scroll_active");
    } 
    if((window.scrollY>winHeight+400)){
      $("article.gridItem:not('.gridItemTxt')").slice(2, 9).addClass("scroll_active");
    }
  })

  // 点击顶部固定栏按钮弹出层
  $(".hamburger").on("click",function(){
    if ($(".main_navigation").css("display")=="none") {
      $("header").addClass("nav_open");
      $("body").addClass("stop_scrolling");
      //每1毫秒运行function navPlay一次
      var navTimer;
      var num=null;
      navTimer=setInterval(navPlay,20);
      function navPlay(){
        if (num<1900) {
          num=num+100;
          $(".main_navigation").css({
            "transform":"translate3d("+(-1900+num)+"px, 0px, 0px)"
          }).show();
        } else{};
      }
      clearInterval(navTimer2);
    } else{
      //每1毫秒运行function navPlay2一次
      var navTimer2;
      var num2=0;
      var navLeft=($(window).width());
      navTimer2=setInterval(navPlay2,20);
      function navPlay2(){
        if(num2>-navLeft){
          num2=num2-100;
          $(".main_navigation").css({
            "transform":"translate3d("+num2+"px, 0px, 0px)"
          });
        } else{}       
      }
      // 让nav移动到-1920时再移除nav_open 以达到header高度减小，然后隐藏nav
      setTimeout(function() {
        $("header").removeClass("nav_open");
        $(".main_navigation").hide();
      },500)
      $("body").removeClass("stop_scrolling");
    };
  })
  
  // banner区域 点击右下角按钮向下滚动一屏
  $(".ss-downBox").click(function(){
    //回到顶部JS+过渡效果
    var banTimer;
    var banHeight=$(window).height()-60;
    //每1毫秒运行function bb一次
    banTimer=setInterval(bottomPlay,1);
    function bottomPlay(){    
      if(window.scrollY>=banHeight){
          clearInterval(banTimer);
      }else{    //每次滚动20直到顶部
          scrollTo(0,window.scrollY+20);
      }
    }
  })
  //tab切换调用
  // $('.InvestItab ul>li').first().addClass("current"); //初始化第一个添加样式
  // $('.Invest .Kpai').first().show(); //初始化第一个默认显示
  // $('.InvestItab ul>li').live("click", function() {
  //   $('.InvestItab ul>li').removeClass("current");
  //   $(this).addClass("current");
  //   // $('.' + box + ' .' + content).hide().eq($(this).index()).show();
  //   $('.Invest .Kpai').css({
  //     "transform":"translate3d(-1920px, 0px, 0px)"
  //   }).eq($(this).index()).css({
  //     "transform":"translate3d(0, 0px, 0px)"
  //   });
  // });
})//end

  


//banner自动高度
function bannerSet(){
  winHeight= $(window).height();
  $(".fullscreen").height(winHeight);
}

// grid自动适应
function gridSet(){
  var gridWidthMax=($(window).width())/2+"px";//951.5px
  var gridWidthDef=($(window).width())/4+"px";//475.75px
  $(".gridCont").height(parseInt(gridWidthDef)+(parseInt(gridWidthDef)/0.8331873905429072)*2)
  $("article.gridItem:eq(0)").css({
    "width":gridWidthMax
  });
  $("article.gridItem:gt(0)").css({
    "width":gridWidthDef
  });
  $("article.gridItem").css({
    "height":parseInt(gridWidthDef)/0.8331873905429072+"px"
  });
  $("article.gridItem:eq(1),article.gridItem:eq(7),article.gridItem:eq(9)").css({
    "height":gridWidthDef
  });
  $("article.gridItem:eq(3)").css({
    "height":gridWidthMax
  });
  $("article.gridItem:eq(0),article.gridItem:eq(3)").css({
    "left":0
  });
  $("article.gridItem:eq(1),article.gridItem:eq(5),article.gridItem:eq(8)").css({
    "left":gridWidthMax
  });
  $("article.gridItem:eq(2),article.gridItem:eq(6),article.gridItem:eq(9)").css({
    "left":parseInt(gridWidthDef)*3+"px"
  });
  $("article.gridItem:eq(4),article.gridItem:eq(7)").css({
    "left":gridWidthDef
  });
  $("article.gridItem:eq(0),article.gridItem:eq(1),article.gridItem:eq(2)").css({
    "top":0
  });
  $("article.gridItem:eq(3),article.gridItem:eq(4),article.gridItem:eq(6)").css({
    "top":parseInt(gridWidthDef)/0.8331873905429072+"px"
  });
  $("article.gridItem:eq(5)").css({
    "top":gridWidthDef
  });
  $("article.gridItem:eq(7),article.gridItem:eq(8),article.gridItem:eq(9)").css({
    "bottom":"0"
  });
}
//回到顶部JS+过渡效果
var topTimer;
function topTime(){  //每1毫秒运行function topPlay一次
  topTimer=setInterval(topPlay,1);
}
function topPlay(){    
  if(window.scrollY<=0){
      clearInterval(topTimer);
  }else{    //每次滚动20直到顶部
      scrollTo(0,window.scrollY-20);
  }
}
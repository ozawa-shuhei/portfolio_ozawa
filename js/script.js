//logoの表示
  $(window).on('load',function(){
    $("#splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    $("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
    });


    // ハンバーガーメニュー
    $(".sp-btn").click(function () {//ボタンがクリックされたら
        $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
        $("#sp-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
        $("#sp-nav").fadeToggle();
        $(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
        });
        
        $("#sp-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
        $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
        $("#sp-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
        $(".circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
        });



    $(function () {
        // WORKSのスライダー
        $(function () {
            $('.works_slider').slick({
                autoplay: true,
                dots: true,
                centerMode: true,
                centerPadding: '0px',
                // autoplaySpeed: 2000,
                arrows: true,
                adaptiveHeight: true,
                // slidesToScroll: 1,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 767, // 399px以下のサイズに適用
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],

            });
        });

    });

//     const $slider = $("#js-slider");

// // 左右の透過の2周目ががたつく対応
// $slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
//   $slider.find(".slick-slide").each((index, el) => {
//     const $this = $(el),
//       slickindex = $this.attr("data-slick-index");
//     if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
//       // 現在のスライドが最初のスライドでそこから最後のスライドに戻る場合
//       if (slickindex == "-1") {
//         // 最後のスライドに対してクラスを付与
//         $this.addClass("is-active-next");
//       } else {
//         // それ以外は削除
//         $this.removeClass("is-active-next");
//       }
//     } else if (nextSlide == 0) {
//       // 次のスライドが最初のスライドの場合
//       if (slickindex == slick.slideCount) {
//         // 最初のスライドに対してクラスを付与
//         $this.addClass("is-active-next");
//       } else {
//         // それ以外は削除
//         $this.removeClass("is-active-next");
//       }
//     } else {
//       // それ以外は削除
//       $this.removeClass("is-active-next");
//     }
//   });
// });


// slick 2週目のカクつき対応
const $slider = $("#js-slider");

$slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
	$slider.find(".slick_img").each((index, el) => {
		const $this = $(el),
		slickindex = $this.attr("data-slick-index");
		if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
			if (slickindex == "-1") {
				$this.addClass("is-active-next");
			} else {
				$this.removeClass("is-active-next");
			}
		} else if (nextSlide == 0) {
			if (slickindex == slick.slideCount) {
				$this.addClass("is-active-next");
			} else {
				$this.removeClass("is-active-next");
			}
		} else {
			$this.removeClass("is-active-next");
		}
	});
});






// トップ
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 700){//上から200pxスクロールしたら
		$('.page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('.page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('.page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('.page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('.page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('.page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});




// 波の記述
var unit = 100,
canvasList, // キャンバスの配列
info = {}, // 全キャンバス共通の描画情報
colorList; // 各キャンバスの色情報

/**
* Init function.
* 
* Initialize variables and begin the animation.
*/
function init() {
info.seconds = 0;
info.t = 0;
    canvasList = [];
colorList = [];
// canvas1個めの色指定
canvasList.push(document.getElementById("waveCanvas"));
// canvasList.push(document.getElementById("waveCanvas2"));
// ここで色指定する。273b69 fbc21c
colorList.push(['#273b69']);
// colorList.push(['#e6e6e6']); 
// 各キャンバスの初期化
    for(var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
    canvas.height = 100;//波の高さ
    canvas.contextCache = canvas.getContext("2d");
}
// 共通の更新処理呼び出し
    update();
}

function update() {
    for(var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    // 各キャンバスの描画
    draw(canvas, colorList[canvasIndex]);
}
// 共通の描画情報の更新
info.seconds = info.seconds + .014;
info.t = info.seconds*Math.PI;
// 自身の再起呼び出し
setTimeout(update, 35);
}

/**
* Draw animation function.
* 
* This function draws one frame of the animation, waits 20ms, and then calls
* itself again.
*/
function draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
var context = canvas.contextCache;
// キャンバスの描画をクリア
context.clearRect(0, 0, canvas.width, canvas.height);

//波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
drawWave(canvas, color[0], 1, 3, 0);//drawWave(canvas, color[0],0.5, 3, 0);とすると透過50%の波が出来る
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
context.fillStyle = color;//塗りの色
context.globalAlpha = alpha;
context.beginPath(); //パスの開始
drawSine(canvas, info.t / 0.5, zoom, delay);
context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
context.lineTo(0, canvas.height); //パスをCanvasの左下へ
context.closePath() //パスを閉じる
context.fill(); //波を塗りつぶす
}

/**
* Function to draw sine
* 
* The sine curve is drawn in 10px segments starting at the origin. 
* drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawSine(canvas, t, zoom, delay) {
var xAxis = Math.floor(canvas.height/2);
var yAxis = 0;
var context = canvas.contextCache;
// Set the initial x and y, starting at 0,0 and translating to the origin on
// the canvas.
var x = t; //時間を横の位置とする
var y = Math.sin(x)/zoom;
context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

// Loop to draw segments (横幅の分、波を描画)
for (i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t+(-yAxis+i)/unit/zoom;
    y = Math.sin(x - delay)/3;
    context.lineTo(i, unit*y+xAxis);
}
}

init();
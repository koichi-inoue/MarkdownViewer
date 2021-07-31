// Markdown files
const MD_DIR = 'markdown/';
const File = [
    "about.md",
    "sample.md"
]

// modelLoaded > Ready to Accept
window.onload = function() {
  let dh = document.getElementById("dropHere");
  dh.addEventListener("dragover",function(ev){ ev.preventDefault();}, false);
  dh.addEventListener("drop", function(ev){ ev.preventDefault(); GetFile(ev);}, false);

  let about = document.getElementById("about");
  about.addEventListener("click", function(ev){ ev.preventDefault(); ShowMD(File[0]);}, false);

  let sample = document.getElementById("sample");
  sample.addEventListener("click", function(ev){ ev.preventDefault(); ShowMD(File[1]);}, false);
}

// GetFile
function GetFile(ev){

  let file = ev.dataTransfer.files[0];

  let fileType = file.name.slice(-2).toLowerCase();
  if( fileType!=='md') {
    alert("File available only .md");
    return;
  }

  let reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = function() {
    document.querySelector('#mdBody').innerHTML = marked(reader.result);
  }

}


// ShowLocalMarkdown
function ShowMD(fileName){

  // インスタンスを作成
  var xhr = new XMLHttpRequest();
  // 非同期リクエスト async true
  xhr.open('GET', MD_DIR + fileName, true);
  // サーバへリクエストを送信 （ null ）
  xhr.send();

  xhr.onload = function(){
    if((xhr.readyState == 4) && (xhr.status == 200)) {
      document.querySelector('#mdBody').innerHTML = marked(xhr.responseText);
    }
  }

  xhr.onerror = function() {
    alert("Request failed");
  };

}


// Smooth Scroll
$(function(){

   $('a[href^="#"]').click(function() {

      // 初期設定：移動時間(ms)と頭出し位置
      var speed = 500;
      var offset = -160;

      // アンカーを取得
      var anchor = $(this).attr("href");

      // ターゲットの位置を取得
      var target = $(anchor == "#" || anchor == "" ? 'html' : anchor);
      var position = target.offset().top + offset;

      // スクロール（アニメーション）
      $('body,html').animate({scrollTop:position}, speed, 'swing');

      return false;

   });

});

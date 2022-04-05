// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

//함수이름은 변경 불가
function onYouTubeIframeAPIReady() {
  //<div id="player"></div>
  new YT.Player("player", {
    videoId: "An6LvWQuj_8", //최초 재생할 유튜브 id
    playerVars: {
      autoplay: true, //자동재생유뭉
      loop: true, //반복재생
      playlist: "An6LvWQuj_8",
    },
    events: {
      onReady: function (event) {
        event.target.mute(); //음소거
      },
    },
  });
}

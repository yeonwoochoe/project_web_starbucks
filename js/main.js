//요소 선택
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
const badgeEl = document.querySelector("header .badges");

/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.

//기능 구현 - 01.search 를 누르면 자동으로 포커스가 input 요소에 넣어준다
searchEl.addEventListener("click", () => {
  //로직
  searchInputEl.focus();
});

//기능 구현 - 02.
//input 요소를 누르면 focus가 잡혀주고,
//search 창에 class 'foucsded'를 추가하고
//input 요소에 html 속성이 플레이스홀더를 넣어준다
searchInputEl.addEventListener("focus", () => {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합검색");
});

//기능 구현 - 03. focus가 해제되면 클래스를 제거주고
// 플레이스 홀더를 삭제해준다
searchInputEl.addEventListener("blur", () => {
  searchEl.classList.remove("focused");
  searchInputEl.removeAttribute("placeholder", "통합검색");
});

//기능 구현 - 04. 스크롤 제어
//loadash 이용하여 함수를 최대한 덜 작동시키도록?만든는작업
// gsap 이용하여 애니메이션 쉽게 만들기

const toTopEl = document.querySelector("#to-top");
window.addEventListener(
  "scroll",
  _.throttle(() => {
    console.log(window.scrollY);
    // 페이지 스크롤 위치가 500px이 넘으면.
    if (window.scrollY > 500) {
      //뱃지 숨기기
      // gsap.to(요소,지속시간,옵션);
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      //탑버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 페이지 스크롤 위치가 500px이 넘지 않으면.
      //뱃지 보이기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      //탑버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
      //badgeEl.style.display = "block";
    }
  }, 300)
);
//_.throttle(함수,시간)

//탑버트 누르면 맨 위로 올려가지는 이벤트함수
toTopEl.addEventListener("click", () => {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

//기능 구현 - 05. 이미지 순차적으로 나타나게 하기
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach((el, idex) => {
  gsap.to(el, 1, {
    delay: (idex + 1) * 0.7, // 0.7 -> 1.4 -> 2.1 -> 2.7
    opacity: 1,
  });
});

///기능 구현 - 06. 이미지 슬라이더 swiper

//new Swiper (선택자 ,옵션)
new Swiper(".notice-line .swiper-container", {
  direction: "vertical",
  autoplay: true, //자동재생
  loop: true, //무한재생
});

new Swiper(".promotion .swiper-container", {
  //기본값 수평
  slidesPerView: 3, //한번에 보여줄 슬라이드
  spaceBetween: 10, //슬라이드 여백
  centeredSlides: true, //1번 슬라이드 가운데
  loop: true, //무한재생
  // autoplay: {
  //   delay: 5000,
  // },
  pagination: {
    el: ".promotion .swiper-pagination", //페이지 번호 효소 선택자
    clickable: true, //사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

//========================== 어워즈 슬라이드
new Swiper(".awards .swiper-container", {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");

///기능 구현 - 07. 이미지 토글버튼
//프로모션이 보일것이냐 안보일것이냐 변수
let isHidePromotion = false;
promotionToggleBtn.addEventListener("click", () => {
  isHidePromotion = !isHidePromotion; //반대되게 만들기 true 만들기
  if (isHidePromotion) {
    //숨김처리!
    promotionEl.classList.add("hide");
  } else {
    //보임처리
    promotionEl.classList.remove("hide");
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

///기능 구현 - 08. 떠다니는 이미지 애니메이션
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), // 애니메이션 동작시간
    {
      //옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay),
    }
  );
}

floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

///기능 구현 - 08.  스크롤을 내리면 나타나는 애니메이션
/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll("section.scroll-spy");
// 요소들 반복 처리!
spyEls.forEach((spyEl) => {
  new ScrollMagic.Scene({
    // 감시할 장면(Scene)을 추가
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // 화면의 80% 지점에서 보여짐 여부 감시
  })
    .setClassToggle(spyEl, "show") // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!)
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); // 올해년도출력

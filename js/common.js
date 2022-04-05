//요소 선택
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

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

//올해 년도 삽입
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); // 올해년도출력

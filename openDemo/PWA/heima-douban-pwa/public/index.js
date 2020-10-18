async function renderMovie() {
  const res = await fetch("/api/getMovie");
  const json = await res.json();
  let html = "";
  json.forEach((movie) => {
    html += `
      <a href="javascript:;" class="movie">
        <div class="img">
          <img src="${movie.images.medium}" alt="" />
        </div>
        <div class="text">
          <h3 class="title one-txt-cut">${movie.title}</h3>
          <p class="rating one-txt-cut">评分：${movie.rating.average}</p>
          <p class="genres txt-cut">类型：${movie.genres.join(" / ")}</p>
        </div>
      </a>
    `;
    document.querySelector(".app_content").innerHTML = html;
  });
}

async function registerSW() {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
          console.log("sw.js 注册成功");
        })
        .catch((e) => {
          console.log("sw.js 注册失败", e);
        });
    }
  });
}

renderMovie();
registerSW();

/* 
  如果页面一进来，我们发下用户没有联网，给用户一个通知
*/
if (Notification.permission === "default") {
  Notification.requestPermission();
}
if (!navigator.onLine) {
  new Notification("提示", { body: "你当前没有网络，你访问的是缓存" });
}

// offline: 断线
window.addEventListener("online", () => {
  new Notification("提示", {
    body: "你已经连上网络了，请刷新访问最新的数据",
  });
});

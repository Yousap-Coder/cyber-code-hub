// ✏️ أضف أي عدد من روابط الفيديوهات من ImageKit
const videos = [
  { file: "https://ik.imagekit.io/xgs3yjnd5videoDHXTR2/sample-video.mp4?updatedAt=1771235624396" },
  { file: "https://ik.imagekit.io/your_account_id/video2.mp4" },
  // أضف روابط الفيديوهات الجديدة هنا مباشرة
];

const container = document.getElementById("videos");

videos.forEach(v => {
  // استخرج اسم الفيديو من آخر جزء من الرابط
  let urlParts = v.file.split("/");
  let title = urlParts[urlParts.length - 1].split("?")[0];
  title = title.replace(/_/g, " ").replace(/\.mp4/, "");

  // id للايك/ديسلايك
  const id = title.replace(/\s/g, "-");

  const likes = localStorage.getItem(id + "_likes") || 0;
  const dislikes = localStorage.getItem(id + "_dislikes") || 0;

  container.innerHTML += `
    <div class="card">
      <h3>${title}</h3>
      <video src="${v.file}" controls></video>
      <div class="actions">
        <button onclick="vote('${id}','likes')">👍 <span id="l-${id}">${likes}</span></button>
        <button onclick="vote('${id}','dislikes')">👎 <span id="d-${id}">${dislikes}</span></button>
      </div>
    </div>
  `;
});

function vote(id, type) {
  let count = localStorage.getItem(id + "_" + type) || 0;
  count++;
  localStorage.setItem(id + "_" + type, count);
  document.getElementById((type === "likes" ? "l-" : "d-") + id).innerText = count;
}

// ✏️ أضف أي عدد من روابط الفيديوهات من ImageKit
const videos = [
  { file: "https://ik.imagekit.io/xgs3yjnd5videoDHXTR2/sample-video.mp4?updatedAt=1771235624396" },
  { file: "https://ik.imagekit.io/your_account_id/video2.mp4" },
  // أضف المزيد هنا بسهولة
];

const container = document.getElementById("videos");

videos.forEach(v => {
  // استخرج اسم الفيديو من آخر جزء من الرابط
  let urlParts = v.file.split("/");
  let title = urlParts[urlParts.length - 1].split("?")[0];
  title = title.replace(/_/g, " ").replace(/\.mp4/, "");

  // id لكل فيديو للايك/ديسلايك
  const id = title.replace(/\s/g, "-");

  // قراءة عدد اللايك والديسلايك
  const likes = localStorage.getItem(id + "_likes") || 0;
  const dislikes = localStorage.getItem(id + "_dislikes") || 0;

  // تحقق إذا الشخص ضغط قبل كده
  const userVoted = localStorage.getItem(id + "_voted") || null;

  container.innerHTML += `
    <div class="card">
      <h3>${title}</h3>
      <video src="${v.file}" controls></video>
      <div class="actions">
        <button id="like-${id}" ${userVoted ? "disabled" : ""} onclick="vote('${id}','likes')">
          👍 <span id="l-${id}">${likes}</span>
        </button>
        <button id="dislike-${id}" ${userVoted ? "disabled" : ""} onclick="vote('${id}','dislikes')">
          👎 <span id="d-${id}">${dislikes}</span>
        </button>
      </div>
    </div>
  `;
});

function vote(id, type) {
  // منع الضغط المتكرر
  if(localStorage.getItem(id + "_voted")) return;

  // زيادة العد
  let count = localStorage.getItem(id + "_" + type) || 0;
  count++;
  localStorage.setItem(id + "_" + type, count);

  // تعطيل الأزرار بعد التصويت
  localStorage.setItem(id + "_voted", type);
  document.getElementById("like-" + id).disabled = true;
  document.getElementById("dislike-" + id).disabled = true;

  // تحديث العرض
  document.getElementById((type === "likes" ? "l-" : "d-") + id).innerText = count;
}

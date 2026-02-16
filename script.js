// ✏️ أضف روابط Google Drive المباشرة هنا
// رابط Google Drive مباشرة للفيديو: 
// https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// يتم تحويله إلى رابط تشغيل مباشر: https://drive.google.com/uc?export=download&id=FILE_ID

const videos = [
  { file: "https://drive.google.com/file/d/1jq6xki08BrZXIxP2dKcPoxQo1qnglVbQ/view?usp=drive_link" },
  { file: "https://drive.google.com/uc?export=download&id=FILE_ID_2" },
  { file: "https://drive.google.com/uc?export=download&id=FILE_ID_3" }
];

const container = document.getElementById("videos");

videos.forEach(v => {
  // استخرج اسم الفيديو من الرابط الأخير
  const urlParts = v.file.split("/");
  let title = urlParts[urlParts.length - 1].split("?")[0];
  title = title.replace(/_/g, " ").replace(/\.mp4/, "");

  // حدد id للـ likes/dislikes
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

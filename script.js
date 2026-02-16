// أضف روابط الفيديوهات من ImageKit هنا
const videos = [
  { file: "https://ik.imagekit.io/xgs3yjnd5videoDHXTR2/Jujutsu?updatedAt=1771240427739" },
  // مثال: { file: "https://ik.imagekit.io/your_account_id/video2.mp4" },
];

const container = document.getElementById("videos");

videos.forEach(v => {
  let urlParts = v.file.split("/");
  let title = urlParts[urlParts.length - 1].split("?")[0];
  title = title.replace(/_/g, " ").replace(/\.mp4/, "");

  const id = title.replace(/\s/g, "-");

  // اللايك والديسلايك
  const likes = localStorage.getItem(id + "_likes") || 0;
  const dislikes = localStorage.getItem(id + "_dislikes") || 0;
  const userVoted = localStorage.getItem(id + "_voted") || null;

  // التعليقات المخزنة
  const savedComments = JSON.parse(localStorage.getItem(id + "_comments") || "[]");

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
      <div class="comments">
        <input type="text" id="input-${id}" placeholder="اكتب تعليق...">
        <button onclick="addComment('${id}')">💬 إضافة</button>
        <div class="comment-list" id="list-${id}">
          ${savedComments.map(c => `<div class="comment-item">${c}</div>`).join("")}
        </div>
      </div>
    </div>
  `;
});

function vote(id, type) {
  if(localStorage.getItem(id + "_voted")) return;

  let count = localStorage.getItem(id + "_" + type) || 0;
  count++;
  localStorage.setItem(id + "_" + type, count);

  localStorage.setItem(id + "_voted", type);
  document.getElementById("like-" + id).disabled = true;
  document.getElementById("dislike-" + id).disabled = true;
  document.getElementById((type === "likes" ? "l-" : "d-") + id).innerText = count;
}

function addComment(id) {
  const input = document.getElementById("input-" + id);
  const text = input.value.trim();
  if(!text) return;

  const savedComments = JSON.parse(localStorage.getItem(id + "_comments") || "[]");
  savedComments.push(text);
  localStorage.setItem(id + "_comments", JSON.stringify(savedComments));

  const list = document.getElementById("list-" + id);
  const div = document.createElement("div");
  div.className = "comment-item";
  div.innerText = text;
  list.appendChild(div);

  input.value = "";
}

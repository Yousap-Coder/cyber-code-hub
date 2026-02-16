function like(id) {
  let likes = localStorage.getItem(id + "_likes") || 0;
  likes++;
  localStorage.setItem(id + "_likes", likes);
  document.getElementById("l-" + id).innerText = likes;
}

function dislike(id) {
  let dislikes = localStorage.getItem(id + "_dislikes") || 0;
  dislikes++;
  localStorage.setItem(id + "_dislikes", dislikes);
  document.getElementById("d-" + id).innerText = dislikes;
}

window.onload = () => {
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    document.getElementById("l-" + id).innerText =
      localStorage.getItem(id + "_likes") || 0;
    document.getElementById("d-" + id).innerText =
      localStorage.getItem(id + "_dislikes") || 0;
  });
};

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("yearNow").textContent = new Date().getFullYear();

const form = document.getElementById("certForm");
const openButton = document.getElementById("openCertForm");
const closeButton = document.getElementById("closeCertForm");
const cancelButton = document.getElementById("cancelCert");
const emptyState = document.getElementById("certEmpty");
const certList = document.getElementById("certList");

function toggleForm(show) {
  form.hidden = !show;
  if (show) form.querySelector('input[name="name"]').focus();
}
openButton.addEventListener("click", () => toggleForm(true));
closeButton.addEventListener("click", () => toggleForm(false));
cancelButton.addEventListener("click", () => { form.reset(); toggleForm(false); });

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  if (!name) return;
  const issuer = String(data.get("issuer") || "").trim();
  const year = String(data.get("year") || "").trim();
  const url = String(data.get("url") || "").trim();

  const card = document.createElement("article");
  card.className = "cert-item";
  const symbol = document.createElement("span");
  symbol.className = "cert-symbol";
  symbol.textContent = "✧";
  const info = document.createElement("div");
  info.className = "cert-info";
  const title = document.createElement("h3");
  title.textContent = name;
  info.appendChild(title);
  const details = [issuer, year].filter(Boolean).join(" · ");
  if (details) {
    const p = document.createElement("p");
    p.textContent = details;
    info.appendChild(p);
  }
  if (url) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = "View credential ↗";
    info.appendChild(a);
  }
  const remove = document.createElement("button");
  remove.className = "delete-cert";
  remove.type = "button";
  remove.textContent = "Remove";
  remove.setAttribute("aria-label", `Remove ${name}`);
  remove.addEventListener("click", () => {
    card.remove();
    emptyState.hidden = certList.children.length > 0;
  });
  card.append(symbol, info, remove);
  certList.appendChild(card);
  emptyState.hidden = true;
  form.reset();
  toggleForm(false);
});

const bar = document.createElement("div");
bar.classList.add("progress-bar");
bar.innerHTML = `<div class="fill"></div>`;

export const showProgress = () => document.body.appendChild(bar);

export const hideProgress = () => document.body.removeChild(bar);

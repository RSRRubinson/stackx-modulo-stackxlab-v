import { card_data } from "./database.js";

const postTitle = document.querySelector("[data-post-title]");

const postHeaderImg = document.querySelector("[data-post-header-img]");

const postDate = document.querySelector("[data-post-date]");

const postViews = document.querySelector("[data-post-views]");

const posText = document.querySelector("[data-post-text]");

const indiceCard = Number(window.localStorage.getItem("indiceCard"));
card_data.forEach((data) => {
  if (data.id === indiceCard) {
    postTitle.innerHTML = data.title;

    postHeaderImg.setAttribute("src", data.banner.src);

    postHeaderImg.setAttribute("alt", data.banner.alt);

    postDate.innerHTML = `${data.date_time.date} ${data.date_time.time}`;
    
    
    postViews.innerHTML = data.views;

    posText.innerHTML = data.description;

         }
    }
);

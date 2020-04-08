//  'use strict';

import gallery from "./gallery-items.js";
// console.log(gallery);

const galleryListRef = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const btnCloseModal = document.querySelector(".lightbox__button");

function CreateGallery() {
  const list = gallery.map(function (item) {
    const itemGallery = document.createElement("li");
    itemGallery.classList.add("gallery__item");

    const image = document.createElement("img");
    image.classList.add("gallery__image");
    itemGallery.appendChild(image);

    image.setAttribute("src", item.preview);
    image.setAttribute("alt", item.description);
    image.setAttribute("data-source", item.original);
    return itemGallery;
  }, []);
  galleryListRef.append(...list);
}

CreateGallery();

galleryListRef.addEventListener("click", openModal);

function openModal() {
  // console.log(event.target.nodeName);
  if (event.target.nodeName !== "IMG") {
    return;
  }
  modal.classList.add("is-open");
  modalImg.setAttribute("src", event.target.getAttribute("data-source"));
  modalImg.setAttribute("alt", event.target.getAttribute("alt"));

  window.addEventListener("keydown", onPressEsc);
  window.addEventListener("keydown", onPressLeft);
  window.addEventListener("keydown", onPressRight);
}

function closeModal() {
  modal.classList.remove("is-open");
  modalImg.setAttribute("src", "#");
  modalImg.setAttribute("alt", "");
  window.removeEventListener("keydown", onPressEsc);
  window.removeEventListener("keydown", onPressRight);
  window.removeEventListener("keydown", onPressLeft);
}

btnCloseModal.addEventListener("click", closeModal());

modal.addEventListener("click", onBackDropClick);
function onBackDropClick(event) {
  if (event.target.nodeName === "IMG") {
    return;
  }
  closeModal();
}

function onPressEsc() {
  // console.log("ага");
  if (event.code === "Escape") {
    closeModal();
  }
}

function onPressLeft() {
  function allRef(gallery) {
    const arrayOfOriginalRef = [];
    gallery.forEach(function (item) {
      arrayOfOriginalRef.push(item.original);
    });
    return arrayOfOriginalRef;
  }
  const refs = allRef(gallery);
  // console.table(refs);

  if (event.code === "ArrowLeft") {
    for (let i = 0; i < refs.length; i += 1) {
      if (refs[i] === modalImg.getAttribute("src")) {
        if (i - 1 >= 0) {
          // console.log(refs[i - 1]);
          modalImg.setAttribute("src", refs[i - 1]);
        }
      }
    }
  }
}

function onPressRight() {
  function allRef(gallery) {
    const arrayOfOriginalRef = [];
    gallery.forEach(function (item) {
      arrayOfOriginalRef.push(item.original);
    });
    return arrayOfOriginalRef;
  }
  const refs = allRef(gallery);
  // console.table(refs);

  if (event.code === "ArrowRight") {
    for (let i = 0; i < refs.length; i += 1) {
      if (refs[i] === modalImg.getAttribute("src")) {
        if (i + 1 < refs.length) {
          // console.log(refs[i + 1]);
          modalImg.setAttribute("src", refs[i + 1]);
          break; /* ВАЖНО */
        }
      }
    }
  }
}

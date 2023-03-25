// Добавь библиотеку SimpleLightbox как зависимость проекта используя npm (ссылка на CDN из твоей прошлой работы больше не нужна).
// Используй свой JavaScript код из предыдущей домашней работы, но выполни рефакторинг с учетом того, что библиотека была установлена через npm (синтаксис import/export).
// Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

// // Описан в документации
// import SimpleLightbox from "simplelightbox";
// // Дополнительный импорт стилей
// import "simplelightbox/dist/simple-lightbox.min.css";




import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryEl = document.querySelector(".gallery")
const galleryItemsToString = galleryItems.reduce((acc, {preview, original, description}) => {
    return acc+=`<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img loading="lazy" class="gallery__image" 
            src="${preview}" 
            alt="${description}" 
        />
   </a>
</li>`
}, "")

galleryEl.insertAdjacentHTML("beforeend", galleryItemsToString)

console.dir(SimpleLightbox)
let gallery = new SimpleLightbox('.gallery a', {captionsData: "alt",  captionPosition:"bottom", captionDelay: 250,  scrollZoom: false});

gallery.on('shown.simplelightbox', function (event) {
  event.preventDefault();
  console.log("Everything works fine")
});

gallery.on('error.simplelightbox', function (event) {
	console.log(event, "Something wrong"); 
});
console.log(galleryItems);

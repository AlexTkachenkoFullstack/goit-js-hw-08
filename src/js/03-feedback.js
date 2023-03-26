
// В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// 1.Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2.При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3.При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4.Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
import throttle from 'lodash.throttle';
const formEl = document.querySelector(".feedback-form");
const inputEmailEl = formEl.elements.email;
const textareaMessageEl = formEl.elements.message;
let feedbackFormStateValue = {};
const STORAGE_KEY = 'feedback-form-state';

addValueFromLocalStorage()

function addValueFromLocalStorage() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const savedMessageFromJSON = JSON.parse(savedMessage);
    if (savedMessage) { 
        const { email = "", message = "" } = savedMessageFromJSON;
        inputEmailEl.value = email;
        textareaMessageEl.value = message;
    }
}


formEl.addEventListener("input", throttle(handleFormElInput, 500));

function handleFormElInput(event) {
    feedbackFormStateValue.email = inputEmailEl.value;
    feedbackFormStateValue.message = textareaMessageEl.value;

    const feedbackFormStateValueJson=JSON.stringify(feedbackFormStateValue)
    try {
        localStorage.setItem(STORAGE_KEY, feedbackFormStateValueJson)
    } catch(error) {
        console.log("We have some problems with loading. Issue:", error)
    }
}

formEl.addEventListener("submit", handleFormElSubmit)

function handleFormElSubmit(event) {
    event.preventDefault();
    console.log(feedbackFormStateValue);
    if (inputEmailEl.value === "" || textareaMessageEl.value === "") {
        return alert("Fill in all fields of the form")
    }
    feedbackFormStateValue = {};
    localStorage.removeItem(STORAGE_KEY)
    event.currentTarget.reset()
}



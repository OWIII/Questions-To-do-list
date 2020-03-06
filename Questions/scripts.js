'use strict';

const form = document.querySelector('.main__form'),
    button = document.querySelector('.button'),
    results = document.querySelector('.results');
let resultsText = document.querySelector('.results__text'),
    trueAnswers = new Set();


const hideElem = elem => elem.style.display = 'none';
const showElem = elem => elem.style.display = 'block';


const buttonIsActiv = () => {
    let checkListOfCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    let checkListOfRadio = document.querySelectorAll('input[type="radio"]:checked');
    if (checkListOfRadio.length) {
        checkListOfCheckbox.length >= 1 ? button.disabled = false : button.disabled = true;
    }
};

const getResult = event => {
    const target = event.target;
    if (target.name === 'firstQuestion' && target.checked) {
        if (target.classList.contains('firstAnswer_1')) {
            trueAnswers.add(target.id);
        }
        if (target.classList.contains('firstAnswer_2')) {
            trueAnswers.delete('firstAnswer_1');
        }
    }

    if (target.name === 'secondQuestion' && target.checked) {
        if (target.classList.contains('secondAnswer_1') || target.classList.contains('secondAnswer_3')) {
            trueAnswers.add(target.id);
        }
    } else if (target.name === 'secondQuestion' && !target.checked) {
        trueAnswers.delete(target.id);
    }
    return trueAnswers;
};

const showResult = event => {
    event.preventDefault();
    hideElem(form);

    if (trueAnswers.has('firstAnswer_1') && trueAnswers.has('secondAnswer_1') && trueAnswers.has('secondAnswer_3')) {
        resultsText.textContent = 'Вы правильно ответили на два вопроса';
    } else if (trueAnswers.has('firstAnswer_1') || trueAnswers.has('secondAnswer_1') && trueAnswers.has('secondAnswer_3')) {
        resultsText.textContent = 'Вы правильно ответили на один вопрос';
    } else {
        resultsText.textContent = 'Вы не ответили верно ни на один вопрос';
    }
    showElem(results);
}

form.addEventListener('change', function (event) {
    getResult(event);
    buttonIsActiv();
});

button.addEventListener('click', showResult);
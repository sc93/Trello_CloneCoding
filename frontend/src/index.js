import addList from './event/addList.js';

const root = document.querySelector('#root');
const Container = root.querySelector('#container');
const cardContainer = Container.querySelector('#card-container');
const addListBtn = Container.querySelector('#add-list-button');

console.log(root);
console.log(cardContainer);
console.log(addListBtn);

addListBtn.addEventListener('click', function () {
    console.log('click');
    addList(cardContainer);
});

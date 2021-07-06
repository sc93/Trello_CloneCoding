import Component from '../core/Component.js';
import Card from './Card.js';
export default class CardList extends Component {
    initialState = {};
    setup() {}
    template() {
        return `
        <div id ="card-container" data-component="card-container"></div>
        <button id="add-list-button">Add a list ...</button>
        `;
    }
    mounted() {}
    setEvent() {
        this.addEvent('click', '#add-list-button', () => {
            const $cardContainer = this.$target.querySelector(
                `[data-component="card-container"]`,
            );
            new Card($cardContainer, { new: true });
        });
    }
}

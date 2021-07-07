import Component from '../core/Component.js';
import Card from './Card.js';
export default class CardList extends Component {
    initialState = {};
    setup() {
        this.$state = {
            cardList: [
                { id: '1', title: 't1' },
                { id: '2', title: 't2' },
                { id: '3', title: 't3' },
            ],
        };
    }
    template() {
        return `
        <div id ="card-container" data-component="card-container"></div>
        <button id="add-list-button">Add a list ...</button>
        `;
    }
    mounted() {
        const $cardContainer = this.$target.querySelector(
            `[data-component="card-container"]`,
        );
        this.$state.cardList.map(
            (card) => new Card($cardContainer, { card: card }),
        );
    }
    setEvent() {
        const addList = (card) => {
            this.$state.cardList = [...this.$state.cardList, { card: card }];
        };
        this.addEvent('click', '#add-list-button', () => {
            const $cardContainer = this.$target.querySelector(
                `[data-component="card-container"]`,
            );
            new Card($cardContainer, { new: true, addList });
        });

        this.addEvent('keypress', '.card .add-btn', (e) => {
            if (e.key === 'Enter') {
                const id = e.target.parentNode.dataset?.id;
                // id 있는경우 ( 기존 카드 )
                if (id) {
                    this.setState({
                        cardList: this.$state.cardList.map((card) =>
                            card.id === id
                                ? { ...card, title: e.target.value }
                                : card,
                        ),
                    });
                }
                // id 없는경우 ( 새로만드는 카드 )
                else {
                    this.setState({
                        cardList: [
                            ...this.$state.cardList,
                            { id: 4, title: e.target.value },
                        ],
                    });
                }
            }
        });
    }
}

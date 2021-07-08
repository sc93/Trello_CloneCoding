import Component from '../core/Component.js';
import Card from './Card.js';
export default class CardList extends Component {
    initialState = {};
    setup() {
        this.$state = {
            cardList: [
                { id: '1', title: 't1', input: false, cards: [] },
                { id: '2', title: 't2', input: false, cards: [] },
                { id: '3', title: 't3', input: false, cards: [] },
            ],
        };
    }
    template() {
        return `
        <div id ="card-container" data-component="card-container"></div>
        <button id="add-list-button"> + Add another list ...</button>
        `;
    }
    mounted() {
        const $cardContainer = this.$target.querySelector(
            `[data-component="card-container"]`,
        );
        this.$state.cardList.map((card) => new Card($cardContainer, { card }));
    }
    setEvent() {
        this.addEvent('click', '#add-list-button', () => {
            const $cardContainer = this.$target.querySelector(
                `[data-component="card-container"]`,
            );
            new Card($cardContainer, { new: true });
        });

        this.addEvent('click', '.card .add-list-btn', (e) => {
            const title =
                e.target.parentNode.parentNode.querySelector('input').value;
            this.setState({
                cardList: [
                    ...this.$state.cardList,
                    { id: '4', title, input: false, cards: [] },
                ],
            });
        });

        this.addEvent('keypress', '.card .list-add-input', (e) => {
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
                            {
                                id: '4',
                                title: e.target.value,
                                input: false,
                                cards: [],
                            },
                        ],
                    });
                }
            }
        });
        this.addEvent('click', '.card .close-btn', () => {
            this.setState({
                cardList: this.$state.cardList.slice(
                    0,
                    this.$state.cardList.length,
                ),
            });
        });
        this.addEvent('click', '.card .add-card-btn', (e) => {
            const id = e.target.parentNode.parentNode.dataset?.id;
            this.setState({
                cardList: this.$state.cardList.map((card) =>
                    card.id === id ? { ...card, input: true } : card,
                ),
            });
        });
    }
}

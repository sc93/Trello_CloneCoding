import Component from '../core/Component.js';
import Card from './Card.js';
export default class CardList extends Component {
    initialState = {};
    setup() {
        this.$state = {
            cardList: [],
            id: 0,
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
        // 카드추가
        this.addEvent('click', '#add-list-button', (e) => {
            const $cardContainer = this.$target.querySelector(
                `[data-component="card-container"]`,
            );
            const $addListButton =
                this.$target.querySelector('#add-list-button');
            new Card($cardContainer, { new: true });
            $addListButton.hidden = true;
        });

        // 버튼을 눌러서 카드 제목을 입력할때
        this.addEvent('click', '.card .add-list-btn', (e) => {
            const title =
                e.target.parentNode.parentNode.querySelector('input').value;
            const $addListButton =
                this.$target.querySelector('#add-list-button');
            this.setState({
                cardList: [
                    ...this.$state.cardList,
                    { id: this.$state.id, title, input: false, cards: [] },
                ],
            });
            this.setState({
                id: this.$state.id + 1,
            });
            $addListButton.hidden = false;
        });

        // enter를 눌러서 카드 제목을 입력할때
        this.addEvent('keypress', '.card .card-add-title-input', (e) => {
            if (e.key === 'Enter') {
                const id = e.target.parentNode.dataset?.id;
                // id 있는경우 ( 기존 카드 )
                if (id) {
                    this.setState({
                        cardList: this.$state.cardList.map((card) =>
                            card.id === parseInt(id)
                                ? { ...card, title: e.target.value }
                                : card,
                        ),
                    });
                }
                // id 없는경우 ( 새로만드는 카드 )
                else {
                    const $addListButton =
                        this.$target.querySelector('#add-list-button');
                    this.setState({
                        cardList: [
                            ...this.$state.cardList,
                            {
                                id: this.$state.id,
                                title: e.target.value,
                                input: false,
                                cards: [],
                            },
                        ],
                    });
                    this.setState({
                        id: this.$state.id + 1,
                    });
                    $addListButton.hidden = false;
                }
            }
        });

        // 새로 만드는 카드를 취소할때
        this.addEvent('click', '.card .close-btn', () => {
            this.setState({
                cardList: this.$state.cardList.slice(
                    0,
                    this.$state.cardList.length,
                ),
            });
        });
        // 카드안 리스트 추가할때
        this.addEvent('click', '.card .add-card-btn', (e) => {
            const id = e.target.parentNode.parentNode.dataset?.id;

            this.setState({
                cardList: this.$state.cardList.map((card) => {
                    return card.id === parseInt(id)
                        ? { ...card, input: true }
                        : card;
                }),
            });

            const $card = this.$target.querySelector(`[data-id="${id}"]`);
            $card.querySelector('.list-add-input').focus();
            console.log($card);
        });

        this.addEvent('keypress', '.card .list-add-input', (e) => {
            if (e.key === 'Enter') {
                const id = e.target.parentNode.parentNode.dataset?.id;
                const text = e.target.value;
                this.setState({
                    cardList: this.$state.cardList.map((card) =>
                        card.id !== parseInt(id)
                            ? card
                            : {
                                  ...card,
                                  cards: card.cards.concat(text),
                              },
                    ),
                });
                console.log(id);
            }
        });
    }
}

import Component from '../core/Component.js';
import Card from './Card.js';

const makeArr = (arr, to_card_idx, value) => {
    if (to_card_idx === -1) {
        return [value, ...arr];
    }
    if (to_card_idx === arr.length - 1) {
        return [...arr, value];
    }
    const arr1 = arr.slice(0, to_card_idx + 1);
    const arr2 = arr.slice(to_card_idx + 1);
    return [...arr1, value, ...arr2];
};

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
        // 리스트추가
        this.addEvent('click', '#add-list-button', (e) => {
            const $cardContainer = this.$target.querySelector(
                `[data-component="card-container"]`,
            );
            const $addListButton =
                this.$target.querySelector('#add-list-button');
            new Card($cardContainer, { new: true });
            $addListButton.hidden = true;
        });

        // 버튼을 눌러서 리스트 제목을 입력할때
        this.addEvent('click', '.card .add-list-btn', (e) => {
            const title = e.target.parentNode.parentNode.querySelector(
                '.card-add-title-input',
            ).value;
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

        // enter를 눌러서 리스트 제목을 입력할때
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

        // 새로 만드는 리스트를 취소할때
        this.addEvent('click', '.card .close-btn', () => {
            this.setState({
                cardList: this.$state.cardList.slice(
                    0,
                    this.$state.cardList.length,
                ),
            });
        });
        // 리스트안 카드 추가할때
        this.addEvent('click', '.card .add-card-input-btn', (e) => {
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
        });

        // card 입력 후 enter
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
                e.target.focus();
            }
        });

        // card 입력 후 버튼 클릭
        this.addEvent('click', '.card .add-card-btn', (e) => {
            const $card = e.target.parentNode.parentNode;
            const id = $card.dataset?.id;
            const text = $card.querySelector('.list-add-input').value;
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
        });

        // 카드입력 취소
        this.addEvent('click', '.card .add-card-close-btn', (e) => {
            const id = e.target.parentNode.parentNode.dataset?.id;
            this.setState({
                cardList: this.$state.cardList.map((card) =>
                    card.id === parseInt(id) ? { ...card, input: false } : card,
                ),
            });
        });

        // drag 이벤트 관련
        this.addEvent('drag', '.card .card-text', (e) => {
            // console.log('drag');
            // console.log(e.target.id);
        });

        // drag 시작할 때
        this.addEvent('dragstart', '.card .card-text', (e) => {
            // console.log('dragstart');
            e.dataTransfer.dropEffect = 'move';
            e.target.style.opacity = 0.5;
            e.dataTransfer.setData('id', e.target.id);
            // console.log(e.target.id);
        });

        // drag 끝날 때
        this.addEvent('dragend', '.card .card-text', (e) => {
            // console.log('dragend');
            // console.log(e.target.id);
            e.target.style.opacity = '';
        });

        this.addEvent('dragover', '.card .card-text', (e) => {
            e.preventDefault();
            // console.log('dragover');
            // console.log(e.target.id);
        });
        // drag 영역에 올렸을 때
        this.addEvent('dragenter', '.card .card-text', (e) => {
            // console.log('dragenter');
            const fake_p = e.target.parentNode.querySelector(
                `#${e.target.id}_f`,
            );
            fake_p.style.display = 'block';
        });
        // drag영역에서 나갔을 때
        this.addEvent('dragleave', '.card .card-text', (e) => {
            // console.log('dragleave');
            const fake_p = e.target.parentNode.querySelector(
                `#${e.target.id}_f`,
            );
            fake_p.style.display = 'none';
        });
        // drag 후 drop
        this.addEvent('drop', '.card .card-text', (e) => {
            e.preventDefault();

            const fake_p = e.target.parentNode.querySelector(
                `#${e.target.id}_f`,
            );
            fake_p.style.display = 'none';

            // 가져오는 곳의 아이디
            const [_from_list_id, _from_card_idx] = e.dataTransfer
                .getData('id')
                .split('_');

            // 넣을곳의 아이디
            const [_to_list_id, _to_card_idx] = e.target.id.split('_');

            const from_list_id = parseInt(_from_list_id.slice(1));
            const from_card_idx = parseInt(_from_card_idx) - 1;
            const to_list_id = parseInt(_to_list_id.slice(1));
            const to_card_idx = parseInt(_to_card_idx) - 1;

            const _value = this.$state.cardList.find(
                (list) => list.id === parseInt(from_list_id),
            ).cards[from_card_idx];

            const remove_cardList = this.$state.cardList.map((list) =>
                list.id === from_list_id
                    ? {
                          ...list,
                          cards: list.cards.filter(
                              (card, idx) => idx !== from_card_idx,
                          ),
                      }
                    : list,
            );
            const add_cardList = remove_cardList.map((list) =>
                list.id === to_list_id
                    ? {
                          ...list,
                          cards: makeArr(list.cards, to_card_idx, _value),
                      }
                    : list,
            );
            this.setState({
                cardList: add_cardList,
            });
            // console.log(_value);
            // console.log({ remove_cardList });
            // console.log({ add_cardList });
            // console.log('drop');
            // console.log('after', e.dataTransfer.getData('id'));
            // console.log(e.target.id);
        });
    }
}

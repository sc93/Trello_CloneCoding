import Component from '../core/Component.js';
import Card from './Card.js';
import {
    getList,
    addList,
    updateList,
    addCard,
    updateCard,
} from '../api/api.js';

export default class CardList extends Component {
    setup() {
        this.$state = {
            cardList: [],
            input: null,
        };
        getList()
            .then(({ cardList }) => {
                this.setState({
                    cardList,
                });
            })
            .catch(() => {});
    }
    template() {
        return `
        <div id ="card-container" data-component="card-container"></div>
        <button id="add-list-button"> + Add a list ...</button>
        `;
    }
    mounted() {
        const $cardContainer = this.$target.querySelector(
            `[data-component="card-container"]`,
        );

        this.$state.cardList.map((card) => {
            new Card($cardContainer, {
                card,
                input: this.$state.input === card.id + '',
            });
        });
    }
    setEvent() {
        // 리스트 추가버튼
        this.addEvent('click', '#add-list-button', (e) => {
            this.setState({
                input: null,
            });
            const $cardContainer = this.$target.querySelector(
                `[data-component="card-container"]`,
            );
            const $addListButton =
                this.$target.querySelector('#add-list-button');
            new Card($cardContainer, { new: true });

            // 리스트 만들기 버튼 숨기기
            $addListButton.hidden = true;
            // 작성중인 input focus 해제
        });

        // 버튼을 눌러서 리스트 제목을 입력할때
        this.addEvent('click', '.card .add-list-btn', async (e) => {
            const title = e.target.parentNode.parentNode.querySelector(
                '.card-add-title-input',
            ).value;
            try {
                // add LIST API
                const { cardList } = await addList(title);
                this.setState({
                    cardList,
                });
                // 리스트 만들기 버튼 보이기
                const $addListButton =
                    this.$target.querySelector('#add-list-button');
                $addListButton.hidden = false;
            } catch (error) {
                alert('처리하지 못함');
                this.setState({
                    cardList: [...this.$state.cardList],
                });
            }
        });

        // enter를 눌러서 리스트 제목을 입력할때
        this.addEvent('keypress', '.card .card-add-title-input', async (e) => {
            if (e.key === 'Enter') {
                const id = e.target.parentNode.dataset?.id;
                const title = e.target.value;
                try {
                    // id 있는경우 ( 기존 카드 )
                    if (id) {
                        const { cardList } = await updateList(id, title);
                        this.setState({
                            cardList,
                        });
                    }
                    // id 없는경우 ( 새로만드는 카드 )
                    else {
                        const { cardList } = await addList(title);
                        this.setState({
                            cardList,
                        });
                        const $cardContainer = this.$target.querySelector(
                            `[data-component="card-container"]`,
                        );
                        const $addListButton =
                            this.$target.querySelector('#add-list-button');
                        new Card($cardContainer, { new: true });
                        // 리스트 만들기 버튼 보이기
                        // const $addListButton =
                        //     this.$target.querySelector('#add-list-button');
                        // $addListButton.hidden = false;
                    }
                } catch (error) {
                    alert('처리하지 못함');
                    this.setState({
                        cardList: [...this.$state.cardList],
                    });
                }
            }
        });

        // 새로 만드는 리스트를 취소할때
        this.addEvent('click', '.card .close-btn', () => {
            this.setState({});
        });
        // 리스트안 카드 추가할때
        this.addEvent('click', '.card .add-card-input-btn', (e) => {
            const id = e.target.parentNode.parentNode.dataset?.id;

            //input 활성화 여부 설정
            this.setState({
                cardList: this.$state.cardList.map((card) => {
                    return card.id === parseInt(id) ? { ...card } : card;
                }),
                input: id,
            });

            const $card = this.$target.querySelector(`[data-id="${id}"]`);
            $card.querySelector('.list-add-input').focus();
        });

        // card 입력 후 enter
        this.addEvent('keypress', '.card .list-add-input', async (e) => {
            if (e.key === 'Enter') {
                const id = e.target.parentNode.parentNode.dataset?.id;
                const text = e.target.value;
                try {
                    //  addCard API
                    const { cardList } = await addCard(id, text);

                    this.setState({
                        cardList,
                    });
                } catch (error) {
                    alert('처리하지 못함');
                    this.setState({
                        cardList: [...this.$state.cardList],
                    });
                } finally {
                    const $card = this.$target.querySelector(
                        `[data-id="${id}"]`,
                    );
                    $card.querySelector('.list-add-input').focus();
                }
            }
        });

        // card 입력 후 버튼 클릭
        this.addEvent('click', '.card .add-card-btn', async (e) => {
            const $card = e.target.parentNode.parentNode;
            const id = $card.dataset?.id;
            const text = $card.querySelector('.list-add-input').value;
            //  addCard API
            try {
                const { cardList } = await addCard(id, text);

                this.setState({
                    cardList,
                });
            } catch (error) {
                alert('처리하지 못함');
                this.setState({
                    cardList: [...this.$state.cardList],
                });
            }
        });
        // 카드입력 취소
        this.addEvent('click', '.card .add-card-close-btn', (e) => {
            const id = e.target.parentNode.parentNode.dataset?.id;
            this.setState({
                input: null,
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
            // 임시영역 보이기
            const fake_p = e.target.parentNode.querySelector(
                `#${e.target.id}_f`,
            );
            fake_p.style.display = 'block';
        });
        // drag영역에서 나갔을 때
        this.addEvent('dragleave', '.card .card-text', (e) => {
            // console.log('dragleave');
            // 임시영역 숨기기
            const fake_p = e.target.parentNode.querySelector(
                `#${e.target.id}_f`,
            );
            fake_p.style.display = 'none';
        });
        // drag 후 drop
        this.addEvent('drop', '.card .card-text', async (e) => {
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
            try {
                // moveCard API
                const { cardList } = await updateCard({
                    from_list_id,
                    from_card_idx,
                    to_list_id,
                    to_card_idx,
                });
                this.setState({
                    cardList,
                });
            } catch (error) {
                alert('처리하지 못함');
                this.setState({
                    cardList: [...this.$state.cardList],
                });
            }
        });
    }
}

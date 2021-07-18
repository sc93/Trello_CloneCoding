import Component from '../core/Component.js';
export default class Card extends Component {
    setup() {}
    template() {
        return `
        <div class="card" data-id="${
            isNaN(this.$props.card?.id) ? '' : this.$props.card?.id
        }">
            <input type="text" class="card-add-title-input" value="${
                this.$props.card?.title || ''
            }" placeholder="Enter list title..."/>
            ${
                this.$props.new
                    ? `
                    <div>
                        <button class="card-list-button add-list-btn">Add list</button>
                        <button class="close-btn">X</button>
                    </div>
                     `
                    : ''
            }
            <div>
            ${
                `<p class="card-text fake-p" id="p${
                    this.$props.card?.id + '_0'
                }"></p>
                <p class="fake-area" draggable="false" id="p${
                    this.$props.card?.id + '_0' + '_f'
                }"></p>` +
                (!this.$props.new && this.$props.card?.cards.length !== 0
                    ? this.$props.card?.cards
                          .map(
                              (card, idx) =>
                                  `<p class="card-text" draggable="true" id="p${
                                      this.$props.card?.id + '_' + (idx + 1)
                                  }">${card}</p>
                                  <p class="fake-area" draggable="false" id="p${
                                      this.$props.card?.id +
                                      '_' +
                                      (idx + 1) +
                                      '_f'
                                  }"></p>`,
                          )
                          .join(' ')
                    : '')
            }
            </div>
            ${
                !this.$props.new
                    ? this.$props.input
                        ? `
                        <div>
                            <input type="text" class="list-add-input" placeholder="Enter a title for this card..."/>
                        </div>
                        <div>
                            <button class="card-list-button add-card-btn">Add a card</button>
                            <button class="add-card-close-btn">X</button>
                        </div>`
                        : `
                        <div>
                            <button class="card-list-button add-card-input-btn">+ Add a card</button>
                        </div>`
                    : ''
            }
            
        </div>
        `;
    }
    mounted() {
        // list 새로 만들때 input focus
        if (this.$props.new) {
            const card = this.$target.querySelectorAll(
                '.card .card-add-title-input',
            );
            card[card.length - 1].focus();
        }

        // card 입력할때 input focus
        if (this.$props.card?.input) {
            const card = this.$target.querySelector(
                `[data-id="${this.$props.card.id}"]`,
            );
            card.querySelector('.list-add-input').focus();
        }
    }
    setEvent() {}
    render() {
        // 반복되는 컴포넌트라서 재정의
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}

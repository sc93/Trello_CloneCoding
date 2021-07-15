import Component from '../core/Component.js';
export default class Card extends Component {
    initialState = {};
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
            ${
                !this.$props.new && this.$props.card?.cards.length !== 0
                    ? this.$props.card?.cards
                          .map((card) => `<p class="card-text">${card}</p>`)
                          .join('')
                    : ''
            }
            ${
                !this.$props.new
                    ? this.$props.card?.input
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
            console.log('focus');
            const card = this.$target.querySelector(
                `[data-id="${this.$props.card.id}"]`,
            );
            card.querySelector('.list-add-input').focus();
            // card.focus();
        }
    }
    setEvent() {}
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}

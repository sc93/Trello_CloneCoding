import Component from '../core/Component.js';
export default class Card extends Component {
    initialState = {};
    setup() {
        console.log(this.$props?.card);
    }
    template() {
        return `
        <div class="card" data-id="${this.$props.card?.id || ''}">
            <input type="text" class="list-add-input" value="${
                this.$props.card?.title || ''
            }"/>
            ${
                this.$props.new
                    ? `
                        <div>
                            <button class="card-list-button add-list-btn">Add list</button>
                            <button class="close-btn">X</button>
                        </div>
                    `
                    : this.$props.card?.input
                    ? `<div><input type="text"/></div>`
                    : `
                        <div>
                            <button class="card-list-button add-card-btn">+ Add a card</button>
                        </div>
                    `
            }
        </div>
        `;
    }
    mounted() {
        if (this.$props.new) {
            const cardList = this.$target.querySelectorAll('.card input');
            cardList[cardList.length - 1].focus();
        }
    }
    setEvent() {}
    render() {
        this.$target.innerHTML += this.template();
        this.mounted();
    }
}

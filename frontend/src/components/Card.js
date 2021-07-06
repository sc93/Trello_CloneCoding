import Component from '../core/Component.js';
export default class Card extends Component {
    initialState = {};
    setup() {}
    template() {
        return `
        <div class="card">
            <input type="text"/>
            ${
                this.$props.new
                    ? `
                        <div>
                            <button>Add list</button>
                        </div>
                    `
                    : `
                        <div>
                            <p>Add a card</p>
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

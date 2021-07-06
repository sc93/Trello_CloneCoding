import Component from './core/Component.js';
import CardList from './components/CardList.js';

export default class App extends Component {
    initialState = {};
    setup() {}
    template() {
        return `
            <div id="container" data-component="container">
            </div>
        `;
    }
    mounted() {
        const $container = this.$target.querySelector(
            `[data-component="container"]`,
        );
        new CardList($container);
    }
    setEvent() {}
}

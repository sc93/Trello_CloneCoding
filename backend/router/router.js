const express = require('express');
const router = express.Router();
let cardList = [];
let id = 0;
// list 반환
router.get('/list', (req, res) => {
    res.send({ cardList });
});
// list 추가
router.post('/list', (req, res) => {
    console.log('post list');
    const { title } = req.body;
    cardList = [
        ...cardList,
        {
            id: id++,
            title: title,
            cards: [],
        },
    ];
    res.send({
        cardList,
    });
});
// list 제목 수정
router.patch('/list', (req, res) => {
    const { id, title } = req.body;

    cardList = cardList.map((card) =>
        card.id === parseInt(id) ? { ...card, title } : card,
    );
    res.send({
        cardList,
    });
});
// card 추가
router.post('/card', (req, res) => {
    const { id, text } = req.body;
    cardList = cardList.map((card) =>
        card.id !== parseInt(id)
            ? card
            : {
                  ...card,
                  cards: card.cards.concat(text),
              },
    );
    res.send({
        cardList,
    });
});
//card 옮기기
router.patch('/card', (req, res) => {
    const { from_list_id, from_card_idx, to_list_id, to_card_idx } = req.body;
    const _value = cardList.find((list) => list.id === parseInt(from_list_id))
        .cards[from_card_idx];
    const remove_cardList = cardList.map((list) =>
        list.id === from_list_id
            ? {
                  ...list,
                  cards: list.cards.filter(
                      (card, idx) => idx !== from_card_idx,
                  ),
              }
            : list,
    );
    // 옮기는곳에 추가함
    const add_cardList = remove_cardList.map((list) =>
        list.id === to_list_id
            ? {
                  ...list,
                  cards: makeArr(list.cards, to_card_idx, _value),
              }
            : list,
    );
    cardList = add_cardList;

    res.send({
        cardList,
    });
});
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
module.exports = router;

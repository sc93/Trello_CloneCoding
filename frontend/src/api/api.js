const url = 'http://localhost:3000/api/';
const headers = {
    'Content-Type': 'application/json',
};

export const getList = async () => {
    // console.log('getList');
    try {
        const res = await fetch(url + 'list', {
            method: 'GET',
            headers,
        });
        const data = await res.json();
        return data;
    } catch (error) {}
};
export const addList = async (title) => {
    // console.log('addList');
    try {
        const res = await fetch(url + 'list', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: title,
            }),
        });
        const data = await res.json();
        return data;
    } catch (e) {}
};
export const updateList = async (id, title) => {
    // console.log('updateList');
    try {
        const res = await fetch(url + 'list', {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                id,
                title,
            }),
        });
        const data = await res.json();
        return data;
    } catch (e) {}
};

export const addCard = async (id, text) => {
    // console.log('addCard');
    try {
        const res = await fetch(url + 'card', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                id,
                text,
            }),
        });
        const data = await res.json();
        return data;
    } catch (e) {}
};

export const updateCard = async ({
    from_list_id,
    from_card_idx,
    to_list_id,
    to_card_idx,
}) => {
    // console.log('moveCard');
    try {
        const res = await fetch(url + 'card', {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                from_list_id,
                from_card_idx,
                to_list_id,
                to_card_idx,
            }),
        });
        const data = await res.json();
        return data;
    } catch (e) {}
};

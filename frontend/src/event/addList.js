const addList = (target) => {
    target.innerHTML =
        `<div class="card">
            <input type="text" autofocus/>
        </div>` + target.innerHTML;
};

export default addList;

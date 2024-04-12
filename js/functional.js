//показывает дефолтных юзеров
function showUsers(usersList) {
    const parent = document.querySelector('#grid');
    parent.addEventListener('click', gridClickHandler);

    usersList.forEach(user => {
        const userRow = createUserRow(user);
        parent.appendChild(userRow);

    })
}

//контейнер для юзеров
function createUserRow(user) {
    const userRow = document.createElement('div');
    userRow.classList.add('user_row');
    userRow.classList.add('row');
    userRow.setAttribute('data-id', user.id);

    createUserRowContent(userRow, user);

    return userRow;
}

//универсальній код для отрисовки
function createElement(tagName, attributes, content, parent, eventHandlers) {
    const element = document.createElement(tagName);

    for (let key in attributes) {
        const attribute = key === 'className' ? 'class' : key;
        element.setAttribute(attribute, attributes[key]);
    }

    for (let event in eventHandlers) {
        element.addEventListener(event, eventHandlers[event]);
    }

    element.textContent = content;
    parent.appendChild(element);

    return element;
}

//отрисовка юзеров динамически
function createUserRowContent(userRow, user) {
    createElement('div', {className: 'user_id'}, user.id, userRow);
    createElement('div', {className: 'user_name'}, user.name, userRow);

    const divButtons = createElement('div', {className: 'user_buttons'}, '', userRow);
    createElement('input', {type: 'button', value: 'View', 'data-action': 'view'}, '', divButtons);
    createElement('input', {type: 'button', value: 'Edit', 'data-action': 'edit'}, '', divButtons);
    createElement('input', {type: 'button', value: 'Remove', 'data-action': 'remove'}, '', divButtons);


   /* divButtons.querySelector('input[data-action="remove"]').addEventListener('click', () => {
        const userId = user.id;
        removeUserData(userId, userRow);
    });
*/
    divButtons.querySelectorAll('input').forEach(button => {
        button.addEventListener('click', () => {
            const userId = user.id;
            const userRow = button.closest('.user_row');
            const dataAction = button.getAttribute('data-action');
            handleButtonClick(dataAction, userId, userRow);
        });
    });


}

function handleButtonClick(action, userId, userRow) {
    switch (action) {
        case 'view':
            const user = getUserById(userId);
            showUserData(user);
            break;
        case 'edit':
            const userToEdit = getUserById(userId);
            editUserData(userToEdit);
            break;
        case 'remove':
            removeUserData(userId, userRow);
            break;
    }
}

//обработка кликов на элементах
function gridClickHandler(event) {
    if (event.target.nodeName === 'INPUT') {
        const dataAction = event.target.getAttribute('data-action');
        const userId = event.target.closest('.user_row').getAttribute('data-id');
        const user = getUserById(userId);
        switch (dataAction) {
            case 'view':
                showUserData(user);
                break;
            case 'edit':
                editUserData(user);
                break;
            case 'delete':
                removeUserData(user);
        }
    }
}

//генерация айди пользователя
function getUserById(id) {
    return users.find(user => user.id === id);
}

//генерация айди индекса
function getUserIndexById(id) {
    return users.findIndex(user => user.id == id);
}

function generateUserId() {
    return users.length > 0 ? parseInt(users[users.length - 1].id, 10) + 1 : 1;
}

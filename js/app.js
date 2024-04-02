//создание списка
let users = JSON.parse(localStorage.getItem('users')) || [];

addEventListener('DOMContentLoaded', () => {
    if (users.length === 0) {
        users = defaultUsers;
        localStorage.setItem('users', JSON.stringify((users)));
    }
    showUsers(users);
});


document.querySelector('.add_btn').addEventListener('click', () => {
    document.querySelector('#form').classList.remove('hidden');
    document.querySelector('#view').classList.add('hidden');
    clearFormData();

});

document.querySelector('.view_close_button').addEventListener('click', () => {
    document.querySelector('#form').classList.add('hidden');
})

document.querySelector('.save_btn').addEventListener('click', event => {
    const id = event.target.getAttribute('data-id')
    const user = collectData();
    const isValid = validateUser(user);

    if (!isValid) {
        alert('invalid - enter data');
    } else {
        if (!id) {
            user.id = generateUserId();
            saveUser(user);
            const parent = document.querySelector('#grid');
            const userRow = createUserRow(user);
            document.querySelector('#form').classList.add('hidden');
            parent.appendChild(userRow);
        } else {
            user.id = id;
            const userIndex = getUserIndexById(id);
            if (userIndex === -1) {
                return
            }

            users[userIndex] = user;

            const userRow = document.querySelector(`.row[data-id="${id}"]`);
            userRow.innerHTML = '';
            createUserRowContent(userRow, user);
            saveUser(user, false);
        }
        clearFormData();
        document.querySelector('#form').classList.add('hidden');


    }

})

//отрисовка данных при нажатии на view
function showUserData(user) {
    document.querySelector('#view').classList.remove('hidden');
    document.querySelector('#form').classList.add('hidden');
    document.querySelector('#view').innerHTML = `
<div> 
<p>Name: ${user.name} </p>
<p>Login: ${user.login} </p>
<p>Email: ${user.email} </p>
<p>Age: ${user.age} </p>
<input type="button" value="Close" class="view_close_button"/>
</div>
`;

    document.querySelector('.view_close_button').addEventListener('click', () => {
        document.querySelector('#view').classList.add('hidden');
        document.querySelector('#view').innerHTML = '';

    })
}

//очистка формы перед использованием
function clearFormData() {
    const formElements = document.forms[0].elements;
    for (let item of formElements) {
        if (item.type === 'button') {
            item.removeAttribute('data-id')
        } else {
            item.value = '';
        }
    }
}

//редактирование юзера
function editUserData(user) {

    document.querySelector('#form').classList.remove('hidden');
    document.querySelector('#view').classList.add('hidden');


    const formElements = document.forms[0].elements;

    formElements.save_btn.setAttribute('data-id', user.id);

    for (let key in user) {
        if (key === 'id') {
            continue;
        }
        formElements[key].value = user[key];
    }

}

//сбор данных отредактированных
function collectData() {
    const form = document.forms[0].elements;
    const name = form.name.value;
    const login = form.login.value;
    const email = form.email.value;
    const age = form.age.value;

    const user = {
        name,
        login,
        email,
        age,
    };

    return user;
}

//валидация формы
function validateUser(user) {
    let isValid = true;

    for (let value in user) {
        if (user[value] === '') {
            isValid = false;
            break;
        }
    }
    return isValid;

}

//сохр данных в local
function saveUser(user, isNew = true) {
    if (isNew) {
        users.push(user);
    }
    localStorage.setItem('users', JSON.stringify((users)));
}

//удаление юзера из списка и local
function removeUserData(userId, userRow) {
    const userIndex = getUserIndexById(userId);

    if (userIndex !== -1) {
        const confirmation = confirm("Вы уверены, что хотите удалить этого пользователя?");
        if (confirmation) {
            users.splice(userIndex, 1);
            /*updateIdsAfterDelete(userIndex);*/
            userRow.remove();
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

//обновление айди после удаления из списка
/*
function updateIdsAfterDelete() {
    const userRows = document.querySelectorAll('.user_row');
    users.forEach((user, index) => {
        user.id = index + 1;
        const userRow = userRows[index];
        if (userRow) {
            userRow.setAttribute('data-id', index + 1);
            const userIdElement = userRow.querySelector('.user_id');
            if (userIdElement) {
                userIdElement.textContent = index + 1;
            }
        }
    });
}*/

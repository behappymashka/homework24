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
    document.querySelector('#form').classList.add('hidden');
}


//валидация формы на корректность данных (регулярка)
function validateForm(user) {
    const nameRegExp = /^\w{2,}$/i;
    const loginRefExp = /^\w{2,}$/i;
    const emailRefExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ageRefExp = /^(1[89]|[2-9][0-9]|1[01][0-9]|120)$/;

    if (!nameRegExp.test(user.name)) {
        alert('Invalid name. Please enter a valid name (2-30 characters, letters only)');
        return false;
    }
    if (!loginRefExp.test(user.login)) {
        alert('Invalid login. Please enter a valid name (2-30 characters, letters only)');
        return false;
    }
    if (!emailRefExp.test(user.email)) {
        alert('Invalid email. Please enter a valid email address');
        return false;
    }

    if (!ageRefExp.test(user.age)) {
        alert('Invalid age. Please enter a valid age between 18 and 120');
        return false;
    }
    return true;
}





import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from './api.js';

const btnGet = document.getElementById('btnGet');
const btnPost = document.getElementById('btnPost');
const table = document.getElementById('usersTable');

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');

let selectedUserId = null; // ID dinámico

//  GET
btnGet.addEventListener('click', async () => {
    const users = await getUsers();
    console.log(users);

    renderUsers(users);
});

// // POST
btnPost.addEventListener('click', async () => {
    const name = inputName.value;
    const email = inputEmail.value;

    if (!name || !email) return alert('Complete los campos');

    await createUser({ name, email });
    inputName.value = '';
    inputEmail.value = '';
    btnGet.click();
});

// // Renderizar tabla
const renderUsers = (users) => {
    table.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        console.log(row);

        row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button data-id="${user.id}" class="edit btn btn-dark btn-sm">Editar</button>
        <button data-id="${user.id}" class="delete btn btn-danger btn-sm">Eliminar</button>
      </td>
    `;

        table.appendChild(row);
    });
};

// // Delegación de eventos para PUT y DELETE
table.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('edit')) {
        selectedUserId = id;
        inputName.value = e.target.closest('tr').children[0].textContent;
        inputEmail.value = e.target.closest('tr').children[1].textContent;

        const newName = prompt('Nuevo nombre:', inputName.value);
        const newEmail = prompt('Nuevo email:', inputEmail.value);

        if (newName && newEmail) {
            await updateUser(selectedUserId, {
                name: newName,
                email: newEmail
            });
            btnGet.click();
        }
    }

    if (e.target.classList.contains('delete')) {
        if (confirm('¿Eliminar usuario?')) {
            await deleteUser(id);
            btnGet.click();
        }
    }
});

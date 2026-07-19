const API_URL = 'http://localhost:4000/users';

export const getUsers = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createUser = async (user) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return res.json();
};

export const updateUser = async (id, user) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return res.json();
};

export const deleteUser = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    if (res.status === 204) return null;
};


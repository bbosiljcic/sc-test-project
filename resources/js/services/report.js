const baseURL = './reports';

async function getAll() {
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log('getAll result:', data);
    return data;
}

async function getOneById(id) {
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    console.log('getOneById result:', data);
    return data;
}

async function create(title) {
    const response = await fetch(baseURL, {
        method: 'POST',
        body: `title=${title}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await response.json();
    return data;
}

async function updateOneById(id, title) {
    const response = await fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        body: `title=${title}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await response.json();
    return data;
}

async function deleteOneById(id) {
    const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}



export default {
    getAll,
    getOneById,
    create,
    updateOneById,
    deleteOneById,
};
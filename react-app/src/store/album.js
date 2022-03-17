// Action Types
const GET_ALBUMS = "album/getAlbums";
const POST_ALBUM = "album/postAlbum";
const PATCH_ALBUM = "album/patchAlbum";
const DELETE_ALBUM = "album/deleteAlbum";

// Action Creators

export const getCurrentUserAlbumsActionCreator = albums => {
    console.log('action creator', albums)
    return { type: GET_ALBUMS, albums };
};

export const postAlbumActionCreator = album => {
    return { type: POST_ALBUM, album };
};

export const patchAlbumActionCreator = album => {
    return { type: PATCH_ALBUM, album };
};

export const deleteAlbumActionCreator = id => {
    return { type: DELETE_ALBUM, id };
};

// Thunk Creator for GET request
export const getAlbums = () => async (dispatch, getState) => {
    const res = await fetch('/api/albums')
    const data = await res.json()
    console.log('thunk creator', data)

    if (res.ok) {
        dispatch(getCurrentUserAlbumsActionCreator(data))
    } else {
        throw res
    }
    // return data
}

// Thunk creator for POST request
export const postAlbum = album => async dispatch => {
    const res = await fetch('/api/albums/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(album)
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(postAlbumActionCreator(data))
    } else {
        throw res
    }
    return data
}

// Thunk creator for PATCH request
export const patchAlbum = album => async dispatch => {
    const res = await fetch(`/api/albums/${album.id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(album)
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(patchAlbumActionCreator(data))
    } else {
        throw res
    }
    return data
}

// Thunk creator for DELETE request
export const deleteAlbum = id => async dispatch => {
    const res = await fetch(`/api/albums/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(deleteAlbumActionCreator(id))
    } else {
        throw res
    }
    // return data
}

// Reducer

// const initialState = {
//     entries: {}
// }

// const albumReducer = (state = initialState, action) => {
//     console.log('reducer', action.albums)
//     let newState = {};
//     switch (action.type) {
//         case GET_CURRENT_USER_ALBUMS: {
//             newState = { ...state };
//             newState.entries = action.albums.reduce((entries, album) => {
//                 entries[album.id] = album;
//                 return entries;
//             }, {});
//             return newState;
//         }
//         default:
//             return state
//     }
// }
const normalization = (arr) => {
    let obj = {}
    arr.map(element => obj[element.id] = element);
    return obj
}

const albumReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case GET_ALBUMS:
            newState = { ...state, ...action.albums }
            return newState
        case DELETE_ALBUM:
            newState = { ...state }
            const normalizedAlbums = normalization(newState.albums)
            delete normalizedAlbums[action.id]
            newState.albums = normalizedAlbums
            return newState
        default:
            return state
    }
}

export default albumReducer

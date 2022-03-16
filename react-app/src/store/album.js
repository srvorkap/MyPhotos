// Action Types
const GET_CURRENT_USER_ALBUMS = "album/getCurrentUserAlbums";
const POST_ALBUM = "album/postAlbum";
const PATCH_ALBUM = "album/patchAlbum";
const DELETE_ALBUM = "album/deleteAlbum";

// Action Creators

export const getCurrentUserAlbumsActionCreator = albums => {
    return { type: GET_CURRENT_USER_ALBUMS, albums };
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
export const getCurrentUserAlbums = () => async (dispatch, getState) => {
    const res = await fetch('/api/albums')
    const data = await res.json()

    if (res.ok) {
        dispatch(getCurrentUserAlbums(data))
    } else {
        throw res
    }
    // return data
}

// Thunk creator for POST request
export const postAlbum = album => async dispatch => {
    const res = await fetch('/api/albums', {
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
export default patchAlbum = album => async dispatch => {
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
    const res = await fetch(`/api/albums/${album.id}`, {
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

// Action Types
const GET_ALBUMS = "album/getAlbums";
const POST_ALBUM = "album/postAlbum";
const PATCH_ALBUM = "album/patchAlbum";
const DELETE_ALBUM = "album/deleteAlbum";

// Action Creators

export const getCurrentUserAlbumsActionCreator = albums => {
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
    const res = await fetch("/api/albums/");
    const data = await res.json();

    if (res.ok) {
        dispatch(getCurrentUserAlbumsActionCreator(data));
    } else {
        throw res;
    }
    // return data
};

// Thunk creator for POST request
export const postAlbum = album => async dispatch => {
    const res = await fetch("/api/albums/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(postAlbumActionCreator(data.album));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

// Thunk creator for PATCH request
export const patchAlbum = album => async dispatch => {
    const res = await fetch(`/api/albums/${album.id}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(patchAlbumActionCreator(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        } else {
            return ["An error occurred. Please try again."];
        }
    }
};

// Thunk creator for DELETE request
export const deleteAlbum = id => async dispatch => {
    const res = await fetch(`/api/albums/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    // const data = await res.json();

    if (res.ok) {
        dispatch(deleteAlbumActionCreator(id));
    } else {
        throw res;
    }
    // return data
};

// Reducer

const albumReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALBUMS:
            newState = { ...state, ...action.albums };
            return newState;
        case POST_ALBUM:
            newState = { ...state, [action.album.id]: action.album };
            return newState;
        case PATCH_ALBUM:
            newState = { ...state, [action.album.id]: action.album };
            return newState;
        case DELETE_ALBUM:
            newState = { ...state };
            newState.albums = { ...newState.albums, [action.id]: undefined}
            // delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default albumReducer;

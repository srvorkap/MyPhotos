// Action Types
const GET_PHOTOS = "photo/getPhotos";
const POST_PHOTO = "photo/postPhoto";
const PATCH_PHOTO = "photo/patchPhoto";
const DELETE_PHOTO = "photo/deletePhoto";

// Action Creators

export const getPhotosActionCreator = photos => {
    return { type: GET_PHOTOS, photos };
};

export const postPhotoActionCreator = photo => {
    return { type: POST_PHOTO, photo };
};

export const patchPhotoActionCreator = photo => {
    return { type: PATCH_PHOTO, photo };
};

export const deletePhotoActionCreator = id => {
    return { type: DELETE_PHOTO, id };
};

// Thunk Creator for GET request
export const getPhotos = () => async (dispatch, getState) => {
    const res = await fetch('/api/photos/')
    const data = await res.json()

    if (res.ok) {
        dispatch(getPhotosActionCreator(data))
    } else {
        throw res
    }
    // return data
}

// Thunk Creator for POST request
export const postPhoto = photo => async dispatch => {
    const res = await fetch('/api/photos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(photo)
    })
    // const data = await res.json()

    if (res.ok) {
        const data = await res.json();
        dispatch(postPhotoActionCreator(data.photo));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        } else {
            return ["An error occurred. Please try again."];
        }
    }
}

// Thunk Creator for PATCH request
export const patchPhoto = photo => async dispatch => {
    const res = await fetch(`/api/photos/${photo.id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(photo)
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(patchPhotoActionCreator(data.photo))
    } else {
        throw res
    }
    return data
}

// Thunk creator for DELETE request
export const deletePhoto = id => async dispatch => {
    const res = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id })
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(deletePhotoActionCreator(id))
    } else {
        throw res
    }
    // return data
}



const photoReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case GET_PHOTOS:
            newState = {...state, ...action.photos}
            return newState
        case POST_PHOTO:
            newState = {...state, [action.photo.id]: action.photo}
            return newState
        case PATCH_PHOTO:
            newState = {...state, [action.photo.id]: action.photo}
            return newState
        case DELETE_PHOTO:
            newState = {...state}
            delete newState[action.id]
            // newState.photos = { ...newState.photos, [action.id]: undefined}
            return newState
        default:
            return state
    }
}

export default photoReducer

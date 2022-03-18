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
    console.log('thunk', photo)
    const res = await fetch('/api/photos/', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json'}, // you must NOT set the Content-Type header on your request. If you leave the Content-Type field blank, the Content-Type will be generated and set correctly by your browser (check it out in the network tab!). If you include Content-Type, your request will be missing information and your Flask backend will be unable to locate the attached files.
        body: photo // change change change change change
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(postPhotoActionCreator(data.photo))
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
        case DELETE_PHOTO:
            newState = {...state}
            newState.photos = { ...newState.photos, [action.id]: undefined}
            return newState
        default:
            return state
    }
}

export default photoReducer

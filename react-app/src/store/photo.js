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
    const res = await fetch('/api/photos')
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
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(photo)
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(postPhotoActionCreator(data))
    } else {
        throw res
    }
    return data
}



const photoReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case GET_PHOTOS:
            newState = {...state, ...action.photos}
            return newState
        default:
            return state
    }
}

export default photoReducer

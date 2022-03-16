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



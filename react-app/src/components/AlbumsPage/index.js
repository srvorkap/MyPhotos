import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { getAlbums, deleteAlbum } from "../../store/album";
import { getPhotos } from "../../store/photo";

const AlbumsPage = ({ sessionUser }) => {
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(getPhotos())
    // }, [dispatch])

    const onCreateAlbumForm = e => {
        e.preventDefault();
        history.push("/albums/new");
    };

    // const onDelete = e => {
    //     e.preventDefault()
    //     dispatch(deleteAlbum())
    // }

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            {sessionUserAlbums?.map(album => (
                <div key={album.id}>
                    <NavLink to={`/albums/${album.id}`}>
                        <div>{album.title}</div>
                    </NavLink>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            history.push(`/albums/${album.id}/edit`);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            dispatch(deleteAlbum(album.id));
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button onClick={onCreateAlbumForm}>Create new album</button>
        </div>
    );
};

export default AlbumsPage;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { getAlbums, deleteAlbum } from "../../store/album";
import { getPhotos } from "../../store/photo";
import Cover from "../Cover";
import defaultAlbumImage from "../../assets/default-album-image.jpeg";

const AlbumsPage = ({ sessionUser }) => {
    // const [isActive, setIsActive] = useState(false)

    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        sessionUserAlbums = allAlbumsArr?.filter(
            album => album?.user_id === sessionUser?.id
        );
    }

    sessionUserAlbums?.reverse();

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
            <Cover sessionUser={sessionUser} />
            {sessionUserAlbums?.map(album => (
                <div key={album?.id}>
                    <NavLink to={`/albums/${album?.id}`}>
                        {/* <div>{album?.title}</div>
                        <img src={album.photos.length === 0 ? defaultAlbumImage : album.photos[0].image_url} /> */}
                        <div
                            style={{
                                backgroundImage: `url(${album.photos.length === 0 ? defaultAlbumImage : album.photos[0].image_url})`,
                            }}
                            className="individual-photo"
                            // onMouseEnter={() => setIsActive(true)}
                            // onMouseLeave={() => setIsActive(false)}
                        >
                            {/* {isActive && ( */}
                                <>
                                    <p>{album.title}</p>
                                    <p>{album.photos.length === 0 ? 'Empty Album' : album.photos.length === 1 ? `1 Photo` : `${album.photos.length} Photos` }</p>
                                </>
                            {/* )} */}
                        </div>
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

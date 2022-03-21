import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { getAlbums, deleteAlbum } from "../../store/album";
import { getPhotos } from "../../store/photo";
import Cover from "../Cover";
import defaultAlbumImage from "../../assets/default-album-image.jpeg";
import coverPhoto from "../../assets/cover-photo.jpeg";
import "./AlbumsPage.css";

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

    // const onDelete = e => {
    //     e.preventDefault()
    //     dispatch(deleteAlbum())
    // }

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div id="albums-page">
            {/* <Cover sessionUser={sessionUser} /> */}
            <div>
                <div
                    style={{ backgroundImage: `url(${coverPhoto})` }}
                    id="cover-background-image"
                >
                    <h1>{sessionUser?.username}</h1>
                    <h2>
                        {sessionUserAlbums?.length === 0
                            ? `no albums`
                            : sessionUserAlbums?.length === 1
                            ? `1 album`
                            : `${sessionUserAlbums?.length} albums`}
                    </h2>
                </div>
            </div>
            <div
                onClick={() => history.push("/albums/new")}
                id="create-new-album"
                className="cursor-pointer"
            >
                <i class="fas fa-plus"></i>
                <div>New album</div>
            </div>
            <div>
                <div className="albums-photos-container">
                    {sessionUserAlbums?.map(album => (
                        <div key={album?.id}>
                            <NavLink to={`/albums/${album?.id}`}>
                                {/* <div>{album?.title}</div>
                        <img src={album.photos.length === 0 ? defaultAlbumImage : album.photos[0].image_url} /> */}
                                <div
                                    style={{
                                        backgroundImage: `url(${
                                            album.photos.length === 0
                                                ? defaultAlbumImage
                                                : album.photos[0].image_url
                                        })`,
                                    }}
                                    className="individual-photo"
                                    // onMouseEnter={() => setIsActive(true)}
                                    // onMouseLeave={() => setIsActive(false)}
                                >
                                    {/* {isActive && ( */}
                                    <>
                                        <p>{album.title}</p>
                                        <p>
                                            {album.photos.length === 0
                                                ? "Empty Album"
                                                : album.photos.length === 1
                                                ? `1 Photo`
                                                : `${album.photos.length} Photos`}
                                        </p>
                                        <i
                                            class="fas fa-trash-alt cursor-pointer"
                                            onClick={e => {
                                                e.preventDefault();
                                                dispatch(deleteAlbum(album.id));
                                            }}
                                        ></i>
                                    </>
                                    {/* )} */}
                                </div>
                            </NavLink>
                            {/* <button
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
                    </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlbumsPage;

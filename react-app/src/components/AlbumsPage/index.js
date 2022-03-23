import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { getAlbums, deleteAlbum } from "../../store/album";
import { getPhotos } from "../../store/photo";
import Cover from "../Cover";
import defaultAlbumImage from "../../assets/default-album-image.jpeg";
import coverPhoto from "../../assets/cover-photo.jpeg";
import "./AlbumsPage.css";
import { defaultImage } from "../../helper";

const AlbumsPage = ({ sessionUser }) => {
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

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div id="albums-page">
            <div id="album-cover-container">
                <div id="album-cover-gradient"></div>
                <img
                    src={coverPhoto}
                    onError={e => (
                        (e.target.onerror = null), (e.target.src = defaultImage)
                    )}
                    id="album-cover-image"
                />
                <div id="album-cover-text">
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
            <div id="create-new-album-container">
                <div
                    onClick={() => history.push("/albums/new")}
                    id="create-new-album"
                    className="cursor-pointer"
                >
                    <i class="fas fa-plus"></i>
                    <div>New album</div>
                </div>
            </div>
            <div>
                <div className="albums-photos-container">
                    {sessionUserAlbums?.map(album => (
                        <div key={album?.id}>
                            <NavLink to={`/albums/${album?.id}`}>
                                <div id="albums-individual-photo-container">
                                    <div id="albums-gradient"></div>
                                    <img
                                        src={
                                            album.photos.length === 0
                                                ? defaultAlbumImage
                                                : album.photos[0].image_url
                                        }
                                        onError={e => (
                                            (e.target.onerror = null),
                                            (e.target.src = defaultImage)
                                        )}
                                        className="individual-photo"
                                    />
                                    <div id="albums-text">
                                        <p>{album.title}</p>
                                        <p>
                                            {album.photos.length === 0
                                                ? "Empty Album"
                                                : album.photos.length === 1
                                                ? `1 Photo`
                                                : `${album.photos.length} Photos`}
                                        </p>
                                    </div>
                                    <i
                                        id="albums-trash"
                                        class="fas fa-trash-alt cursor-pointer"
                                        onClick={e => {
                                            e.preventDefault();
                                            dispatch(deleteAlbum(album.id));
                                        }}
                                    ></i>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlbumsPage;

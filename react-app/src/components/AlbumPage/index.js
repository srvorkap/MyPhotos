import { useEffect, useState } from "react";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPhotos } from "../../store/photo";
import { getAlbums } from "../../store/album";
import defaultAlbumImage from "../../assets/default-album-image.jpeg";
import { deleteAlbum } from "../../store/album";
import "./AlbumPage.css";

const AlbumPage = ({ sessionUser }) => {
    const [isActive, setIsActive] = useState(false);
    const { albumId } = useParams();
    const albumIdNumerical = +albumId;

    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let currentAlbum;
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj);
        currentAlbum = allAlbumsArr?.find(
            album => album?.id === albumIdNumerical
        );
    }

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let currentAlbumPhotos;
    let currentAlbumPhotosLength;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        currentAlbumPhotos = allPhotosArr?.filter(
            photo => photo?.album_id === albumIdNumerical
        );
        currentAlbumPhotosLength = currentAlbumPhotos?.length;
    }

    currentAlbumPhotos?.reverse();

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onEdit = e => {
        e.preventDefault();
        history.push(`/albums/${currentAlbum.id}/edit`);
    };

    const onDelete = e => {
        e.preventDefault();
        dispatch(deleteAlbum(currentAlbum?.id));
        history?.push("/albums");
    };

    const onBack = e => {
        e.preventDefault();
        history?.push("/albums");
    };

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div id="album-page">
            <div onClick={onBack} className="back">
                <i class="fas fa-arrow-left"></i>Back to albums list
            </div>
            {currentAlbumPhotos && (
                <div id="album-background-image">
                    {currentAlbumPhotos?.length > 0 ? (
                        <div id="image-itself"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0) -10%, rgba(0,0,0,0.6)),url(${
                                    currentAlbumPhotos[
                                        currentAlbumPhotosLength - 1
                                    ]?.image_url
                                })`,
                            }}
                            className="srkica"
                        >
                            {/* backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)), url(${currentBusiness?.imageURL})`, */}
                            <i
                                class="fas fa-pen cursor-pointer"
                                id="edit-pen"
                                onClick={onEdit}
                            ></i>
                            <h1 id="album-title">{currentAlbum?.title}</h1>
                            <p id="album-description">
                                {currentAlbum?.description}
                            </p>
                            <p>
                                {currentAlbumPhotosLength === 0
                                    ? `no photos`
                                    : currentAlbumPhotosLength === 1
                                    ? `1 photo`
                                    : `${currentAlbumPhotosLength} photos`}
                            </p>

                            {/* <i
                                class="fas fa-trash-alt cursor-pointer"
                                onClick={onDelete}
                            ></i> */}
                        </div>
                    ) : (
                        <div id="image-itself"
                            style={{
                                backgroundImage: `url(${defaultAlbumImage})`,
                            }}
                            className="srkica"
                        >
                            <i
                                class="fas fa-pen cursor-pointer"
                                id="edit-pen"
                                onClick={onEdit}
                            ></i>
                            <h1 id="album-title">{currentAlbum?.title}</h1>
                            <p id="album-description">
                                {currentAlbum?.description}
                            </p>
                            <p>
                                {currentAlbumPhotosLength === 0
                                    ? `no photos`
                                    : currentAlbumPhotosLength === 1
                                    ? `1 photo`
                                    : `${currentAlbumPhotosLength} photos`}
                            </p>

                            {/* <i
                                class="fas fa-trash-alt cursor-pointer"
                                onClick={onDelete}
                            ></i> */}
                        </div>
                    )}
                </div>
            )}
            <div className="albums-photos-container">
                {currentAlbumPhotos?.map(photo => (
                    <div>
                        <NavLink to={`/photos/${photo?.id}`}>
                            {/* <div>{photo?.title}</div>
                            <img src={photo?.image_url} /> */}
                            <div
                                style={{
                                    backgroundImage: `url(${photo?.image_url})`,
                                }}
                                className="individual-photo"
                                onMouseEnter={() => setIsActive(true)}
                                onMouseLeave={() => setIsActive(false)}
                            >
                                {isActive && (
                                    <>
                                        <p>{photo?.title}</p>
                                        <p>
                                            {photo?.user_id === sessionUser?.id
                                                ? "by YOU!"
                                                : `by ${photo?.user_id?.username}`}
                                        </p>
                                    </>
                                )}
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumPage;

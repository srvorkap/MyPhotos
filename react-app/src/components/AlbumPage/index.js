import { useEffect, useState } from "react";
import { NavLink, Redirect, useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPhotos } from "../../store/photo";
import { getAlbums } from "../../store/album";
import defaultAlbumImage from "../../assets/default-album-image.jpeg";
import { deleteAlbum } from "../../store/album";
import "./AlbumPage.css";
import defaultImage from "../../assets/404-error.png";

const AlbumPage = (props) => {
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
        console.log('allPhotosArr', allPhotosArr)
        currentAlbumPhotos = allPhotosArr?.filter(
            photo => photo?.album_ids.includes(albumIdNumerical)
        );
        currentAlbumPhotosLength = currentAlbumPhotos?.length;
    }

    currentAlbumPhotos?.reverse();

    const dispatch = useDispatch();
    const history = useHistory();

    const albumLocation = useLocation()

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

    if (!props.sessionUser) return <Redirect to="/login" />;
    return (
        <div id="album-page">
            <div onClick={onBack} className="back" id="go-back-srki">
                <i class="fas fa-arrow-left"></i>Back to albums list
            </div>
            {currentAlbumPhotos && (
                <div id="album-background-image">
                    {currentAlbumPhotos?.length > 0 ? (
                        <div className="aq">
                            <div id="album-header-gradient"></div>
                            <img
                                src={
                                    currentAlbumPhotos[
                                        currentAlbumPhotosLength - 1
                                    ]?.image_url
                                }
                                onError={e => (
                                    (e.target.onerror = null),
                                    (e.target.src = defaultImage)
                                )}
                                id="image-itself"
                                className="srkica"
                            />
                            <div id="mukica">
                                <h1 id="album-title">{currentAlbum?.title}</h1>
                                <p id="album-description">
                                    {currentAlbum?.description}
                                </p>
                            </div>
                            <span className="pen-size">
                                <i
                                    class="fas fa-pen cursor-pointer"
                                    id="edit-pen"
                                    onClick={onEdit}
                                ></i>
                            </span>
                            <h2 id="album-number-of-photos">
                                {currentAlbumPhotosLength === 0
                                    ? `no photos`
                                    : currentAlbumPhotosLength === 1
                                    ? `1 photo`
                                    : `${currentAlbumPhotosLength} photos`}
                            </h2>
                        </div>
                    ) : (
                        <div className="aq">
                            <div id="album-header-gradient"></div>
                            <img
                                src={defaultAlbumImage}
                                id="image-itself"
                                className="srkica"
                            />
                            <div id="mukica">
                                <h1 id="album-title">{currentAlbum?.title}</h1>
                                <p id="album-description">
                                    {currentAlbum?.description}
                                </p>
                            </div>
                            <span className="pen-size">
                                <i
                                    class="fas fa-pen cursor-pointer"
                                    id="edit-pen"
                                    onClick={onEdit}
                                ></i>
                            </span>
                            <h2 id="album-number-of-photos">
                                {currentAlbumPhotosLength === 0
                                    ? `no photos`
                                    : currentAlbumPhotosLength === 1
                                    ? `1 photo`
                                    : `${currentAlbumPhotosLength} photos`}
                            </h2>
                        </div>
                    )}
                </div>
            )}
            <div className="albums-photos-container">
                {currentAlbumPhotos?.map(photo => (
                    <div>
                        <NavLink to={`/photos/${photo?.id}`} onClick={() => props.changeLocation(albumLocation)}>
                            <div id="album-individual-photo-container">
                                <div id="album-container-gradient"></div>
                                <img
                                    src={photo?.image_url}
                                    onError={e => (
                                        (e.target.onerror = null),
                                        (e.target.src = defaultImage)
                                    )}
                                    className="individual-photo"
                                />
                                <div id="album-container-text">
                                    <p>{photo?.title}</p>
                                    <p>
                                        {photo?.user_id === props?.sessionUser?.id
                                            ? "by YOU!"
                                            : `by ${photo?.user_id?.username}`}
                                    </p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumPage;

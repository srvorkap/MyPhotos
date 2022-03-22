import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photo";
import Cover from "../Cover";
import PhotoPage from "../PhotoPage";
import "./Photostream.css";
import { defaultImage } from "../../helper";

const Photostream = ({ sessionUser }) => {
    const [isActive, setIsActive] = useState(false);

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let sessionUserPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === sessionUser?.id
        );
    }

    sessionUserPhotos?.reverse();

    const dispatch = useDispatch();
    const history = useHistory();

    // const onMouseEnter = e => {
    //     e.preventDefault();
    //     setIsActive(true);
    // };

    // const onMouseLeave = e => {
    //     e.preventDefault();
    //     setIsActive(false);
    // };

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <div>
            <Cover sessionUser={sessionUser} />
            <div
                onClick={() => history.push("/photos/new")}
                id="create-new-photo"
                className="cursor-pointer"
            >
                <i class="fas fa-plus"></i>
                <div>New photo</div>
            </div>
            <div>
                <div className="albums-photos-container">
                    {sessionUserPhotos?.map(photo => (
                        <NavLink to={`/photos/${photo.id}`} key={photo.id}>
                            {/* <div id="image-text-container"> */}
                            <div className="individual-album-photo-container">
                                <div className="album-overlay"></div>
                                <img
                                    src={photo.image_url}
                                    onError={e => (
                                        (e.target.onerror = null),
                                        (e.target.src = defaultImage)
                                    )}
                                    // style={{
                                    //     // backgroundSize: 'cover',
                                    //     // background: 'black',
                                    //     backgroundImage: `url(${photo.image_url})`,
                                    // }}
                                    // className="individual-photo"
                                    className='photo-grid-image'
                                    // onMouseEnter={() => setIsActive(true)}
                                    // onMouseLeave={() => setIsActive(false)}
                                />
                                <div id="text-for-image">
                                    <p>{photo.title}</p>
                                    <p>
                                        {photo?.user_id === sessionUser?.id
                                            ? "by YOU!"
                                            : `by ${photo?.user_id.username}`}
                                    </p>
                                </div>
                                {/* {isActive && (
                                    <>
                                        <p>{photo.title}</p>
                                        <p>{photo?.user_id === sessionUser?.id ? 'by YOU!' : `by ${photo?.user_id.username}`}</p>
                                    </>
                                )} */}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Photostream;

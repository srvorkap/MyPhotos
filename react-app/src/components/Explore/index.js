import { Redirect, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../../store/photo";

const Explore = ({ sessionUser }) => {
    const [isActive, setIsActive] = useState(false);

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let otherUsersPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        otherUsersPhotos = allPhotosArr?.filter(
            photo => photo?.user_id !== sessionUser?.id
        );
    }

    otherUsersPhotos?.reverse()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const onMouseEnter = e => {
        e.preventDefault();
        setIsActive(true);
    };

    const onMouseLeave = e => {
        e.preventDefault();
        setIsActive(false);
    };

    if (!sessionUser) return <Redirect to='/login' />
    return (
        <div>
                <div className="albums-photos-container">
                    {otherUsersPhotos?.map(photo => (
                        <NavLink to={`/photos/${photo.id}`} key={photo.id}>
                            <div
                                style={{
                                    backgroundImage: `url(${photo.image_url})`,
                                }}
                                className="individual-photo"
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            >
                                {isActive && (
                                    <>
                                        <p>{photo.title}</p>
                                        <p>{photo?.user_id === sessionUser?.id ? 'by YOU!' : `by ${photo?.user.username}`}</p>
                                    </>
                                )}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
    );
}

export default Explore

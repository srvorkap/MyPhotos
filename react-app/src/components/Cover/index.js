import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import coverPhoto from '../../assets/cover-photo.jpeg'
import { getPhotos } from '../../store/photo';
import './Cover.css'

const Cover = ({ sessionUser }) => {
    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let sessionUserPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === sessionUser?.id
        );
    }

    let numberOfPhotos
    if (sessionUserPhotos?.length === 0) numberOfPhotos = null
    else if (sessionUserPhotos?.length === 1) numberOfPhotos = '1 Photo'
    else numberOfPhotos = `${sessionUserPhotos?.length} Photos`

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    return (
        <div style={{ backgroundImage: `url(${coverPhoto})` }}
        id="cover-background-image">
            <h1>{sessionUser?.username}</h1>
            <h2>{sessionUserPhotos?.length === 0 ? `no photos` : sessionUserPhotos?.length === 1 ? `1 photo` : `${sessionUserPhotos?.length} photos`}</h2>
        </div>
    )
}

export default Cover

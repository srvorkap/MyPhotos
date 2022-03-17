import { useParams, Redirect, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const PhotoPage = ({ sessionUser }) => {
    const { photoId } = useParams()
    const photoIdNumerical = +photoId

    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let currentPhoto;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        console.log(allPhotosArr);
        currentPhoto = allPhotosArr?.find(
            photo => photo?.id === photoIdNumerical
        );
    }

    const history = useHistory()

    const onBack = e => {
        e.preventDefault()
        history.push(`/albums/${currentPhoto.album_id}`)
    }

    if (!sessionUser) return <Redirect to='/' />
    return (
        <div>
            <div onClick={onBack}>Back to album</div>
            {currentPhoto && (
                <div>
                    <h1>{currentPhoto.title}</h1>
                    <img src={currentPhoto.image_url} />
                </div>)}
        </div>
    )
}

export default PhotoPage

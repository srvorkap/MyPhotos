import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { getAlbums } from '../../store/album'
import { getPhotos } from "../../store/photo";

const AlbumsPage = ({sessionUser}) => {
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    let sessionUserAlbums
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj)
        sessionUserAlbums = allAlbumsArr?.filter(album => album?.user_id === sessionUser?.id)
    }


    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getPhotos())
    // }, [dispatch])

    const onCreateAlbumForm = e => {
        e.preventDefault()
        history.push('/albums/new')
    }

    if (!sessionUser) return <Redirect to="/" />;
    return (
        <div>
            {sessionUserAlbums && sessionUserAlbums.map(album => (
                <NavLink to={`/albums/${album.id}`}>
                    {album.title}
                </NavLink>
            ))}
            <button onClick={onCreateAlbumForm}>Create new album</button>
        </div>

    )
}

export default AlbumsPage

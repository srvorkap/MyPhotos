import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Redirect } from "react-router-dom";
import { getCurrentUserAlbums } from '../../store/album'

const AlbumsPage = ({sessionUser}) => {
    // const sessionUser = useSelector(state => state?.session?.user);
    const allAlbumsObj = useSelector(store => store?.album?.albums);
    console?.log(allAlbumsObj)
    // const albumsArr = Object?.values(allAlbumsObject)
    // console?.log(albumsArr)
    let sessionUserAlbums
    if (allAlbumsObj) {
        const allAlbumsArr = Object?.values(allAlbumsObj)
        // allAlbumsArr.filter(album => console.log(album))
        sessionUserAlbums = allAlbumsArr?.filter(album => album?.user_id === sessionUser?.id)
    }


    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getCurrentUserAlbums())
    }, [dispatch])

    const onCreateAlbumForm = e => {
        e.preventDefault()
        history.push('/albums/new')
    }

    if (!sessionUser) return <Redirect to="/" />;
    return (
        <div>
            {sessionUserAlbums && sessionUserAlbums.map(album => (
                <div>{album.title}</div>
            ))}
            <button onClick={onCreateAlbumForm}>Create new album</button>
        </div>

    )
}

export default AlbumsPage

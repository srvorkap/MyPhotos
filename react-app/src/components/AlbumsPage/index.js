import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUserAlbums } from '../../store/album'

const AlbumsPage = () => {
    const sessionUser = useSelector(state => state?.session?.user);
    const allAlbumsObject = useSelector(store => store?.album?.entries);
    const allAlbums = Object?.values(allAlbumsObject);
    const sessionUserAlbums = allAlbums?.filter(album => album?.user_id === sessionUser?.id)
    console.log('component', allAlbums)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUserAlbums())
    }, [dispatch])

    return <h1>srki</h1>
}

export default AlbumsPage

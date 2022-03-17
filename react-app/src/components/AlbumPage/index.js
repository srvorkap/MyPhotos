import { Redirect } from "react-router-dom"

const AlbumPage = ({sessionUser}) => {
    

    if (!sessionUser) return <Redirect to="/" />;
    return <h1>test</h1>
}

export default AlbumPage

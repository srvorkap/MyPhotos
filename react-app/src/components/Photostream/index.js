import { Redirect } from "react-router-dom"

const Photostream = ({ sessionUser }) => {
    if (!sessionUser) return <Redirect to='/login' />
    return <h1>Photostream</h1>
}

export default Photostream

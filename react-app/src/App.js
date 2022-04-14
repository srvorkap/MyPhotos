import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import AlbumsPage from "./components/AlbumsPage";
import AlbumPage from "./components/AlbumPage";
import CreateAlbumForm from "./components/CreateAlbumForm";
import EditAlbumForm from "./components/EditAlbumForm";
import PhotoPage from "./components/PhotoPage";
import CreatePhotoForm from "./components/CreatePhotoForm";
import EditPhotoForm from "./components/EditPhotoForm";
import Photostream from "./components/Photostream";
import Explore from "./components/Explore";
import PageNotFound from "./components/PageNotFound";
import AddToAlbums from "./components/AddToAlbums";

function App() {
    const sessionUser = useSelector(state => state?.session?.user);
    const [location, setLocation] = useState()
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            {/* <NavBar /> */}
            <Switch>
                <Route path="/" exact={true}>
                    <LandingPage sessionUser={sessionUser}/>
                </Route>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                {/* <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute> */}
                <Route path="/albums/new" exact={true}>
                    <CreateAlbumForm sessionUser={sessionUser} />
                </Route>
                <Route path="/albums/:albumId/edit" exact={true}>
                    <EditAlbumForm sessionUser={sessionUser} />
                </Route>
                <Route path="/albums" exact={true}>
                    <NavBar />
                    <AlbumsPage sessionUser={sessionUser} />
                </Route>
                <Route path="/albums/:albumId" exact={true}>
                    <NavBar />
                    <AlbumPage sessionUser={sessionUser} changeLocation={location => setLocation(location)}/>
                </Route>
                <Route path="/photostream" exact={true}>
                    <NavBar />
                    <Photostream sessionUser={sessionUser} changeLocation={location => setLocation(location)} />
                </Route>
                <Route path="/explore" exact={true}>
                    <NavBar />
                    <Explore sessionUser={sessionUser} changeLocation={location => setLocation(location)} />
                </Route>
                {/* <Route path="/albums/new">
                    <CreateAlbumForm sessionUser={sessionUser}/>
                </Route> */}
                <Route path="/photos/new" exact={true}>
                    <CreatePhotoForm sessionUser={sessionUser} />
                </Route>
                <Route path="/photos/:photoId" exact={true}>
                    <PhotoPage sessionUser={sessionUser} location={location}/>
                </Route>
                {/* <Route>
                    <AddToAlbums sessionUser={sessionUser} />
                </Route> */}
                <Route path="/photos/:photoId/edit" exact={true}>
                    <EditPhotoForm sessionUser={sessionUser} />
                </Route>
                {/* <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute> */}
                {/* <ProtectedRoute path="/" exact={true}>
                    <h1>My Home Page</h1>
                </ProtectedRoute> */}
                <Route>
                    <NavBar />
                    <PageNotFound sessionUser={sessionUser} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

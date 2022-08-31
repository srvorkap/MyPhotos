import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import AlbumPage from "./components/AlbumPage";
import CreateAlbumForm from "./components/CreateAlbumForm";
import EditAlbumForm from "./components/EditAlbumForm";
import PhotoPage from "./components/PhotoPage";
import CreatePhotoForm from "./components/CreatePhotoForm";
import EditPhotoForm from "./components/EditPhotoForm";
import PageNotFound from "./components/PageNotFound";

// import Photostream from "./components/Photostream";
const LazyPhotostream = React.lazy(() => import('./components/Photostream'))
// import AlbumsPage from "./components/AlbumsPage";
const LazyAlbumsPage = React.lazy(() => import('./components/AlbumsPage'))
// import Explore from "./components/Explore";
const LazyExplore = React.lazy(() => import('./components/Explore'))

function App() {
    const sessionUser = useSelector(state => state?.session?.user);
    console.log('aaaaaaaaaaa', sessionUser)
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
                <Route path="/albums/new" exact={true}>
                    <CreateAlbumForm sessionUser={sessionUser} />
                </Route>
                <Route path="/albums/:albumId/edit" exact={true}>
                    <EditAlbumForm sessionUser={sessionUser} />
                </Route>
                <Route path="/albums" exact={true}>
                    <NavBar />
                    <Suspense fallback='Loading...'>
                       <LazyAlbumsPage sessionUser={sessionUser} />
                    </Suspense>
                </Route>
                <Route path="/albums/:albumId" exact={true}>
                    <NavBar />
                    <AlbumPage sessionUser={sessionUser} changeLocation={location => setLocation(location)}/>
                </Route>
                <Route path="/photostream" exact={true}>
                    {/* <NavBar /> */}
                    <Suspense fallback='Loading...'>
                        <LazyPhotostream sessionUser={sessionUser} changeLocation={location => setLocation(location)} />
                    </Suspense>
                </Route>
                <Route path="/explore" exact={true}>
                    <NavBar />
                    <React.Suspense fallback='Loading...'>
                        <LazyExplore sessionUser={sessionUser} changeLocation={location => setLocation(location)} />
                    </React.Suspense>
                </Route>
                <Route path="/photos/new" exact={true}>
                    <CreatePhotoForm sessionUser={sessionUser} />
                </Route>
                <Route path="/photos/:photoId" exact={true}>
                    <PhotoPage sessionUser={sessionUser} location={location}/>
                </Route>
                <Route path="/photos/:photoId/edit" exact={true}>
                    <EditPhotoForm sessionUser={sessionUser} />
                </Route>
                <Route>
                    <NavBar />
                    <PageNotFound sessionUser={sessionUser} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

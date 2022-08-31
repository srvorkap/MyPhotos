import React, { useState, useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import { authenticate } from "./store/session";
import AlbumPage from "./components/AlbumPage";
import CreateAlbumForm from "./components/CreateAlbumForm";
import EditAlbumForm from "./components/EditAlbumForm";
import PhotoPage from "./components/PhotoPage";
import CreatePhotoForm from "./components/CreatePhotoForm";
import EditPhotoForm from "./components/EditPhotoForm";
import PageNotFound from "./components/PageNotFound";
import Loading from "./components/Loading";

// Lazy Loading
// import LandingPage from "./components/LandingPage";
const LazyLandingPage = React.lazy(() => import('./components/LandingPage'))
const LazyNavBar = React.lazy(() => import('./components/NavBar'))
const LazyPhotostream = React.lazy(() => import('./components/Photostream'))
const LazyAlbumsPage = React.lazy(() => import('./components/AlbumsPage'))
const LazyExplore = React.lazy(() => import('./components/Explore'))

function App() {
    const sessionUser = useSelector(state => state?.session?.user);
    const [location, setLocation] = useState()
    // const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            // setLoaded(true);
        })();
    }, [dispatch]);

    // if (!loaded) {
    //     return <Loading />
    // }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true}>
                    <React.Suspense fallback={<Loading />}>
                        <LazyLandingPage sessionUser={sessionUser}/>
                    </React.Suspense>
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
                    <React.Suspense fallback={<Loading />}>
                        <LazyNavBar />
                       <LazyAlbumsPage sessionUser={sessionUser} />
                    </React.Suspense>
                </Route>
                <Route path="/albums/:albumId" exact={true}>
                    <React.Suspense fallback={<Loading/>}>
                        <LazyNavBar />
                        <AlbumPage sessionUser={sessionUser} changeLocation={location => setLocation(location)}/>
                    </React.Suspense>
                </Route>
                <Route path="/photostream" exact={true}>
                    <React.Suspense fallback={<Loading />}>
                        <LazyNavBar />
                        <LazyPhotostream sessionUser={sessionUser} changeLocation={location => setLocation(location)} />
                    </React.Suspense>
                </Route>
                <Route path="/explore" exact={true}>
                    <React.Suspense fallback={<Loading />}>
                        <LazyNavBar />
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
                    <React.Suspense fallback={<Loading />}>
                        <LazyNavBar />
                        <PageNotFound sessionUser={sessionUser} />
                    </React.Suspense>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import AlbumsPage from "./components/AlbumsPage";
import AlbumPage from "./components/AlbumPage";
import CreateAlbumForm from './components/CreateAlbumForm'

function App() {
    const sessionUser = useSelector(state => state?.session?.user);
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
            <NavBar />
            <Switch>
                <Route path="/" exact={true}>
                    <LandingPage />
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
                <Route path="/albums" exact={true}>
                    <AlbumsPage sessionUser={sessionUser}/>
                </Route>
                <Route path="/albums/:albumId" exact={true}>
                    <AlbumPage sessionUser={sessionUser}/>
                </Route>
                <Route path="/albums/new" exact={true}>
                    <CreateAlbumForm sessionUser={sessionUser}/>
                </Route>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path="/" exact={true}>
                    <h1>My Home Page</h1>
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

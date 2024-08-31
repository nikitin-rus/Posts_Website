import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, login } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { getUserFromLocalStorage } from "../../helpers/getUserFromLocalStorage";
import { Page } from "../../components/Page";

export function RootRoute() {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = getUserFromLocalStorage();
        const jwt = localStorage.getItem('jwt');

        if (user && jwt) {
            dispatch(login({ user: user, jwtToken: jwt }));
        }
    }, []);

    useEffect(() => {
        if (auth.jwtToken && auth.user) {
            localStorage.setItem('jwt', auth.jwtToken);
            localStorage.setItem('user', JSON.stringify(auth.user));
        } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
        }
    }, [auth]);

    return (
        <div className="root-route">
            <Navbar />
            <Page>
                <Outlet />
            </Page>
        </div>
    );
}
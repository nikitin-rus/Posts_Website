import { NavLink } from "react-router-dom";
import { authSelector, logout } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export function Navbar() {
    const auth = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    function handleLogout() {
        dispatch(logout())
    }

    return (
        <header className="navbar">
            <div className="navbar__content">
                <ul className="navbar__items">
                    <li className="navbar__item">
                        <NavLink to="/">Главная</NavLink>
                    </li>
                    {auth.user &&
                        <li className="navbar__item">
                            <NavLink to="/posts/new">Новый пост</NavLink>
                        </li>
                    }
                </ul>
                <ul className="navbar__items">
                    {auth.user ? (
                        <>
                            <li className="navbar__item">
                                <NavLink to={`/users/${auth.user.id}`}>
                                    {auth.user.userName}
                                </NavLink>
                            </li>
                            <li className="navbar__item">
                                <p onPointerDown={handleLogout}>Выйти</p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar__item">
                                <NavLink to="/login">Вход</NavLink>
                            </li>
                            <li className="navbar__item">
                                <NavLink to="/register">Регистрация</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export function RootRoute() {
    return (
        <div className="root-route">
            <Navbar />
            <Outlet />
        </div>
    );
}
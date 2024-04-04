import { Toaster } from "sonner";
import Sidebar from "../Sidebar";
import { Outlet } from 'react-router-dom';
import userStore from "../../store/userStore";
import { useEffect } from "react";


const MainLayout = () => {

    const { user, userProfile } = userStore()

    // get profile data
    useEffect(() => {
        (async () => {
            if (user?.role == 11) {
                await userProfile()
            }
        })()

    }, [user])

    return (
        <section className="w-100 min-h-screen flex">

            {/* side bar */}
            <div><Sidebar /></div>

            {/* children */}
            <div className="flex-grow">
                <Outlet />
            </div>

            <Toaster visibleToasts={5} richColors={true} closeButton={true} />
        </section>
    );
};

export default MainLayout;
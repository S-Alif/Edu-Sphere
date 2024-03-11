import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Toaster } from "sonner";
import basicStore from "../../store/basicStore";
import { useEffect } from "react";


const MainLayout = () => {

    const { getSubjects, fetchClass } = basicStore()
    useEffect(() => {

        (async () => {
            await getSubjects()
            await fetchClass()
        })()

    }, [])

    return (
        <>
            <Navbar />
                <Outlet />
                <Toaster visibleToasts={5} richColors={true} closeButton={true} />
            <Footer />
        </>
    );
};

export default MainLayout;
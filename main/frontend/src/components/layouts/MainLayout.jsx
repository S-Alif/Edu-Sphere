import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Toaster } from "sonner";


const MainLayout = () => {
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
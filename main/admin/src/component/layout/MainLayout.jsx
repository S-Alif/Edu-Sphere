import { Toaster } from "sonner";
import Sidebar from "../Sidebar";
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
    return (
        <section className="w-100 min-h-screen flex gap-3">

            {/* side bar */}
            <div><Sidebar /></div>
            
            {/* children */}
            <div>
                <Outlet />
            </div>

            <Toaster visibleToasts={5} richColors={true} closeButton={true} />
        </section>
    );
};

export default MainLayout;
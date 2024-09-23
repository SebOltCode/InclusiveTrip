import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import { AuthProvider } from "./AuthContext";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <Header />
                <div className="flex-grow container mx-auto py-4">
                    <Outlet />
                </div>
                <Footer />
            </AuthProvider>
        </div>
    );
};

export default MainLayout;
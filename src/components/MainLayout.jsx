import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthProvider } from "./AuthContext"; 

const MainLayout = () => {
  return (
    
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow container mx-auto py-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    
  );
};

export default MainLayout;
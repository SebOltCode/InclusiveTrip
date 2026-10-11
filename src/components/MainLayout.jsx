import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthProvider } from "./AuthContext";

const MainLayout = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
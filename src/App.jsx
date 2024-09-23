import { useContext, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Ratings from "./components/Ratings";
import CreateRating from "./components/CreateRating";
import User from "./components/User";
import Footer from "./components/Footer";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import Signup from "./components/Signup";
import MainLayout from "./components/MainLayout";
import Map from "./components/Map";
import Impressum from "./components/Impressum";
import Dataprotection from "./components/Dataprotection";
import Aboutus from "./components/Aboutus";
import DetailReview from "./components/DetailReview";
import ReviewEdit from "./components/ReviewEdit";

const Protected = () => {
  const { userInfo, loading } = useContext(AuthContext);
  return <>{userInfo ? <Outlet /> : <Navigate to="/login" />}</>;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="ratings" element={<Ratings />} />
      <Route path="impressum" element={<Impressum />} />
      <Route path="detailreview" element={<DetailReview />} />
      <Route path="/review-edit/:id" element={<ReviewEdit />} />
      <Route path="datenschutz" element={<Dataprotection />} />
      <Route path="ueberuns" element={<Aboutus />} />
      <Route path="map" element={<Map />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected />}>
        <Route path="create" element={<CreateRating />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

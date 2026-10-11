import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Home from "./components/Home";
import Ratings from "./components/Ratings";
import CreateRating from "./components/CreateRating";
import User from "./components/User";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import MainLayout from "./components/MainLayout";
import Map from "./components/Map";
import Impressum from "./components/Impressum";
import Dataprotection from "./components/Dataprotection";
import Aboutus from "./components/Aboutus";
import DetailReview from "./components/DetailReview";
import ReviewEdit from "./components/ReviewEdit";
import Loading from "./components/Loading";
import { AuthContext } from "./components/AuthContext";

const ProtectedRoute = () => {
  const { userInfo, authLoading } = useContext(AuthContext);
  const location = useLocation();
  if (authLoading) {
    return <Loading />;
  }
  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="ratings/:placeId" element={<Ratings />} />
      <Route path="impressum" element={<Impressum />} />
      <Route path="detailreview/:reviewId" element={<DetailReview />} />
      <Route path="datenschutz" element={<Dataprotection />} />
      <Route path="ueberuns" element={<Aboutus />} />
      <Route path="map" element={<Map />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="create/:placeId" element={<CreateRating />} />
        <Route path="review-edit/:reviewId" element={<ReviewEdit />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;

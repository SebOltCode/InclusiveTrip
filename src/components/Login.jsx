import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

export default function Login() {
  const { login, userInfo } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(-1);
    }
  }, [userInfo, navigate]);

  function handleChange(e) {
    setError(false);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    if (!loginData.email || !loginData.password) {
      setError(true);
      return;
    }
    try {
      await login(loginData);
     
   
    } catch (error) {
      setError(true);
      console.error("Login failed:", error);
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleForgotPasswordChange(e) {
    setForgotPasswordEmail(e.target.value);
  }

  function handleForgotPasswordSubmit() {
    toast.success(
      "Eine E-Mail zur Passwort-Zurücksetzung wurde gesendet. Bitte überprüfen Sie Ihr Postfach."
    );
    closeModal();
  }

  return (
    <div className="text-lg">
      <ToastContainer />
      {userInfo ? (
        <Navigate to="/map" />
      ) : (
        <div className="flex flex-col items-top p-4">
          <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
            {/* Flex Container für Text und Bild */}
            <div className="flex flex-col md:flex-row w-full p-8">
              {/* Text Container */}
              <div className="flex flex-col w-full md:w-2/3 text-left">
                <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                  Login
                </h1>
                <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                  Logge dich ein, um Bewertungen abgeben zu können und dein
                  Profil zu verwalten.
                </div>
              </div>
              {/* Bild Container */}
              <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
                <img
                  src="/images//Icon_Login.png"
                  alt="Icon Karte"
                  className="object-cover rounded-lg"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center py-16 rounded-2xl">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                className="grow"
                placeholder="Email"
                value={loginData.email}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                name="password"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                type="password"
                className="grow"
                value={loginData.password}
                placeholder="Passwort"
              />
            </label>
            <button
              onClick={handleLogin}
              className="btn bg-yellow-400 border-black px-24 font-normal"
            >
              Login
            </button>

            <a
              onClick={openModal}
              className="w-40 h-6 text-base font-normal leading-6 underline text-black cursor-pointer"
            >
              Passwort vergessen?
            </a>

            <a
              href="signup"
              className="w-40 h-6 text-base font-normal leading-6 underline text-black"
            >
              Noch keinen Account?
            </a>

            {error && (
              <div
                role="alert"
                className="alert alert-warning flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Alle Felder erforderlich</span>
              </div>
            )}

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Passwort vergessen"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
              overlayClassName="bg-[rgba(59,130,246,0.5)] fixed inset-0"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              ariaHideApp={false}
            >
              <h2 className="text-2xl mb-4">Passwort vergessen</h2>
              <label className="input input-bordered flex items-center gap-2 mb-4">
                <input
                  name="forgotPasswordEmail"
                  onChange={handleForgotPasswordChange}
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={forgotPasswordEmail}
                />
              </label>
              <button
                onClick={handleForgotPasswordSubmit}
                className="btn bg-yellow-400 border-black px-8 font-normal"
              >
                Passwort zurück setzen
              </button>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
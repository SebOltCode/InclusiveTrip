import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm() {
  const { signup, userInfo } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.firstName ||
      !signupData.lastName
    ) {
      setError(true);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwörter stimmen nicht überein!");
      return;
    }

    if (signupData.password.length < 8) {
      toast.error("Passwort muss mindestens 8 Zeichen lang sein!");
      return;
    }

    const { confirmPassword, ...dataToSubmit } = signupData;

    try {
      await signup(dataToSubmit);
      toast.success("Registrierung erfolgreich!");
    } catch (error) {
      toast.error("Registrierung fehlgeschlagen!");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setError(false);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <ToastContainer />
      {userInfo ? (
        <Navigate to="/" />
      ) : (
        <div>
          <div className="flex flex-col md:flex-row items-top p-4">
            <div className="flex flex-col md:flex-row"></div>
            <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative">
              <div className="flex flex-col md:flex-row w-full p-8">
                <div className="flex flex-col w-full md:w-2/3 text-left">
                  <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                    Registrierung
                  </h1>
                  <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                    Lege dir ein Profil an, um <br />
                    Bewertungen abgeben zu können
                  </div>
                </div>
                {/* Bild Container */}
                <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
                  <img
                    src="/images//Icon_Signup.png"
                    alt="Icon Karte"
                    className="max-w-full max-h-[300px] object-cover rounded-lg"
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-3xl">
            <form action="submit" onSubmit={handleSubmit}>

              <div className="flex flex-col py-12  gap-3 max-w-[20rem]  m-auto">
                <label className="input input-bordered flex items-center gap-2 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>

                  <input onChange={handleChange} value={signupData.email} type="text" name="email"
                    className="grow" placeholder="Email" />




                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 2a2.5 2.5 0 0 1 5 0v1h.5A1.5 1.5 0 0 1 11.5 4v6a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 10V9h-1v1A1.5 1.5 0 0 1 2 11.5v.5A1.5 1.5 0 0 1 3.5 13H5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 1 13V4A2.5 2.5 0 0 1 3.5 1.5h1V2h-1A.5.5 0 0 0 3 2.5v8.5A.5.5 0 0 0 3.5 11H5v-1H3.5a.5.5 0 0 1-.5-.5v-8A.5.5 0 0 1 3.5 1h.5v1h-.5zM8 2v1H6V2a1 1 0 1 1 2 0zm2 2v7H6V4h4zM7 6a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input onChange={handleChange} value={signupData.firstName} type="text" name="firstName"
                    className="grow" placeholder="Vorname" />
                </label>

                <label onChange={handleChange} value={signupData.lastName}
                  className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      d="M8 0a4 4 0 0 1 4 4 4 4 0 0 1-4 4A4 4 0 0 1 4 4 4 4 0 0 1 8 0zm0 1.5A2.5 2.5 0 0 0 5.5 4 2.5 2.5 0 0 0 8 6.5 2.5 2.5 0 0 0 10.5 4 2.5 2.5 0 0 0 8 1.5zM1 14a6 6 0 0 1 12 0H1z"
                    />
                  </svg>
                  <input type="text" name="lastName" className="grow" placeholder="Nachname" />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
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
                  <input onChange={handleChange} value={signupData.password}
                    type="password" name="password" className="grow" placeholder="Passwort"


                  />

                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">

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
                  <input onChange={handleChange} value={signupData.confirmPassword}
                    type="password" name="confirmPassword" className="grow" placeholder="Passwort bestätigen"
                  />
                </label>



                <button type="submit" className="btn bg-yellow-400 border-black px-8 font-normal ">
                  speichern
                </button>
                {error && (
                  <div role="alert" className="alert alert-warning text-base ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current "
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
                    <span>All fields are required</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

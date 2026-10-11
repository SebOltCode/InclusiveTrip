import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { login, userInfo } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // After login, return to the page that required the login (if any)
  const from = location.state?.from;
  const redirectTarget = from ? `${from.pathname}${from.search || ""}` : "/map";

  function handleChange(e) {
    setError(false);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError(true);
      return;
    }
    const success = await login(loginData);
    if (success) {
      navigate(redirectTarget, { replace: true });
    }
  }

  if (userInfo) {
    return <Navigate to={redirectTarget} replace />;
  }

  return (
    <div className="text-lg">
      <div className="flex flex-col items-top p-4">
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-4 sm:p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {t("loginpage.title")}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                {t("loginpage.subtitle")}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_Login.png"
                alt={t("loginpage.icon_alt")}
                className="object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="max-w-2xl mx-auto flex flex-col gap-6 items-center py-16 rounded-2xl"
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              autoComplete="email"
              className="grow"
              placeholder={t("loginpage.email_placeholder")}
              aria-label={t("loginpage.email_placeholder")}
              value={loginData.email}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
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
              type="password"
              autoComplete="current-password"
              className="grow"
              value={loginData.password}
              placeholder={t("loginpage.password_placeholder")}
              aria-label={t("loginpage.password_placeholder")}
            />
          </label>
          <button
            type="submit"
            className="btn bg-yellow-400 border-black px-24 font-normal"
          >
            {t("loginpage.login_button")}
          </button>

          <Link
            to="/signup"
            className="w-40 h-6 text-base font-normal leading-6 underline text-black"
          >
            {t("loginpage.no_account")}
          </Link>

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
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{t("loginpage.all_fields_required")}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

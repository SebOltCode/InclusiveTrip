import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PageNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                {t("notFound.title")}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                {t("notFound.message")}
              </div>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images/Icon_404.png"
                alt=""
                className="max-w-full max-h-[300px] object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="m-4 btn bg-yellow-400 border-black px-8 font-normal"
        onClick={() => navigate(-1)}
      >
        {t("notFound.back")}
      </button>
    </div>
  );
}

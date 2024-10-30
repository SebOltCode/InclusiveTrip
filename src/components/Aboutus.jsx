import React from "react";
import { useTranslation } from "react-i18next";

const Aboutus = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-left">{t("about_us")}</h1>

      <p className="text-gray-700 leading-relaxed mb-6">{t("about_us_1")}</p>

      <h2 className="text-2xl font-semibold mb-4">{t("our_vision")}</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{t("about_us_2")}</p>

      <h2 className="text-2xl font-semibold mb-4">{t("our_mission")}</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{t("about_us_3")}</p>

      <h2 className="text-2xl font-semibold mb-4">{t("about_us_4")}</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{t("about_us_5")}</p>

      <p className="text-gray-700 leading-relaxed mb-6">{t("about_us_6")}</p>

      <h2 className="text-2xl font-semibold mb-4">{t("our_team")}</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{t("about_us_7")}</p>

      <div className="flex flex-wrap justify-center space-x-6">
        <div className="text-center mb-6">
          <img
            src="/images//Photosebastian.jpeg"
            alt="Sebastian"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <p className="text-gray-700 font-semibold">{t("sebastian")}</p>
        </div>
        <div className="text-center mb-6">
          <img
            src="/images//Photoadnan.jpeg"
            alt="Adnan"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <p className="text-gray-700 font-semibold">{t("adnan")}</p>
        </div>
        <div className="text-center mb-6">
          <img
            src="/images//Photoahmed.jpeg"
            alt="Ahmed"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <p className="text-gray-700 font-semibold">{t("ahmed")}</p>
        </div>
        <div className="text-center mb-6">
          <img
            src="/images//Photojulia.jpeg"
            alt="Julia"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <p className="text-gray-700 font-semibold">{t("julia")}</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{t("about_us_8")}</p>

      <p className="text-gray-700 leading-relaxed mt-6">{t("about_us_9")}</p>
    </div>
  );
};

export default Aboutus;

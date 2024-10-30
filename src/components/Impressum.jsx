import React from "react";
import { useTranslation } from "react-i18next";

const Impressum = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{t("impressum.title")}</h1>
      <p className="text-gray-700 leading-relaxed">
        <strong>{t("impressum.section1.title")}</strong>
        <br />
        {t("impressum.section1.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("impressum.section2.title")}</strong>
        <br />
        <span
          dangerouslySetInnerHTML={{ __html: t("impressum.section2.content") }}
        />
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("impressum.section3.title")}</strong>
        <br />
        <span
          dangerouslySetInnerHTML={{ __html: t("impressum.section3.content") }}
        />
      </p>

      <h2 className="text-2xl font-semibold mt-6">
        {t("impressum.section4.title")}
      </h2>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("impressum.section4.content1.title")}</strong>
        <br />
        {t("impressum.section4.content1.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("impressum.section4.content2")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("impressum.section4.content3.title")}</strong>
        <br />
        {t("impressum.section4.content3.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("impressum.section4.content4")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("impressum.section4.content5.title")}</strong>
        <br />
        {t("impressum.section4.content5.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("impressum.section4.content6")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("impressum.section4.content7.title")}</strong>
        <br />
        {t("impressum.section4.content7.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("impressum.section4.content8")}
      </p>
    </div>
  );
};

export default Impressum;

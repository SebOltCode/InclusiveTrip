import React from "react";
import { useTranslation } from "react-i18next";

const Dataprotection = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{t("dataprotection.title")}</h1>
      <p className="text-gray-700 leading-relaxed">
        <strong>{t("dataprotection.section1.title")}</strong>
        <br />
        {t("dataprotection.section1.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section2.title")}</strong>
        <br />
        {t("dataprotection.section2.content")}
        <br />
        Sebastian Olthoff{" "}
        <a
          href="mailto:sebastian-olthoff@gmx.de"
          className="text-blue-500 hover:underline"
        >
          sebastian-olthoff@gmx.de
        </a>
        <br />
        Adnan Abdalrahmen{" "}
        <a
          href="mailto:adnan.24150@gmail.com"
          className="text-blue-500 hover:underline"
        >
          adnan.24150@gmail.com
        </a>
        <br />
        Ahmed Mohamad{" "}
        <a
          href="mailto:rashin2604@gmail.com"
          className="text-blue-500 hover:underline"
        >
          rashin2604@gmail.com
        </a>
        <br />
        Julia Löw{" "}
        <a
          href="mailto:julia.loew@gmx.net"
          className="text-blue-500 hover:underline"
        >
          julia.loew@gmx.net
        </a>
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section3.title")}</strong>
        <br />
        <strong>{t("dataprotection.section3.subtitle1")}</strong>
        <br />
        {t("dataprotection.section3.content1")}
      </p>

      <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4">
        {t("dataprotection.section3.list1", { returnObjects: true }).map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("dataprotection.section3.content2")}
      </p>

      <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4">
        {t("dataprotection.section3.list2", { returnObjects: true }).map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("dataprotection.section3.content3")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section3.subtitle2")}</strong>
        <br />
        {t("dataprotection.section3.content4")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        {t("dataprotection.section3.content5")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section4.title")}</strong>
        <br />
        {t("dataprotection.section4.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section5.title")}</strong>
        <br />
        {t("dataprotection.section5.content")}
      </p>

      <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4">
        {t("dataprotection.section5.list", { returnObjects: true }).map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section6.title")}</strong>
        <br />
        {t("dataprotection.section6.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section7.title")}</strong>
        <br />
        {t("dataprotection.section7.content")}
      </p>

      <p className="text-gray-700 leading-relaxed mt-4">
        <strong>{t("dataprotection.section8.title")}</strong>
        <br />
        {t("dataprotection.section8.content")}
      </p>
    </div>
  );
};

export default Dataprotection;

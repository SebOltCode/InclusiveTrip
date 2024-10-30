import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#C1DCDC] text-[rgba(30,30,30,0.5)] py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <aside className="flex items-center space-x-4">
          <img
            className="w-[206px] h-[44px]"
            src="/images/Logo.png"
            alt="Logo"
          />
          <p>{t("footer.copyright", { year: currentYear })}</p>
        </aside>
        <nav className="flex flex-wrap space-x-4 mt-4 md:mt-0">
          <Link to="/impressum" className="text-black hover:underline">
            {t("footer.impressum")}
          </Link>
          <Link to="/datenschutz" className="text-black hover:underline">
            {t("footer.datenschutz")}
          </Link>
          <Link to="/ueberuns" className="text-black hover:underline">
            {t("footer.ueberuns")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

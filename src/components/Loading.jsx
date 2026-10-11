import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center p-16" role="status">
      <span className="loading loading-spinner loading-lg" aria-hidden="true"></span>
      <span className="sr-only">{t("common.loading")}</span>
    </div>
  );
}

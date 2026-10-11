import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../utils/api";

// Shows a number from an endpoint that returns { count }
export default function CountDisplay({ url }) {
  const { t } = useTranslation();
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(url)
      .then((response) => setCount(response.data.count))
      .catch((err) => {
        console.error(`Error loading ${url}:`, err);
        setError(true);
      });
  }, [url]);

  if (error) return <p>–</p>;
  if (count === null) return <p>{t("common.loading")}</p>;
  return <p>{count}</p>;
}

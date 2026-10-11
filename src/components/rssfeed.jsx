import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../utils/api";

// The feed comes from a third party, so its HTML is never rendered; only its text is shown
const htmlToText = (html) =>
  new DOMParser().parseFromString(html || "", "text/html").body.textContent?.trim() || "";

const isSafeLink = (url) => /^https?:\/\//i.test(url || "");

export default function RssFeed() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    api
      .get("/rss/rss-feed")
      .then((response) => setItems(response.data.feed))
      .catch((err) => {
        console.error("Error loading RSS feed:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) return <p className="text-center text-blue-500">{t("common.loading")}</p>;
  if (error) return <p className="text-center text-red-500">{t("rssfeed.error")}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{t("rssfeed.title")}</h2>
      <div className="overflow-y-auto max-h-96 sm:max-h-full">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={item.link || index} className="p-4 bg-white shadow-md rounded">
              <button
                type="button"
                className="text-blue-600 hover:underline text-left"
                onClick={() => toggleExpand(index)}
                aria-expanded={!!expandedItems[index]}
              >
                <h3 className="text-lg font-semibold">{htmlToText(item.title)}</h3>
              </button>
              <p className={`text-gray-600 ${expandedItems[index] ? "" : "line-clamp-2"}`}>
                {htmlToText(item.description)}
              </p>
              {expandedItems[index] && (
                <>
                  <small className="text-gray-500">
                    {new Date(item.pubDate).toLocaleString()}
                  </small>
                  {isSafeLink(item.link) && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline block mt-2"
                    >
                      {t("rssfeed.read_more")}
                    </a>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

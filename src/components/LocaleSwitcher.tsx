import { useTranslations } from "next-intl";
import { Link, usePathname } from "../navigation";
import locales from "./locales.json";

export default function LocaleSwitcher() {
  // Specify "LocaleSwitcher" as the namespace for translations
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Object.entries(locales).map(([lang, { emoji }]) => (
        <div key={lang} className="flex">
          <Link href={pathname} locale={lang as "en" | "de" | "cn" | "ar" | "dk" | "es" | "fi" | "fr" | "it" | "jp" | "kr" | "nl" | "no" | "pl" | "pt" | "ru" | "se" | "th" | "vn" | "tr" | undefined}>
            <span className="flex items-center space-x-1">
              {emoji}
              {/* Use the specific key within the "LocaleSwitcher" namespace */}
              <span>{t("switchLocale", { locale: lang })}</span>
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
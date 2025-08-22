import es from "./es.json";
import en from "./en.json";

export type Lang = "es" | "en";
export type Dict = typeof es;

const DICTS: Record<Lang, Dict> = { es, en };

// Países donde se prefiere español
const SPANISH_COUNTRIES = [
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "SV",
  "GQ",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PY",
  "PE",
  "PR",
  "ES",
  "UY",
  "VE",
];

export function detectLang({
  country,
  acceptLanguage,
  cookieLang,
}: {
  country?: string;
  acceptLanguage?: string;
  cookieLang?: string;
}): Lang {
  if (
    typeof cookieLang === "string" &&
    (cookieLang === "es" || cookieLang === "en")
  ) {
    return cookieLang as Lang;
  }
  if (typeof country === "string") {
    if (SPANISH_COUNTRIES.includes(country)) {
      return "es";
    }
    if (country === "US") {
      return "en";
    }
  }
  if (typeof acceptLanguage === "string") {
    const lang = acceptLanguage.toLowerCase();
    if (lang.startsWith("es")) {
      return "es";
    }
    if (lang.startsWith("en")) {
      return "en";
    }
  }
  return "es"; // fallback
}

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}

// Helper para interpolar variables en traducciones
export function t(
  dict: Dict,
  path: string,
  vars?: Record<string, string | number>
): string {
  const keys = path.split(".");
  let val: unknown = dict;
  for (const k of keys) {
    if (
      val !== null &&
      typeof val === "object" &&
      Object.prototype.hasOwnProperty.call(val, k)
    ) {
      val = (val as Record<string, unknown>)[k];
    } else {
      return path;
    }
  }
  if (typeof val !== "string") {
    return path;
  }
  let result = val;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      result = result.replace(`{${k}}`, String(v));
    });
  }
  return result;
}

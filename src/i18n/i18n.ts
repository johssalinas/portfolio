import es from './es.json';
import en from './en.json';

export type Lang = 'es' | 'en';
export type Dict = typeof es;

const DICTS: Record<Lang, Dict> = { es, en };

// Países donde se prefiere español
const SPANISH_COUNTRIES = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
];

export function detectLang({
  country,
  acceptLanguage,
  cookieLang
}: {
  country?: string;
  acceptLanguage?: string;
  cookieLang?: string;
}): Lang {
  if (cookieLang && (cookieLang === 'es' || cookieLang === 'en')) return cookieLang as Lang;
  if (country && SPANISH_COUNTRIES.includes(country)) return 'es';
  if (country && country === 'US') return 'en';
  if (acceptLanguage) {
    if (acceptLanguage.toLowerCase().startsWith('es')) return 'es';
    if (acceptLanguage.toLowerCase().startsWith('en')) return 'en';
  }
  return 'es'; // fallback
}

export function getDict(lang: Lang): Dict {
  return DICTS[lang] || DICTS['es'];
}

// Helper para interpolar variables en traducciones
export function t(
  dict: Dict,
  path: string,
  vars?: Record<string, string | number>
): string {
  const keys = path.split('.');
  let val: any = dict;
  for (const k of keys) val = val?.[k];
  if (typeof val !== 'string') return path;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      val = val.replace(`{${k}}`, String(v));
    });
  }
  return val;
}

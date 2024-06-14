import { useMatches } from "@remix-run/react";

export interface ILocaleData {
    selectedLocale: {
      pathPrefix: string;
      language: string;
    };
  }

export function usePrefixPathWithLocale(path: string) {
    const [root] = useMatches();
    const selectedLocale = (root.data as ILocaleData).selectedLocale;
  
    return selectedLocale
      ? `${selectedLocale.pathPrefix}${
          path.startsWith('/') ? path : '/' + path
        }`
      : path;
  }

export const useChoosePlaceholder = (lang: string) => {
  lang = lang.toLocaleLowerCase();
  switch (lang) {
    case 'ru':
      return 'Найти на BOOMYRANG';
    case 'fr':
      return 'Retrouvez sur BOOMYRANG';
    default:
      return 'Find on BOOMYRANG';
  }
}

export const useCartTitle = (lang: string) => {
  lang = lang.toLocaleLowerCase();
  switch (lang) {
    case 'ru':
      return 'Корзина';
    case 'fr':
      return 'Panier';
    default:
      return 'Cart';
  }
}

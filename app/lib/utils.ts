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

export const descriptionLocale: Record<string, string> = {
  "RU": "Характеристики",
  "FR": "Сaractéristiques",
  "EN": "Characteristics",
}

export const addToCart: Record<string, string> = {
  "RU": "В корзину",
  "FR": "Ajouter au panier",
  "EN": "Add to cart",
}

export const delieveryLocaleCart: Record<string, string> = {
  "RU": "Доставка",
  "FR": "Livraison",
  "EN": "Shipping",
}

export const totalLocaleCart: Record<string, string> = {
  "RU": "Итого",
  "FR": "Total",
  "EN": "Total",
}

export const orderLocaleCart: Record<string, string> = {
  "RU": "Заказать",
  "FR": "Commande",
  "EN": "Order",
}

export const availableCurrencys: string[] = ["USD", "EUR", "GEL", "RUB", "CNY", "JPY", "GBP", "AUD", "IDR"];

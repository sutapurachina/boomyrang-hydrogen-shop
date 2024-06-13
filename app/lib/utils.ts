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
  
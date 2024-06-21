import cls from '@/styles/header.module.css';
import {SearchInput} from './SearchInput';
import {CartSVG} from './svgComponents/cart';
import { Link } from './Link';
import { useMatches } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';
import { useCartTitle, type ILocaleData } from '@/lib/utils';
import { getCurrency } from '@/api/getCurrency';
import { CurrencyDropdown } from './CurrencyDropdown';
import AttitudeContext from './AttitudeContextProvider';
import { LanguageDropdown } from './LanguageDropdown';

export const HeaderNav = ({isLoggedIn, cart, localization}: any) => {
  const [currency, setCurrency] = useState<string>();
  const [root] = useMatches();
  const selectedLocale = (root.data as ILocaleData).selectedLocale;
  const cartTitle = useCartTitle(selectedLocale?.language);
  const attitudeCurrency = useContext(AttitudeContext);
  const chooseCurrency = (currencyNew: string) => {
    setCurrency(currencyNew);
  }
  useEffect(() => {
    const fetchCurrency = async () => {
      if (!currency) return;
      const curr = await getCurrency(currency);
      if (!curr) return;
      attitudeCurrency.setAttitude({
        value: curr,
        isoCode: currency,
      });
    };
    fetchCurrency();
  }, [currency, attitudeCurrency]);

  return (
    <nav className={cls.headerNav} role="navigation">
      <SearchInput language={selectedLocale?.language} />
      <LanguageDropdown localization={localization}/>
      <CurrencyDropdown chooseCurrency={chooseCurrency}/>
      <div className={cls.navCards}>
        <div className={cls.navCard}>
          <Link className={cls.navCardLink} to={'/cart'}>
            <CartSVG />
            <p className={cls.cardText}>{cartTitle}</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};


import cls from '@/styles/header.module.css';
import {SearchInput} from './SearchInput';
import {CartSVG} from './svgComponents/cart';
import { Link } from './Link';
import { Link as RemixLink, useMatches } from '@remix-run/react';
import { useState } from 'react';
import { ILocaleData } from '@/lib/utils';

export const HeaderNav = ({isLoggedIn, cart, localization}: any) => {
  const availableLanguages = localization?.localization.availableLanguages;
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [root] = useMatches();
  const selectedLocale = (root.data as ILocaleData).selectedLocale;
  const onOpenDropdown = () => {
    setLanguageOpen(!isLanguageOpen); 
  }

  return (
    <nav className={cls.headerNav} role="navigation">
      <SearchInput />
      <div className={cls['dropdown-languages']}>
          <button onClick={onOpenDropdown} className={cls['dropdown-trigger']}>
            {selectedLocale ? selectedLocale.language : 'EN' }
          </button>
          {isLanguageOpen && <ul className={cls['dropdown-menu']}>
            {availableLanguages?.map((language: {isoCode: string}) => (
              <a href={`/${language.isoCode}`} className={cls['dropdown-item']} key={language.isoCode}>
                  {language.isoCode}
              </a>
            ))}
          </ul>}
      </div>
      <div className={cls.navCards}>
        <div className={cls.navCard}>
          <Link className={cls.navCardLink} to={'/cart'}>
            <CartSVG />
            <p className={cls.cardText}>Корзина</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};


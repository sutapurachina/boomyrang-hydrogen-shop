import cls from '@/styles/header.module.css';
import {SearchInput} from './SearchInput';
import {CartSVG} from './svgComponents/cart';
import { Link } from './Link';
import { useMatches } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useCartTitle, type ILocaleData } from '@/lib/utils';

export const HeaderNav = ({isLoggedIn, cart, localization}: any) => {
  const availableLanguages = localization?.localization.availableLanguages;
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [root] = useMatches();
  const selectedLocale = (root.data as ILocaleData).selectedLocale;
  const cartTitle = useCartTitle(selectedLocale?.language);
  const onOpenDropdown = () => {
    setLanguageOpen(!isLanguageOpen); 
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      const dropdown = document.getElementById("dropdown-id");
      if (dropdown && !dropdown.contains(target)) {
        setLanguageOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className={cls.headerNav} role="navigation">
      <SearchInput language={selectedLocale?.language} />
      <div id='dropdown-id' className={cls['dropdown-languages']}>
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
            <p className={cls.cardText}>{cartTitle}</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};


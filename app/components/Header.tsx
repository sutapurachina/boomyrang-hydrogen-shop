import { Link } from './Link';
import logoMobile from '@/assets/icons/boomyrang.png';
import type {LayoutProps} from './Layout';
import cls from '@/styles/header.module.css';
import {HeaderCatalogue} from './HeaderCatalogue';
import {HeaderNav} from './HeaderNav';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn' | 'collections' | 'languages'>;

export const Header = ({header, collections, isLoggedIn, cart, languages}: HeaderProps) => {
  const {shop, menu} = header;
  let catalogueTitle = menu && menu.items.filter((item) => item.type === 'CATALOG').map((item) => item.title);
  if (!catalogueTitle) catalogueTitle=["Каталог"];

  return (
    <header className={cls.header}>
      <Link prefetch="intent" to="/">
        <img className={cls.logo} src={logoMobile} alt="logo" />
      </Link>
      <HeaderCatalogue title={catalogueTitle[0]} catalogue={collections} />
      <HeaderNav localization={languages} isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
};

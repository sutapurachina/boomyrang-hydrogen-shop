import {NavLink} from '@remix-run/react';
import logoMobile from '@/assets/icons/boomyrang.png';
import type {LayoutProps} from './Layout';
import cls from '@/styles/header.module.css';
import {HeaderCatalogue} from './HeaderCatalogue';
import {HeaderNav} from './HeaderNav';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn' | 'collections'>;

export const Header = ({header, collections, isLoggedIn, cart}: HeaderProps) => {
  const {shop, menu} = header;

  return (
    <header className={cls.header}>
      <NavLink prefetch="intent" to="/" end>
        <img className={cls.logo} src={logoMobile} alt="logo" />
      </NavLink>
      <HeaderCatalogue catalogue={collections} />
      <HeaderNav isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
};

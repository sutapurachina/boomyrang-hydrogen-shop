import {NavLink} from '@remix-run/react';
import logoUrl from '@/assets/icons/logo.png';
import type {LayoutProps} from './Layout';
import cls from '@/styles/header.module.css';
import {HeaderCatalogue} from './HeaderCatalogue';
import {HeaderNav} from './HeaderNav';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

export const Header = ({header, isLoggedIn, cart}: HeaderProps) => {
  const {shop, menu} = header;
  
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" end>
        <img className={cls.logo} src={logoUrl} alt={'logo'} />
      </NavLink>
      <HeaderCatalogue menu={menu} />
      <HeaderNav isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
};

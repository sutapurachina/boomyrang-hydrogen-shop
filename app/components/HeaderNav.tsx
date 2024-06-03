import cls from '@/styles/header.module.css';
import {SearchInput} from './SearchInput';
import {CartSVG} from './svgComponents/cart';
import { NavLink } from '@remix-run/react';

export const HeaderNav = ({isLoggedIn, cart}: any) => {
  return (
    <nav className={cls.headerNav} role="navigation">
      <SearchInput />
      <div className={cls.navCards}>
        <div className={cls.navCard}>
          <NavLink className={cls.navCardLink} to={'/cart'}>
            <CartSVG />
            <p className={cls.cardText}>Корзина</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

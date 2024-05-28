import cls from '@/styles/header.module.css';
import {SearchInput} from './SearchInput';
import {DelieverySVG} from './svgComponents/delievery';
import {FavouritesSVG} from './svgComponents/favourites';
import {ProfileSVG} from './svgComponents/profile';
import {CartSVG} from './svgComponents/cart';
import { NavLink, useLocation } from '@remix-run/react';

export const HeaderNav = ({isLoggedIn, cart}: any) => {
  const locale = useLocation();

  return (
    <nav className={cls.headerNav} role="navigation">
      <SearchInput />
      <div className={cls.navCards}>
        <div className={cls.navCard}>
          <DelieverySVG />
          <p className={cls.cardText}>Доставки</p>
        </div>

        <div className={cls.navCard}>
          <FavouritesSVG />
          <p className={cls.cardText}>Избранное</p>
        </div>

        <div className={cls.navCard}>
          <ProfileSVG />
          <p className={cls.cardText}>Профиль</p>
        </div>

        <div className={cls.navCard}>
          <CartSVG />
          <NavLink to={`${locale.pathname}cart`}>
            <p className={cls.cardText}>Корзина</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

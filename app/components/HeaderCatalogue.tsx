import cls from '@/styles/header.module.css';
import catalogueIcon from '@/assets/icons/catalogue.png';
import Collection from '@/routes/($locale).collections.all';

export const HeaderCatalogue = ({menu}: any) => {
  return (
    <div className={cls.catalogue}>
      <img src={catalogueIcon} alt="catalogue" />
      <Collection />
    </div>
  );
};

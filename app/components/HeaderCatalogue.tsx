import cls from '@/styles/header.module.css';
import catalogueIcon from '@/assets/icons/catalogue.png';

export const HeaderCatalogue = ({menu}: any) => {
  return (
    <div className={cls.catalogue}>
      <img src={catalogueIcon} alt="catalogue" />
      <p className={cls.catalogueText}>Каталог</p>
    </div>
  );
};

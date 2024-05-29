import cls from '@/styles/header.module.css';

export const SearchInput = () => {
  return (
    <div className={cls.searchWrapper}>
      <input
        className={cls.searchInput}
        type="text"
        placeholder="Найти на BOOMYRANG"
      />
    </div>
  );
};

import cls from '@/styles/header.module.css';
import { PredictiveSearchForm, PredictiveSearchResults } from './Search';

export const SearchInput = () => {
  return (
    <div className={cls.searchWrapper}>
      <PredictiveSearchForm className={cls.searchWrapper} >
          {({fetchResults, inputRef}) => (
              <input
                className={cls.searchInput}
                name="q"
                onChange={fetchResults}
                placeholder="Найти на BOOMYRANG"
                ref={inputRef}
                type="search"
              />
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
    </div>
  );
};

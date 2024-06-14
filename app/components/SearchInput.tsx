import cls from '@/styles/header.module.css';
import { PredictiveSearchForm, PredictiveSearchResults } from './Search';
import { useChoosePlaceholder } from '@/lib/utils';

export const SearchInput = ({language}: {language: string}) => {
  const placeholder = useChoosePlaceholder(language);

  return (
    <div className={cls.searchWrapper}>
      <PredictiveSearchForm className={cls.searchWrapper} >
          {({fetchResults, inputRef}) => (
              <input
                className={cls.searchInput}
                name="q"
                onChange={fetchResults}
                placeholder={placeholder}
                ref={inputRef}
                type="search"
              />
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
    </div>
  );
};

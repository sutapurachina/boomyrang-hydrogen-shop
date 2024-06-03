import cls from '@/styles/header.module.css';
import catalogueIcon from '@/assets/icons/catalogue.png';
import catalogueClose from '@/assets/icons/catalogueClose.png';
import { useState } from 'react';
import { Link } from '@remix-run/react';

const CatalogueButton = ({onClick, catalogueOpen} : {onClick: () => void, catalogueOpen: boolean}) => {
  return (
    <button onClick={onClick} className={cls.catalogue}>
      <img src={catalogueIcon} alt="catalogue" />
      {
        catalogueOpen ? (
          <img src={catalogueClose} className={cls.catalogueClose} alt="closeicon" />
        ) : (
          <h1 className={cls.catalogueTitle} style={{color: '#fff'}}>{catalogueOpen ? catalogueClose : "Каталог"}</h1>
        )
      }
    </button>
  )
};


export const HeaderCatalogue = ({catalogue}: {catalogue: any}) => {
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const collections = [...catalogue.collections.nodes]
  const onClickHandle = () => setCatalogueOpen(!catalogueOpen);

  return (
    <>
      <CatalogueButton catalogueOpen={catalogueOpen} onClick={onClickHandle} />
      <div className={cls.catalogueWrapper}>
        <div
          onClick={onClickHandle}
          onKeyDown={onClickHandle} 
          role='button'
          tabIndex={0} 
          className={catalogueOpen ? cls.catalogueLayout : cls.catalogueLayoutClose}
        />
        {catalogueOpen && <div className={cls.catalogueList}>
          {collections.map((collection: any, index: number) => 
          <div className={cls.catalogueItem} key={index}>
            {collection.image && (<img className={cls.catalogueImage} src={collection.image.url} alt="icon" />)}
            <Link className={cls.catalogueLink} onClick={onClickHandle} to={collection.handle && `/collections/${collection.handle}`}>{collection.title}</Link>
          </div>)}
        </div>}
      </div>
    </>
  );
};

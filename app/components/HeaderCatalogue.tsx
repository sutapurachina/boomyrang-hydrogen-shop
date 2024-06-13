import cls from '@/styles/header.module.css';
import catalogueIcon from '@/assets/icons/catalogue.png';
import catalogueClose from '@/assets/icons/catalogueClose.png';
import { useState } from 'react';
import { Link } from './Link';

const CatalogueButton = ({onClick, catalogueOpen, title} : {onClick: () => void, catalogueOpen: boolean, title: string}) => {
  return (
    <button onClick={onClick} className={cls.catalogue}>
      <img src={catalogueIcon} alt="catalogue" />
      {
        catalogueOpen ? (
          <img src={catalogueClose} className={cls.catalogueClose} alt="closeicon" />
        ) : (
          <h1 className={cls.catalogueTitle} style={{color: '#fff'}}>{catalogueOpen ? catalogueClose : title}</h1>
        )
      }
    </button>
  )
};


export const HeaderCatalogue = ({catalogue, title}: {catalogue: any, title: string}) => {
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const collections = [...catalogue.collections.nodes]
  const onClickHandle = () => setCatalogueOpen(!catalogueOpen);

  return (
    <>
      <CatalogueButton catalogueOpen={catalogueOpen} title={title} onClick={onClickHandle} />
      <div className={catalogueOpen ? cls.catalogueWrapper : cls.catalogueWrapperClose}>
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

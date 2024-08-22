import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '@/components/Aside';
import {Header} from '@/components/Header';
import {Modal} from '@/components/Modal';
import {CartMain} from '@/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '@/components/Search';
import type { Collection as CollectionType, Localization } from '@shopify/hydrogen/storefront-api-types';
import { M } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';


export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  collections: Promise<CollectionType>;
  languages: Localization;
};

export function Layout({
  collections,
  cart,
  children = null,
  header,
  isLoggedIn,
  languages,
}: LayoutProps) {
  return (
    <>
        {header && <Header header={header} languages={languages} collections={collections} cart={cart} isLoggedIn={isLoggedIn} />}
        <main>{children}</main>
        <Modal />
    </>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button
                onClick={() => {
                  window.location.href = inputRef?.current?.value
                    ? `/search?q=${inputRef.current.value}`
                    : `/search`;
                }}
              >
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, type MetaFunction} from '@remix-run/react';
import { Link } from '@/components/Link';
import {Suspense, useContext} from 'react';
import {Image, Money, getSelectedProductOptions} from '@shopify/hydrogen';
import cls from '@/styles/home.module.css';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import advertise from "@/assets/img/advertise.png";
import AttitudeContext from '@/components/AttitudeContextProvider';

export const meta: MetaFunction = () => {
  return [{title: 'Boomyrang'}];
};

export async function loader({context, params, request}: LoaderFunctionArgs) {
  let {handle} = params
  const {storefront} = context;
  
  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );
  if (!handle) {
    handle = 'boomyrang';
  }
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = await storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div className="home">
        <div className={cls['add-block']}>
          <img className={cls['ozon-image']} src={advertise} alt="ozonAD" />
        </div>
        <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  const attitudeCurrency = useContext(AttitudeContext);
  const currentAttitude = attitudeCurrency.attitude;
  
  return (
    <div className="recommended-products">
      <div className={cls.products}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Await resolve={products}>
            {({products}) => (
              <div className="recommended-products-grid">
                {products.nodes.map((product) => (
                  <Link
                    key={product.id}
                    className="recommended-product"
                    to={`/products/${product.handle}`}
                  >
                    <Image
                      data={product.images.nodes[0]}
                      aspectRatio="1/1"
                      sizes="(min-width: 45em) 20vw, 50vw"
                    />
                    <h4 className={cls.title}>{product.title}</h4>
                    <div className={cls['price-wrapper']}>
                        <span className={cls.price}>
                          {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                        </span>
                        {currentAttitude.value !== 1 && (
                          <span className={cls['another-price']}>
                            ({(+product.priceRange.minVariantPrice.amount / currentAttitude.value).toFixed(2)} {currentAttitude.isoCode})
                          </span>
                        )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query products {
    products(first: 3) {
        nodes {
          title
        }
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
query {
  collections(first: 10) {
    nodes {
      image {
        url
      }
      title
    }
  }
}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 100, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

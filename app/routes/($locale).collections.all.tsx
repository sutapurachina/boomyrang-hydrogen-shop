import {useLoaderData, json, defer} from '@remix-run/react';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import type { Collection } from '@shopify/hydrogen/storefront-api-types';

export async function loader({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(COLLECTION_QUERY);
  return defer({data});
}

export default function Collection() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <h1 style={{color: '#fff'}}>Каталог</h1>
  )
}

const COLLECTION_QUERY = `#graphql
query products {
  products(first: 3) {
      nodes {
        title
      }
  }
}
` as const;

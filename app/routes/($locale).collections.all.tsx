import {useLoaderData} from '@remix-run/react';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import type { Collection } from '@shopify/hydrogen/storefront-api-types';

// Fetch and return API data with a Remix loader function
export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const data = await storefront.query(COLLECTION_QUERY, {
    variables: {handle},
  });
  return data;
}

// Render the component using data returned by the loader
export default function Collection() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <h1 style={{color: '#fff'}}>Каталог</h1>
  )
}

// Query the product title by its ID
const COLLECTION_QUERY = `#graphql
  {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          image {
            src
          }
        }
      }
    }
  }
`

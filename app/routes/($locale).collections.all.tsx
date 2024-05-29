import {useLoaderData, json} from '@remix-run/react';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import type { Collection } from '@shopify/hydrogen/storefront-api-types';

// export async function loader({context}: LoaderFunctionArgs) {
//   const {collections} = await context.storefront.query(COLLECTION_QUERY, {});
//   return json({collections});
// }

export default function Collection() {
  // const {collections} = useLoaderData<typeof loader>();
  // console.log(collections);
  return (
    <h1 style={{color: '#fff'}}>Каталог</h1>
  )
}

// const COLLECTION_QUERY = `#graphql
//   collections(first: 2) {
//     edges {
//       node {
//         id
//         products(first: 5) {
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     }
//   }
// ` as const;

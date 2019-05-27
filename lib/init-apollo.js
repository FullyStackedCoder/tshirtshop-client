import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import { ApolloLink } from 'apollo-boost'
import { withClientState } from 'apollo-boost'
const { publicRuntimeConfig } = getConfig();

import { endpoint } from "../config";
let apolloClient = null;
// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    localDepartments: [],
    localCategories: [],
    userPanelOpen: false,
    localCartId: "",
    minPrice: 0.00,
    maxPrice: 0.00,
    localAttributes: [],
    searchTerm: "",
  },
  resolvers: {
    Mutation: {
      // updateDepartments(_, variables, { cache }) {
      //   const { localDepartments, localCategories } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY
      //   });
      //   let updatedDepartments = [...localDepartments];
      //   let updatedCategories = JSON.parse(JSON.stringify(localCategories));
      //   if (
      //     updatedDepartments.indexOf(parseFloat(variables.checkboxValue)) !=
      //     -1
      //   ) {
      //     updatedDepartments = updatedDepartments.filter(
      //       department => department != variables.checkboxValue
      //     );
      //   } else {
      //     updatedDepartments.push(parseFloat(variables.checkboxValue));
      //   }
      //   if (!variables.checkboxChecked) {
      //     updatedCategories = updatedCategories.filter(
      //       category =>
      //         category.department.department_id != variables.checkboxValue
      //     );
      //   }
      //   const data = {
      //     data: {
      //       localDepartments: updatedDepartments,
      //       localCategories: updatedCategories
      //     }
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
      // updateCategories(_, variables, { cache }) {
      //   const { localCategories } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY
      //   });
      //   let updatedCategories = JSON.parse(JSON.stringify(localCategories));
      //   const checkIfExists = obj =>
      //     obj.category_id === variables.category.category_id;
      //   if (updatedCategories.some(checkIfExists)) {
      //     updatedCategories = updatedCategories.filter(
      //       category =>
      //         category.category_id != variables.category.category_id
      //     );
      //   } else {
      //     updatedCategories.push(variables.category);
      //   }
      //   const data = {
      //     data: { localCategories: updatedCategories }
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
      // toggleUserPanel(_, variables, { cache }) {
      //   const { userPanelOpen } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY,
      //   });
      //   const data = {
      //     data: { userPanelOpen: !userPanelOpen },
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
      // updateLocalCartId(_, variables, { cache }) {
      //   let { localCartId } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY,
      //   });
      //   localCartId = variables.cartId;
      //   const data = {
      //     data: { localCartId: localCartId},
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
      // updateMinMaxPrices(_, variables, { cache }) {
      //   let { minPrice, maxPrice } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY,
      //   });
      //   minPrice = variables.minPrice;
      //   maxPrice = variables.maxPrice;
      //   const data = {
      //     data: { minPrice: minPrice, maxPrice: maxPrice },
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
      // updateLocalAttributes(_, variables, { cache }) {
      //   let { localAttributes } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY
      //   });
      //   let updatedAttributes = [...localAttributes];
      //   if (updatedAttributes.indexOf(variables.attribute) !== -1) {
      //     updatedAttributes = updatedAttributes.filter(attribute => attribute !== variables.attribute)
      //   } else {
      //     updatedAttributes.push(variables.attribute)
      //   }
      //   const data = {
      //     data: { localAttributes: updatedAttributes }
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
      // updateLocalSearchTermMutation(_, variables, { cache }) {
      //   let { searchTerm } = cache.readQuery({
      //     query: LOCAL_STATE_QUERY
      //   });
      //   let updatedSearchTerm = searchTerm;
      //   updatedSearchTerm = variables.searchTerm;
      //   const data = {
      //     data: { searchTerm: updatedSearchTerm }
      //   };
      //   cache.writeData(data);
      //   return data;
      // },
    }
  },
})

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      stateLink,
      new HttpLink({
        uri: endpoint,
        opts: {
          credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
        }
      })
    ]),
    link: new HttpLink({
      uri: `https://tshirtshop-apollo-prod.herokuapp.com/graphql`, // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}
export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }
  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
  return apolloClient;
}
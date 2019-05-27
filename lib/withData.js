import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from '../components/Products';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          updateDepartments(_, variables, { cache }) {
            const { localDepartments, localCategories } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            let updatedDepartments = [...localDepartments];
            let updatedCategories = JSON.parse(JSON.stringify(localCategories));
            if (
              updatedDepartments.indexOf(parseFloat(variables.checkboxValue)) !=
              -1
            ) {
              updatedDepartments = updatedDepartments.filter(
                department => department != variables.checkboxValue
              );
            } else {
              updatedDepartments.push(parseFloat(variables.checkboxValue));
            }
            if (!variables.checkboxChecked) {
              updatedCategories = updatedCategories.filter(
                category =>
                  category.department.department_id != variables.checkboxValue
              );
            }
            const data = {
              data: {
                localDepartments: updatedDepartments,
                localCategories: updatedCategories
              }
            };
            cache.writeData(data);
            return data;
          },
          updateCategories(_, variables, { cache }) {
            const { localCategories } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            let updatedCategories = JSON.parse(JSON.stringify(localCategories));
            const checkIfExists = obj =>
              obj.category_id === variables.category.category_id;
            if (updatedCategories.some(checkIfExists)) {
              updatedCategories = updatedCategories.filter(
                category =>
                  category.category_id != variables.category.category_id
              );
            } else {
              updatedCategories.push(variables.category);
            }
            const data = {
              data: { localCategories: updatedCategories }
            };
            cache.writeData(data);
            return data;
          },
          toggleUserPanel(_, variables, { cache }) {
            const { userPanelOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            const data = {
              data: { userPanelOpen: !userPanelOpen },
            };
            cache.writeData(data);
            return data;
          },
          updateLocalCartId(_, variables, { cache }) {
            let { localCartId } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            localCartId = variables.cartId;
            const data = {
              data: { localCartId: localCartId},
            };
            cache.writeData(data);
            return data;
          },
          updateMinMaxPrices(_, variables, { cache }) {
            let { minPrice, maxPrice } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            minPrice = variables.minPrice;
            maxPrice = variables.maxPrice;
            const data = {
              data: { minPrice: minPrice, maxPrice: maxPrice },
            };
            cache.writeData(data);
            return data;
          },
          updateLocalAttributes(_, variables, { cache }) {
            let { localAttributes } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            let updatedAttributes = [...localAttributes];
            if (updatedAttributes.indexOf(variables.attribute) !== -1) {
              updatedAttributes = updatedAttributes.filter(attribute => attribute !== variables.attribute)
            } else {
              updatedAttributes.push(variables.attribute)
            }
            const data = {
              data: { localAttributes: updatedAttributes }
            };
            cache.writeData(data);
            return data;
          },
          updateLocalSearchTermMutation(_, variables, { cache }) {
            let { searchTerm } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            let updatedSearchTerm = searchTerm;
            updatedSearchTerm = variables.searchTerm;
            const data = {
              data: { searchTerm: updatedSearchTerm }
            };
            cache.writeData(data);
            return data;
          },
        }
      },
      defaults: {
        localDepartments: [],
        localCategories: [],
        userPanelOpen: false,
        localCartId: "",
        minPrice: 0.00,
        maxPrice: 0.00,
        localAttributes: [],
        searchTerm: "",
      }
    }
  });
}

export default withApollo(createClient);

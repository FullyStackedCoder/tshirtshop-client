import casual from "casual";

// seed it so we get consistent results
casual.seed(777);

const fakeProduct = () => ({
  __typename: "Product",
  product_id: "2",
  name: "Chartres Cathedral",
  description:
    '"The Fur Merchants". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!',
  price: 16.95,
  discounted_price: 15.95,
  image: "chartres-cathedral.gif",
  image_2: "chartres-cathedral-2.gif",
  attributes: [
    {
      __typename: "Attributes",
      attribute_value_id: "1",
      value: "S",
      attribute: {
        __typename: "Attribute",
        name: "Size",
        attribute_id: "1"
      }
    },
    {
      __typename: "Attributes",
      attribute_value_id: "2",
      value: "M",
      attribute: {
        __typename: "Attribute",
        name: "Size",
        attribute_id: "1"
      }
    },
    {
      __typename: "Attributes",
      attribute_value_id: "6",
      value: "White",
      attribute: {
        __typename: "Attribute",
        name: "Color",
        attribute_id: "2"
      }
    },
    {
      __typename: "Attributes",
      attribute_value_id: "7",
      value: "Black",
      attribute: {
        __typename: "Attribute",
        name: "Color",
        attribute_id: "2"
      }
    }
  ]
});

const fakeAttributes = () => [
  {
    __typename: "Attributes",
    attribute_id: "1",
    name: "Size"
  },
  {
    __typename: "Attributes",
    attribute_id: "2",
    name: "Color"
  }
];

const fakeUser = () => ({
  __typename: "User",
  customer_id: "4234",
  name: casual.name,
  email: casual.email,
  credit_card: "String",
  address_1: "String",
  address_2: "String",
  city: String,
  region: String,
  postal_code: String,
  country: String,
  shipping_region_id: 3
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export { LocalStorageMock, fakeProduct, fakeAttributes, fakeUser };

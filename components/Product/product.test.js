import ProductComponent from "./index";
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeProduct = {
  product_id: "1",
  name: "Test T-Shirt",
  description: "A test T-shirt for testing",
  price: 50.0,
  discounted_price: 40.0,
  image: "product.jpg",
  image_2: "product_2.jpg",
  thumbnail: "product_thumbnail.jpg",
  display: 1
};

describe('<Product />', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ProductComponent product={fakeProduct} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    const wrapper = shallow(<ProductComponent product={fakeProduct} />);
    const img = wrapper.find('img');
    expect(img.props().src).toContain(fakeProduct.image);
    expect(img.props().alt).toBe(fakeProduct.name)
  });

  it('renders and displays title and price tag', () => {
    const wrapper = shallow(<ProductComponent product={fakeProduct} />);
    const PriceTag = wrapper.find('.priceTag');
    expect(PriceTag.children().text()).toBe('$40.00');
    expect(wrapper.find('.heading').text()).toBe(fakeProduct.name);
  });
});
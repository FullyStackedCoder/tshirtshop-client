import { mount } from 'enzyme';
import wait from 'waait';
import SignInGate from './index';
import { CURRENT_USER_QUERY } from '../../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../../lib/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: null
      }
    }
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: fakeUser()
      }
    }
  }
];

describe('<SignInGate/>', () => {
  it('renders the sign in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <SignInGate />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Please sign in before continuing');
    const Button = wrapper.find('styles__Button');
    expect(Button.exists()).toBe(true);
  });

  it('renders child component when the user is logged in', async () => {
    const Child = () => <p>Child component</p>;
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <SignInGate>
          <Child />
        </SignInGate>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.contains(<Child />)).toBe(true);
  });
});
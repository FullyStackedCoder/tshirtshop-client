import SignInGate from '../components/SignInGate';
import Orders from '../components/Orders';

const OrdersPage = props => (
  <SignInGate>
    <Orders />
  </SignInGate>
);

export default OrdersPage;
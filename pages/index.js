import Products from "../components/Products";

const Home = props => (
  <div>
    <Products page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;

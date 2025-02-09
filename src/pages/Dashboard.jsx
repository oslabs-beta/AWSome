import store from '../state/store.js';
import Home from './Home.jsx';
import { Provider } from 'react-redux';

const Dashboard = () => {
  <Provider store={store}>
    <Home />
  </Provider>;
};

export default Dashboard;

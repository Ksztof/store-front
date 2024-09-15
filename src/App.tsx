import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import styles from './app.module.scss';
import LoginPage from './authentication/pages/loginPage/LoginPage';
import { OrderPage } from './order/pages/orderPage/OrderPage';
import ErrorModal from './shared/components/error/ErrorModal';
import { PageHeader } from './shared/components/pageHeader/PageHeader';
import { store } from './shared/redux/store';
import Main from './shared/pages/mainPage/MainPage';
import { RegisterPage } from './authentication/pages/registerPage/RegisterPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Router>
          <PageHeader />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <ErrorModal />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

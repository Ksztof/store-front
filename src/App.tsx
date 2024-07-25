import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { Header } from './components/header/Header';
import styles from './app.module.scss';
import { Main } from './pages/mainPage/MainPage';
import LoginPage from './pages/loginPage/LoginPage';
import { RegisterPage } from './pages/registerPage/RegisterPage';
import { OrderPage } from './pages/orderPage/OrderPage';
import ErrorModal from './components/error/ErrorModal';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Router>
          <Header />
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

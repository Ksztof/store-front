import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { Order } from './components/Order';
import RegisterPage from './pages/registerPage/RegisterPage';
import { Header } from './components/header/Header';
import styles from './app.module.scss';
import { Main } from './pages/mainPage/MainPage';
import LoginPage from './pages/loginPage/LoginPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/order" element={<Order />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

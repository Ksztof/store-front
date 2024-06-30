import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { Order } from './components/Order';
import RegisterPage from './pages/RegisterPage';
import { Header } from './components/header/Header';
import './app.modules.scss';
import { Main } from './pages/mainPage/MainPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

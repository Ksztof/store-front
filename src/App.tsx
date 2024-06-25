import React from 'react';
import { Main } from './pages/main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { Order } from './components/Order';
import RegisterPage from './pages/RegisterPage';
import { Navbar } from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Main />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/order" element={ <Order /> } />
            <Route path="/register" element={ <RegisterPage /> } />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

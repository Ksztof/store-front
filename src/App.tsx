import React from 'react';
import { Main } from './pages/main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { Provider } from 'react-redux';
import { store } from './redux/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

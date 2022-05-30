import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './store';
import Layout from './components/Layout';

import Login from './pages/Login';
import Orderbelt from './pages/Orderbelt';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Post from './pages/Post';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Information from './pages/Information';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order-belt" element={<Orderbelt />} />
            <Route path="/post-dog" element={<Post />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/:uid" element={<Information />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;

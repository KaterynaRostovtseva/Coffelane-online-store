import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import Layout from './components/Layout/Layout.jsx';
import CoffeePage from './pages/CatalogCoffeePage.jsx';
import AccessoriesPage from './pages/AccessoriesPage.jsx';
import AccessoriesCardPage from './pages/AccessoriesCardPage.jsx';
import OurStoryPage from './pages/OurStoryPage.jsx';
import WholesalePage from './pages/WholesalePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import ProductCardPage from './pages/ProductCardPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderSuccessfulPage from './pages/OrderSuccessfulPage.jsx';
import AdminLayout from './admin/AdminLayout/AdminLayout.jsx';
import Dashboard from './admin/Pages/Dashboard.jsx';
import Products from './admin/Pages/Products.jsx';
import ProductAdd from './admin/Pages/ProductAdd.jsx';
import ProductEdit from './admin/Pages/ProductEdit.jsx';
import Orders from './admin/Pages/Orders.jsx';
import MyAccount from './admin/Pages/MyAccount.jsx';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
            <Footer />
          </>
        } />

        <Route element={<Layout />}>
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/coffee/product/:id" element={<ProductCardPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order_successful" element={<OrderSuccessfulPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/product/:id" element={<AccessoriesCardPage />} />
          <Route path="/ourStory" element={<OurStoryPage />} />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/account" element={<Navigate to="/account/personal-info" replace />} />
          <Route path="/account/:tab" element={<AccountPage />} />


          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
          <Route path="orders" element={<Orders />} />
          <Route path="account" element={<MyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

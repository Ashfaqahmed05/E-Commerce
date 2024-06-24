import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoPage from "./pages/noPage/NoPage";
import HomePage from "./pages/home/Home";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/Cart";
import AllProduct from "./pages/allProducts/AllProducts";
import Signup from "./pages/registration/Signup"
import Login from "./pages/registration/Signin";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProduct";
import UpdateProductPage from "./pages/admin/UpdateProduct";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./protectedRoutes/ProtectedRouteAdmin";
import { ProtectedRouteForUser } from "./protectedRoutes/ProtectedRouteUser";
import CategoryPage from "./pages/category/Category";
import { useEffect } from "react";


const App = () => {


 

  return (
    <div>
      <MyState>
        <Router>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allproduct" element={<AllProduct />} />
            <Route path="/category/:categoryname" element={<CategoryPage />} /> 
            <Route path="/user-dashboard" element={
              <ProtectedRouteForUser>
                <UserDashboard/>
                </ProtectedRouteForUser>
            } />



            <Route path="/admin-dashboard" element={
              <ProtectedRouteForAdmin>
              <AdminDashboard/>
              </ProtectedRouteForAdmin>
            } />
            <Route path="/addproduct" element={
              <ProtectedRouteForAdmin>
              <AddProductPage/>
              </ProtectedRouteForAdmin>
            } />
            <Route path="/updateproduct/:id" element={
            <UpdateProductPage/>
            } />

          </Routes>
        </Router>
      </MyState>
      <Toaster/>

    </div>
  );
}

export default App;
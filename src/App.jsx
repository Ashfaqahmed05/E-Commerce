import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import NoPage from "./pages/noPage/NoPage";
import HomePage from "./pages/home/Home";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/Cart";
import AllProduct from "./pages/allProducts/AllProducts";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Signin";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProduct";
import UpdateProductPage from "./pages/admin/UpdateProduct";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import CategoryPage from "./pages/category/Category";
import Chat from "./components/chat/Chat";

const App = () => {
  const user = JSON.parse(localStorage.getItem('users'));

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
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/allproduct" element={<AllProduct />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/category/:categoryname" element={<CategoryPage />} />
            <Route path="/user-dashboard" element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
               <Route path="/admin-dashboard/chat/:id" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/addproduct" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddProductPage />
              </ProtectedRoute>
            } />
            <Route path="/updateproduct/:id" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UpdateProductPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </MyState>
      <Toaster />
    </div>
  );
}

export default App;

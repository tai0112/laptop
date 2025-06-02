import ProductList from "../components/Product/ProductList";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutDefault from "../layouts/LayoutDefault";
import ProtectedRoute from "../layouts/ProtectedRoute";
import Category from "../pages/Admin/Category";
import CategoryTable from "../pages/Admin/Category/CategoryTable";
import CreateCategory from "../pages/Admin/Category/CreateCategory";
import DetailCategory from "../pages/Admin/Category/DetailCategory";
import Dashboard from "../pages/Admin/Dashboard";
import DiscountCode from "../pages/Admin/DiscountCode";
import Gift from "../pages/Admin/Gift";
import GiftTable from "../pages/Admin/Gift/GiftTable";
import ModalGift from "../pages/Admin/Gift/ModalGift";
import Manufacture from "../pages/Admin/Manufacture";
import CreateManufacture from "../pages/Admin/Manufacture/CreateManufacture";
import DetailManufacture from "../pages/Admin/Manufacture/DetailManufacture";
import ManufactureTable from "../pages/Admin/Manufacture/ManufactureTable";
import Payment from "../pages/Admin/Payment";
import Product from "../pages/Admin/Product";
import CreateProduct from "../pages/Admin/Product/CreateProduct";
import CreateProductDetail from "../pages/Admin/Product/CreateProductDetail";
import DetailProduct from "../pages/Admin/Product/DetailProduct";
import ProductTable from "../pages/Admin/Product/ProductTable";
import Cart from "../pages/public/Cart";
import PaySuccess from "../pages/public/Payment/PaySuccess";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login/Login";
import ProductDetail from "../pages/public/Product/ProductDetail";
import ManagePayment from "../pages/public/Payment";
import RequireLogin from "../pages/public/RequireLogin/RequireLogin";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/requireLogin", element: <RequireLogin />, index: true },
      {
        path: "/product",
        children: [
          {
            index: true,
            element: <ProductList />,
          },
          {
            index: true,
            path: "/product/:category",
            element: <ProductList />,
          },
          {
            path: "/product/detail/:productDetailId",
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "/cart",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
      {
        path: "/success",
        element: <PaySuccess />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/manage-payment",
            element: <ManagePayment />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/admin/category",
            element: <Category />,
            children: [
              {
                path: "/admin/category/create",
                element: <CreateCategory />,
              },
              {
                index: true,
                path: "/admin/category",
                element: <CategoryTable />,
              },
              {
                path: "/admin/category/:categoryId",
                element: <DetailCategory />,
              },
            ],
          },
          {
            path: "/admin/product",
            element: <Product />,
            children: [
              {
                index: true,
                element: <ProductTable />,
              },
              {
                path: "/admin/product/create",
                element: <CreateProduct />,
              },
              {
                path: "/admin/product/:productId",
                element: <DetailProduct />,
              },
              {
                path: "/admin/product/:productId/createProductDetail",
                element: <CreateProductDetail />,
              },
            ],
          },
          {
            path: "/admin/payment",
            element: <Payment />,
          },
          {
            path: "/admin/manufacture",
            element: <Manufacture />,
            children: [
              {
                index: true,
                element: <ManufactureTable />,
              },
              {
                path: "/admin/manufacture/create",
                element: <CreateManufacture />,
              },
              {
                path: "/admin/manufacture/:manufactureId",
                element: <DetailManufacture />,
              },
            ],
          },
          {
            path: "/admin/gift",
            element: <Gift />,
            children: [
              {
                index: true,
                element: <GiftTable />,
              },
              {
                path: "/admin/gift/create",
                element: <ModalGift />,
              },
            ],
          },
          {
            path: "/admin/discountcode",
            element: <DiscountCode />,
          },
        ],
      },
    ],
  },
];

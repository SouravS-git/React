import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { createRoutesFromElements, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // { path: '', element: <Home /> },
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:productId', element: <ProductDetail /> },
    ]
  },
]);

// In older versions of React we use this approach

/*const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element={<HomePage />} />
    <Route path='/products' element={<ProductsPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);*/

function App() {
  return <RouterProvider router={router} />;
}

export default App;


import './App.css';
//
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
//
import Login from './pages/nonAuthUserPages/login/Login';
import Signup from "./pages/nonAuthUserPages/signup/Signup";
import 'react-notifications/lib/notifications.css';
import OtpVerify from './pages/nonAuthUserPages/otpverify/OtpVerify';
import ForgotPassword from './pages/nonAuthUserPages/forgotPassword/ForgotPassword';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/authUserPages/home/Home';
import LandingPage from "./pages/nonAuthUserPages/landingPage/LandingPage";
import Links from './pages/authUserPages/links/Links';
import ProductAndServices from './pages/nonAuthUserPages/landingPage/ProductAndServices';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "",
        element: <ProductAndServices />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "otpVerify",
        element: <OtpVerify />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
    ]
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "links",
        element: <Links />
      }
      // {
      //   path: "courses",
      //   element: <Courses />,
      // },
      // {
      //   path: "coursesDetail/:id",
      //   element: <CoursesDetail />,
      // },
      // {
      //   path: "myCourses",
      //   element: <MyCourses />
      // },
    ],
  },
]);
function App() {
 
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

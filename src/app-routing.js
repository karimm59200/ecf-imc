import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/routes/ErrorPage";
import Home from "./components/routes/Home";


const router = createBrowserRouter([
    {
        path: '/', element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: '/accueil', element: <Home />},
        ]
    }
    ])

export default router




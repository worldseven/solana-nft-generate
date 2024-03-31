import React from "react";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layout";
import { HomePage } from "../components/pages";

const Router = () => {
    return (
        useRoutes([
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    }
                ]
            }
        ])
    )
}

export default Router
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "./components/common";
import "./App.css";

import { SolanaProvider } from "./components/provider";
import Router from "./router";

function App() {
    return (
        <BrowserRouter>
            <SolanaProvider>
                <Container className="App">
                    <Router />
                </Container>
            </SolanaProvider>
        </BrowserRouter>
    );
}

export default App;
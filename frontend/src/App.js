import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Container>
                    <h1>Hello</h1>
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;

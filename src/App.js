/** @format */
import React from "react";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Poi from "./components/Poi";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useAuth } from "./Reducer";
import Logout from "./components/Logout";
function App() {
  const { state } = useAuth();
  return (
    <Router>
      <div
        style={{
          width: "100%",
          backgroundColor: "#f1f2f5",
          color: "black",
          padding: "20px",
        }}>
        <Nav
          className="me-auto"
          style={{
            color: "black",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <>
            {state.isLoggedIn ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/logout"
                  style={{
                    margin: "0 10px",
                    color: "black",
                    fontWeight: "600",
                  }}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{
                    margin: "0 10px",
                    color: "black",
                    fontWeight: "600",
                  }}>
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  style={{
                    margin: "0 10px",
                    color: "black",
                    fontWeight: "600",
                  }}>
                  Register
                </Nav.Link>
              </>
            )}
            <Nav.Link
              as={Link}
              to="/"
              style={{ margin: "0 10px", color: "black", fontWeight: "600" }}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/poi"
              style={{ margin: "0 10px", color: "black", fontWeight: "600" }}>
              POI
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              style={{ margin: "0 10px", color: "black", fontWeight: "600" }}>
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              style={{ margin: "0 10px", color: "black", fontWeight: "600" }}>
              Contact Us
            </Nav.Link>
          </>
        </Nav>

        <Routes>
          {state.isLoggedIn ? (
            <>
              <Route path="/" exact element={<Home />} />
              <Route path="/poi" element={<Poi />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/" exact element={<Home />} />
          <Route path="/poi" element={<Poi />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

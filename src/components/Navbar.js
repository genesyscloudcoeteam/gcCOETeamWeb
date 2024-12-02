import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav>
        <h1>gcCOETeamWeb</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><button onClick={() => setShowRegisterModal(true)}>Register</button></li>
          <li><button onClick={() => setShowLoginModal(true)}>Login</button></li>
        </ul>
      </nav>
      {/* Register Modal */}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Navbar;

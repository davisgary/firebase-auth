import React, { useState } from 'react';
import { Link } from 'gatsby';
import Logo from '../images/logo.svg';
import AuthModal from '../components/auth/AuthModal';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openModal = (signup: boolean = false) => {
    setShowSignup(signup);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-transparent p-6 lg:px-24">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <img className="h-8 w-8" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="text-sm flex-grow flex items-center justify-end">
        <button
          onClick={() => openModal()}
          className="inline-block flex items-center mr-9 text-base font-sans font-medium text-black"
        >
          Sign In
        </button>
        <button
          onClick={() => openModal(true)}
          className="px-6 py-2 text-base font-sans font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Sign Up
        </button>
      </div>
        <AuthModal 
          isModalOpen={isModalOpen} 
          closeAuthModal={closeModal} 
          showSignup={showSignup}
        />
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

interface AuthModalProps {
  isModalOpen: boolean;
  closeAuthModal: () => void;
  showSignup: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isModalOpen, closeAuthModal, showSignup }) => {
  const [currentForm, setCurrentForm] = useState<'login' | 'signup' | 'forgotPassword'>('login');

  useEffect(() => {
    if (isModalOpen) {
      setCurrentForm(showSignup ? 'signup' : 'login');
    }
  }, [isModalOpen, showSignup]);

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'signup' : 'login');
  };

  const toggleForgotPassword = () => {
    setCurrentForm('forgotPassword');
  };

  const handleClose = () => {
    closeAuthModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      {currentForm === 'signup' && (
        <Signup onClose={handleClose} toggleForm={toggleForm} />
      )}
      {currentForm === 'login' && (
        <Login onClose={handleClose} toggleForm={toggleForm} toggleForgotPassword={toggleForgotPassword} />
      )}
      {currentForm === 'forgotPassword' && (
        <ForgotPassword onClose={handleClose} />
      )}
    </Modal>
  );
};

export default AuthModal;

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { getUserProfile, getFirebaseAuth } from '../../../firebase';

interface LoginProps {
  onClose: () => void;
  toggleForm: () => void;
  toggleForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, toggleForm, toggleForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    setAuth(getFirebaseAuth());
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) {
      setError("Firebase Auth is not initialized");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(userCredential.user.uid);
      console.log(userProfile); // Can handle the user profile data here

      onClose(); // Close the login form/modal
      // Will want to redirect the user or perform other actions after login
    } catch (error) {
      setLoading(false);
      if (error instanceof Error && 'code' in error) {
        switch (error.code) {
          case 'auth/wrong-password':
            setError('Oh no! Wrong Password.');
            break;
          case 'auth/user-not-found':
            setError('No user found with this email. Please sign up.');
            break;
          default:
            setError('Oh no! Wrong email or password.');
        }
      } else {
        setError('Oh no! Wrong email or password.');
      }
    }
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div onClick={handleContainerClick} className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded p-10 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold mb-6 pb-6 text-center">Welcome Back. Sign In.</h1>
          {error && <p className="text-center font-medium text-red-500">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-center">
            Forgot password? <button onClick={toggleForgotPassword} className="text-blue-600 hover:underline">Reset Password</button>
          </p>
          <p className="text-center">
            Don't have an account? <button onClick={toggleForm} className="text-blue-600 hover:underline">Sign Up</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
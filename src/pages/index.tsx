import * as React from "react";
import { Link } from "gatsby";
import { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";
import '../styles/global.css';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 mt-32 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-5xl">
        <h1 className="text-6xl text-center font-sans font-bold">Login Now</h1>
        <p className="text-lg text-center text-xl mt-6">Need an account? Sign up today.</p>
        <div className="text-center mt-8">
          <Link to="/" className="px-6 py-3 text-white text-base font-sans font-medium bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Sign Up</title>;

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="solana-card p-8 text-center max-w-md w-full">
        <h1 className="text-7xl font-bold solana-gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Oops! We couldn't find that page.</p>
        <Link to="/">
          <button className="solana-button w-full">
            <Home className="w-4 h-4 mr-2 inline" />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

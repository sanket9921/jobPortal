import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-700 mt-2">Oops! Page not found.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

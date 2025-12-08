import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>

      <Link
        to="/"
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

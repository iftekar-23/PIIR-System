const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
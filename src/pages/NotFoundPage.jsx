import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <Camera className="w-16 h-16 mb-4 text-gray-400" />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! This page seems to be out of frame.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;

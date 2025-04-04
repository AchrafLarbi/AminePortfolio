// src/components/shared/Loading.jsx

// eslint-disable-next-line react/prop-types
const Loading = ({ variant = "default" }) => {
  // Variant 1: Simple blur with spinner
  if (variant === "simple") {
    return (
      <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-white/60 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Variant 2: Blur with spinner and text
  if (variant === "withText") {
    return (
      <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/60 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Variant 3: Frosted glass effect (default)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background blur layer */}
      <div className="absolute inset-0 bg-gray-500/30 backdrop-blur-md" />

      {/* Content layer */}
      <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
        <div className="w-16 h-16 border-4 border-white/60 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-white text-center text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

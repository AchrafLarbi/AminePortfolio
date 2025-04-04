import { useState, useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const LazyLoadImage = ({ src, alt, style, className }) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track when the image is fully loaded
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading the image once it is in the viewport
          if (imgRef.current) {
            const imgElement = imgRef.current.querySelector("img");
            if (imgElement) imgElement.src = src; // Set the src to start loading
          }
          observer.disconnect(); // Stop observing
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...style }}
      ref={imgRef}
    >
      {!isLoaded && (
        <div
          style={{
            ...style,
            backgroundColor: "#e0e0e0", // Placeholder color
          }}
          className="w-full h-full"
        />
      )}
      <img
        alt={alt}
        style={{
          ...style,
          display: isLoaded ? "block" : "none", // Show the image only after loading
          objectFit: "cover",
        }}
        className="w-full h-full"
        onLoad={() => setIsLoaded(true)} // Set as loaded when the image finishes loading
      />
    </div>
  );
};

export default LazyLoadImage;

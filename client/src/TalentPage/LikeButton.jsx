import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const LoadingHeart = () => (
  <div className="animate-spin">
    <svg
      className="w-4 h-4 text-pink-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const LikeButton = ({ talent, onLike, isLiked: initialIsLiked, isLoading }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  // Update local state when prop changes
  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      // Optimistically update UI
      setIsLiked((prev) => !prev);
      // Call parent handler
      await onLike(talent._id);
    } catch (error) {
      // Revert on error
      setIsLiked((prev) => !prev);
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-1 relative 
        ${isLiked ? "bg-pink-100" : "bg-pink-50"} 
        text-pink-600 py-3 px-5 rounded-lg 
        hover:bg-pink-100 transition-all duration-200 
        ${isLoading ? "cursor-not-allowed opacity-70" : "hover:scale-105"}
      `}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isLiked ? "Unlike profile" : "Like profile"}
    >
      {isLoading ? (
        <LoadingHeart />
      ) : (
        <Heart
          size={16}
          fill={isLiked ? "currentColor" : "none"}
          className={`transition-all duration-200 
            ${isLiked ? "scale-110" : "scale-100 hover:scale-110"}`}
        />
      )}
    </button>
  );
};

export default LikeButton;

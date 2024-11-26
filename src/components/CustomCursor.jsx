import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mousemove
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: position.y,
        left: position.x,
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue color for the cursor
        boxShadow: "0 0 8px rgba(59, 130, 246, 0.8)", // Glowing effect
      }}
    />
  );
};

export default CustomCursor;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      //
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is 0
    if (count === 0) {
      navigate("/");
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="text-slate-50 p-5 text-center text-2xl">
      <p
        style={{
          fontSize: "2em",
        }}
      >
        Redirecting you in {count} seconds...
      </p>
    </div>
  );
};

export default LoadingToRedirect;

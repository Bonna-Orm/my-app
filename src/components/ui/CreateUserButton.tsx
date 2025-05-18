"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateUserButtonProps {
  userRole: string;
}

const CreateUserButton: React.FC<CreateUserButtonProps> = ({ userRole }) => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (userRole === "cashier" || userRole === "user") {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    } else {
      router.push("/admin/create-user"); // Redirect to Create User page
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create User
      </button>
      {showPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded shadow-lg">
          You do not have permission to create a user.
        </div>
      )}
    </div>
  );
};

export default CreateUserButton;
import React from "react";

const AccountState = ({ onLogout }) => (
  <div className="flex justify-end items-center mb-6">
    <button
      onClick={onLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  </div>
);

export default AccountState;

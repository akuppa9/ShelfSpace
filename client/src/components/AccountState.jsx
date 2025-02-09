import React from "react";

const AccountState = ({ onLogout, onDeleteAccount }) => (
  <div className="flex justify-end items-center mb-6 space-x-4">
    <button
      onClick={onLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
    <button
      onClick={onDeleteAccount}
      className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
    >
      Delete Account
    </button>
  </div>
);

export default AccountState;

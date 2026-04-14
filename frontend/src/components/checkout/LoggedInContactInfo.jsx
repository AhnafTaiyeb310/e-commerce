import React from "react";

export default function LoggedInContactInfo({ user }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6">
        Contact details
      </h2>
      
      <div className="flex items-center gap-x-3 p-4 border border-gray-200 rounded-xl dark:border-neutral-700">
        <div className="flex-shrink-0 size-10 flex justify-center items-center bg-gray-100 rounded-full dark:bg-neutral-800">
          <svg className="shrink-0 size-5 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-neutral-200">{user?.email || "jamescollins@site.so"}</p>
          <p className="text-xs text-gray-500 dark:text-neutral-500">Logged in</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

/**
 * AddressCard is a reusable component to display a single address item
 * within the list, with actions for editing, deleting, and setting as default.
 */
export default function AddressCard({ address, onEdit, onDelete, onSetDefault, isDeleting }) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-xl p-5 dark:border-neutral-700 relative transition-all hover:shadow-sm">
      {address.is_default && (
        <span className="absolute top-0 right-0 rounded-bl-xl rounded-tr-xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          Default
        </span>
      )}
      
      <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-2 capitalize">
         {address.address_type === 'S' ? 'Shipping Address' : 'Billing Address'}
      </h3>
      
      <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1 mb-6">
        <li className="font-medium text-gray-900 dark:text-neutral-100 italic">
          {address.first_name} {address.last_name}
        </li>
        <li>{address.street}</li>
        <li>{address.city}, {address.state} {address.postal_code}</li>
        <li>{address.country}</li>
        {address.phone && <li>{address.phone}</li>}
      </ul>
      
      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
        <button 
          onClick={() => onEdit(address)}
          type="button" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          Edit
        </button>
        <span className="text-gray-300 dark:text-neutral-700">|</span>
        <button 
          onClick={() => onDelete(address.id)}
          disabled={isDeleting}
          type="button" 
          className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 disabled:opacity-50 transition-colors"
        >
          {isDeleting ? "Removing..." : "Remove"}
        </button>
        
        {!address.is_default && (
          <>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <button 
              onClick={() => onSetDefault(address.id)}
              type="button" 
              className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              Set as default
            </button>
          </>
        )}
      </div>
    </div>
  );
}

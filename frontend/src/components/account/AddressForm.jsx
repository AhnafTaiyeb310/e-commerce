"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const addressSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postal_code: z.string().min(2, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),
  is_default: z.boolean().default(false),
  address_type: z.enum(["S", "B"]).default("S"),
});

/**
 * AddressForm is a production-grade form for adding or editing addresses.
 * Uses react-hook-form for efficient state management and zod for schema-based validation.
 */
export default function AddressForm({ initialData, onSubmit, onCancel, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      country: "US",
      address_type: "S",
      is_default: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-7 dark:bg-neutral-900 dark:border-neutral-700 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="grid sm:grid-cols-12 gap-y-6 gap-x-4 mb-8">
        {/* Name group */}
        <div className="sm:col-span-6">
          <label htmlFor="first_name" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">First Name</label>
          <input 
            {...register("first_name")}
            id="first_name" 
            type="text" 
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="John" 
          />
          {errors.first_name && <p className="text-xs text-red-600 mt-2">{errors.first_name.message}</p>}
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="last_name" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">Last Name</label>
          <input 
            {...register("last_name")}
            id="last_name" 
            type="text" 
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="Doe" 
          />
          {errors.last_name && <p className="text-xs text-red-600 mt-2">{errors.last_name.message}</p>}
        </div>

        {/* Address group */}
        <div className="sm:col-span-12">
          <label htmlFor="street" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">Street Address</label>
          <input 
            {...register("street")}
            id="street" 
            type="text" 
            className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="123 Shopping St, Apt 4B" 
          />
          {errors.street && <p className="text-xs text-red-600 mt-2">{errors.street.message}</p>}
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="city" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">City</label>
          <input 
            {...register("city")}
            id="city" 
            type="text" 
            className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="Metropolis" 
          />
          {errors.city && <p className="text-xs text-red-600 mt-2">{errors.city.message}</p>}
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="state" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">State / Province</label>
          <input 
            {...register("state")}
            id="state" 
            type="text" 
            className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="NY" 
          />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="postal_code" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">ZIP / Postal Code</label>
          <input 
            {...register("postal_code")}
            id="postal_code" 
            type="text" 
            className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="10001" 
          />
          {errors.postal_code && <p className="text-xs text-red-600 mt-2">{errors.postal_code.message}</p>}
        </div>

        <div className="sm:col-span-12">
          <label htmlFor="country" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">Country</label>
          <select 
            {...register("country")}
            id="country" 
            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          >
            <option value="US">United States</option>
            <option value="BD">Bangladesh</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
          </select>
          {errors.country && <p className="text-xs text-red-600 mt-2">{errors.country.message}</p>}
        </div>

        <div className="sm:col-span-12">
          <label htmlFor="phone" className="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">Phone Number</label>
          <input 
            {...register("phone")}
            id="phone" 
            type="tel" 
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
            placeholder="+1 (123) 456-7890" 
          />
        </div>

        {/* Checkbox */}
        <div className="sm:col-span-12">
          <div className="flex items-center">
            <input 
               {...register("is_default")}
               id="is_default" 
               type="checkbox" 
               className="shrink-0 size-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
            />
            <label htmlFor="is_default" className="text-sm text-gray-600 ms-2.5 dark:text-neutral-400">Set as default address</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-x-3">
        <button 
          onClick={onCancel}
          type="button" 
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          Cancel
        </button>
        <button 
          disabled={isLoading}
          type="submit" 
          className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          {isLoading ? (
            <>
              <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"></span>
              Saving...
            </>
          ) : (
            "Save address"
          )}
        </button>
      </div>
    </form>
  );
}

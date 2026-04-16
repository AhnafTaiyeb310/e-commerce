"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";
import AddressCard from "@/components/account/AddressCard";
import AddressForm from "@/components/account/AddressForm";
import { fetchAddresses, addAddress, deleteAddress, updateAddress } from "@/lib/api";

export default function AddressesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  const createMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address added successfully");
      setIsAdding(false);
    },
    onError: () => toast.error("Failed to add address"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address removed");
    },
    onError: () => toast.error("Failed to remove address"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address updated");
      setEditingAddress(null);
    },
    onError: () => toast.error("Failed to update address"),
  });

  const handleSetDefault = (id) => {
    updateMutation.mutate({ id, data: { is_default: true } });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsAdding(true);
  };

  const handleAddClick = () => {
    setEditingAddress(null);
    setIsAdding(true);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <ol className="flex items-center whitespace-nowrap mb-6" aria-label="Breadcrumb">
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/">Home</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/account">Account</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Addresses</li>
        </ol>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          <div>
            {!isAdding ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Addresses</h2>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">Manage your billing & shipping addresses.</p>
                  </div>
                  <button 
                    onClick={handleAddClick}
                    type="button" 
                    className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all font-semibold"
                  >
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Add new address
                  </button>
                </div>

                {isLoading ? (
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 animate-pulse">
                    {[1, 2].map(i => <div key={i} className="h-48 bg-gray-100 dark:bg-neutral-800 rounded-xl"></div>)}
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {addresses.map((address) => (
                      <AddressCard 
                        key={address.id} 
                        address={address} 
                        onEdit={handleEdit}
                        onDelete={(id) => deleteMutation.mutate(id)}
                        onSetDefault={handleSetDefault}
                        isDeleting={deleteMutation.isLoading && deleteMutation.variables === address.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl dark:border-neutral-700">
                    <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-neutral-800">
                      <svg className="size-10 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200">No Address Found</h3>
                    <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">Setup your first address to enjoy faster checkouts.</p>
                    <button 
                      onClick={handleAddClick}
                      className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white transition-all font-semibold"
                    >
                      Add Address Now
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">Please provide accurate information for reliable delivery.</p>
                </div>
                <AddressForm 
                  initialData={editingAddress}
                  onSubmit={(data) => {
                    if (editingAddress) {
                      updateMutation.mutate({ id: editingAddress.id, data });
                    } else {
                      createMutation.mutate(data);
                    }
                  }}
                  onCancel={() => {
                    setIsAdding(false);
                    setEditingAddress(null);
                  }}
                  isLoading={createMutation.isLoading || updateMutation.isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

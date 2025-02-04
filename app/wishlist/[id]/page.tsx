"use client";

import { notFound } from "next/navigation";
import { getWishlist } from "@/app/api/wishlist";
import { Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { AddItemModal } from "./components/AddItemModal";
import { Wishlist } from "@/types/wishlist";

export default function WishlistPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.id as string;

  const loadWishlist = useCallback(async () => {
    setIsLoading(true);
    const data = await getWishlist(id);
    setIsLoading(false);
    
    if (!data) {
      notFound();
    }
    
    setWishlist(data);
  }, [id]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!wishlist) {
    notFound();
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8 px-4">
        {/* Header Section */}
        <div className="flex items-center justify-center flex-col gap-2 py-4">
          <h1 className="text-3xl font-bold text-center">{wishlist.name}</h1>
          <p className="text-base-content/70 text-center">
            {wishlist.item_count} items in this wishlist
          </p>
        </div>

        {/* Items List */}
        <div className="flex flex-col gap-4">
          {wishlist.wishlist_items?.length === 0 ? (
            <div className="text-center py-8 text-base-content/70">
              No items in this wishlist yet. Add your first item below!
            </div>
          ) : (
            <div className="grid gap-4">
              {wishlist.wishlist_items?.map((item) => (
                <div 
                  key={item.id}
                  className="card bg-base-200"
                >
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg">{item.product_name}</h3>
                    <p className="text-sm text-base-content/70">
                      Added {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Item Button */}
        <div className="flex justify-center py-8">
          <button 
            className="btn btn-primary gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>
      </div>

      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          loadWishlist();
        }}
      />
    </div>
  );
} 
"use client";

import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Wishlist } from "./WishlistDashboard";
import { getWishlistItems, deleteWishlistItem } from "@/app/api/wishlist";

interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_name: string;
  created_at: string;
}

interface WishlistItemsModalProps {
  wishlist: Wishlist | null;
  onClose: () => void;
}

export function WishlistItemsModal({ wishlist, onClose }: WishlistItemsModalProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, [wishlist]);

  async function loadItems() {
    if (wishlist) {
      setIsLoading(true);
      const wishlistItems = await getWishlistItems(wishlist.id);
      setItems(wishlistItems);
      setIsLoading(false);
    }
  }

  async function handleDeleteItem(itemId: string) {
    const result = await deleteWishlistItem(itemId);
    if (!result.error) {
      await loadItems(); // Refresh the list
    }
  }

  if (!wishlist) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box relative">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-ghost absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-bold text-lg mb-4">{wishlist.name}</h3>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center text-base-content/70">
              No items in this wishlist yet
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                >
                  <span>{item.product_name}</span>
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="btn btn-ghost btn-sm text-error"
                    title="Delete Item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 
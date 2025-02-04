"use client";

import { useState } from "react";
import { CreateWishlistModal } from "./CreateWishlistModal";
import { DeleteWishlistModal } from "./DeleteWishlistModal";
import { getWishlists, deleteWishlist } from "@/app/api/wishlist";
import { Search, Trash2, ExternalLink } from "lucide-react";
import { WishlistItemsModal } from "./WishlistItemsModal";

export interface Wishlist {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  item_count: number;
}

interface WishlistDashboardProps {
  initialWishlists: Wishlist[];
}

export function WishlistDashboard({ initialWishlists }: WishlistDashboardProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);
  const [wishlistToDelete, setWishlistToDelete] = useState<Wishlist | null>(null);
  const [wishlists, setWishlists] = useState(initialWishlists);

  const refreshWishlists = async () => {
    const updatedWishlists = await getWishlists();
    setWishlists(updatedWishlists);
  };

  const handleDeleteWishlist = async () => {
    if (!wishlistToDelete) return;

    const result = await deleteWishlist(wishlistToDelete.id);
    if (!result.error) {
      await refreshWishlists();
    }
    setWishlistToDelete(null);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Your Wishlists</h2>
        <div className="py-4">
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Wishlist
          </button>
        </div>
        
        {wishlists.length === 0 ? (
          <div className="alert">
            No wishlists created yet. Create your first wishlist to get started!
          </div>
        ) : (
          <div className="grid gap-4">
            {wishlists.map((wishlist) => (
              <div key={wishlist.id} className="card bg-base-200">
                <div className="card-body p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-center md:text-left">
                      <h3 className="card-title">{wishlist.name}</h3>
                      <span className="text-sm opacity-70">
                        {wishlist.item_count || 0} items
                      </span>
                    </div>
                    <div className="flex justify-center md:justify-end gap-2">
                      <button 
                        className="btn btn-primary btn-sm"
                        title="View Items"
                        disabled={wishlist.item_count === 0}
                        onClick={() => setSelectedWishlist(wishlist)}
                      >
                        <Search className="h-4 w-4" />
                      </button>
                      <a
                        href={`/wishlist/${wishlist.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        title="Open in New Tab"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button 
                        className="btn btn-error btn-sm"
                        title="Delete Wishlist"
                        onClick={() => setWishlistToDelete(wishlist)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <CreateWishlistModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={async () => {
            await refreshWishlists();
            setIsCreateModalOpen(false);
          }}
        />

        <WishlistItemsModal 
          wishlist={selectedWishlist}
          onClose={() => setSelectedWishlist(null)}
        />

        <DeleteWishlistModal 
          isOpen={wishlistToDelete !== null}
          wishlistName={wishlistToDelete?.name || ''}
          onConfirm={handleDeleteWishlist}
          onClose={() => setWishlistToDelete(null)}
        />
      </div>
    </div>
  );
} 
"use client";

import { X } from "lucide-react";

interface DeleteWishlistModalProps {
  isOpen: boolean;
  wishlistName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteWishlistModal({ 
  isOpen, 
  wishlistName, 
  onConfirm, 
  onClose 
}: DeleteWishlistModalProps) {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box relative">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-ghost absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-bold text-lg mb-4">Delete Wishlist</h3>
        <p className="py-4">
          Are you sure you want to delete "{wishlistName}"? This action cannot be undone.
        </p>
        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 
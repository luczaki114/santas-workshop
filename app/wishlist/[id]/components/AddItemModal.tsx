"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { createWishlistItem } from "@/app/api/wishlist";
import { useParams } from "next/navigation";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddItemModal({ isOpen, onClose, onSuccess }: AddItemModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams();
  const wishlistId = params.id as string;

  async function handleSubmit(formData: FormData) {
    formData.append("wishlist_id", wishlistId);
    const result = await createWishlistItem(formData);
    
    if (result.error) {
      // You might want to show an error message here
      console.error(result.error);
      return;
    }

    formRef.current?.reset();
    onSuccess();
    onClose();
  }

  return (
    <dialog ref={dialogRef} className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-ghost absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-bold text-lg mb-4">Add New Item</h3>
        <form action={handleSubmit} ref={formRef}>
          <div className="form-control gap-4">
            <div>
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="product_name"
                placeholder="Enter product name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Product Link (Optional)</span>
              </label>
              <input
                type="url"
                name="product_link"
                placeholder="https://..."
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 
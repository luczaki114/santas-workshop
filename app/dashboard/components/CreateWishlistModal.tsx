"use client";

import { useRef } from "react";
import { createWishlist } from "@/app/api/wishlist";

interface CreateWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateWishlistModal({ isOpen, onClose, onSuccess }: CreateWishlistModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await createWishlist(formData);
    
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
        <h3 className="font-bold text-lg mb-4">Create New Wishlist</h3>
        <form action={handleSubmit} ref={formRef}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Wishlist Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter wishlist name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Wishlist
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
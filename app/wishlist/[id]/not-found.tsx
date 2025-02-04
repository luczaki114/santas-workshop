import Link from "next/link";

export default function WishlistNotFound() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">Wishlist Not Found</h1>
        <p className="text-base-content/70">
          The wishlist you're looking for doesn't exist or has been deleted.
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
} 
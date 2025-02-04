import { Metadata } from "next";
import { getWishlist } from "@/app/api/wishlist";
import { WishlistPageClient } from "./components/WishlistPageClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const wishlist = await getWishlist(id);

  if (!wishlist) {
    return {
      title: "Wishlist Not Found | North Pole Express",
      description: "A Parent-Managed Wishlist App",
    };
  }

  return {
    title: `${wishlist.name} | North Pole Express`,
    description: "A Parent-Managed Wishlist App",
  };
}

export default async function WishlistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WishlistPageClient id={id} />;
} 
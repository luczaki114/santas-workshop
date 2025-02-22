import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getWishlists } from "../api/wishlist";
import { WishlistDashboard } from "./components/WishlistDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | North Pole Express",
  description: "Manage your wishlists and track gift ideas for your loved ones",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, redirect to login page
  if (!user) {
    redirect("/sign-in");
  }

  const wishlists = await getWishlists();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8 px-4">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        
        {/* User Info Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Your Account</h2>
            <p>Email: {user.email}</p>
          </div>
        </div>

        {/* Wishlists Section */}
        <WishlistDashboard initialWishlists={wishlists} />

      </div>
    </div>
  );
} 
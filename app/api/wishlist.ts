"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export async function createWishlist(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name")?.toString();

  const { user, error: userError } = await getCurrentUser();

  if (userError || !user) {
    return { error: "Authentication required" };
  }

  if (!name) {
    return { error: "Wishlist name is required" };
  }

  const { data, error } = await supabase
    .from("wishlists")
    .insert([{ 
      name,
      created_by: user.id,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { data };
}

export async function getWishlists() {
  const supabase = await createClient();

  const { user, error: userError } = await getCurrentUser();

  if (userError || !user) {
    return [];
  }
  
  const { data: wishlists, error } = await supabase
    .from('wishlists')
    .select(`
      id,
      name,
      created_at,
      created_by,
      item_count:wishlist_items(count)
    `)
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })
    .then(({ data, error }) => ({
      data: data?.map(d => ({ ...d, item_count: d.item_count?.[0]?.count || 0 })) || [],
      error
    }));

  if (error) {
    console.error("Error fetching wishlists:", error);
    return [];
  }

  return wishlists;
}

export async function getWishlistItems(wishlistId: string) {
  const supabase = await createClient();
  
  const { data: items, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('wishlist_id', wishlistId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching wishlist items:", error);
    return [];
  }

  return items;
}

export async function deleteWishlistItem(itemId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function deleteWishlist(wishlistId: string) {
  const supabase = await createClient();
  
  // First delete all items in the wishlist
  const { error: itemsError } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('wishlist_id', wishlistId);

  if (itemsError) {
    return { error: itemsError.message };
  }

  // Then delete the wishlist itself
  const { error: wishlistError } = await supabase
    .from('wishlists')
    .delete()
    .eq('id', wishlistId);

  if (wishlistError) {
    return { error: wishlistError.message };
  }

  return { success: true };
} 
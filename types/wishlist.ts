export interface WishlistItem {
  id: string;
  product_name: string;
  created_at: string;
  product_link?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  item_count: number;
  wishlist_items: WishlistItem[];
  created_by?: string;
  created_at?: string;
} 
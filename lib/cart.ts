import { supabase } from './supabaseClient'

// ============================================================
// CART HELPERS
// These are safe to call directly from the website, because RLS
// already guarantees a customer can only ever touch their OWN cart.
// This is NOT where price or final stock gets decided — that
// happens again, securely, at actual checkout.
// ============================================================

/**
 * Gets the current customer's cart, creating one if they don't have
 * one yet. Call this once when the Cart page loads, or before adding
 * the customer's first item.
 */
export async function getOrCreateCart(customerId: string) {
  const { data: existing } = await supabase
    .from('carts')
    .select('id')
    .eq('customer_id', customerId)
    .maybeSingle()

  if (existing) return existing.id

  const { data: created, error } = await supabase
    .from('carts')
    .insert({ customer_id: customerId })
    .select('id')
    .single()

  if (error) throw error
  return created.id
}

/**
 * Returns the cart contents with product details joined in
 * (name, price, image, current stock) - everything the Cart
 * screen needs to display in one call.
 */
export async function getCartItems(cartId: string) {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        id, name, mrp, selling_price, image_url
      )
    `)
    .eq('cart_id', cartId)

  if (error) throw error
  return data
}

/**
 * Adds a product to the cart, or increases quantity if it's
 * already there. Checks current stock first so a customer can't
 * add more than what's actually available at their store.
 */
export async function addToCart(
  cartId: string,
  productId: string,
  storeId: string,
  quantity: number = 1
) {
  // Check real stock before allowing the add
  const { data: inv, error: invError } = await supabase
    .from('inventory')
    .select('stock_quantity')
    .eq('product_id', productId)
    .eq('store_id', storeId)
    .single()

  if (invError) throw invError
  if (!inv || inv.stock_quantity <= 0) {
    throw new Error('This item is currently out of stock.')
  }

  // Check if it's already in the cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('cart_id', cartId)
    .eq('product_id', productId)
    .maybeSingle()

  const newQuantity = (existingItem?.quantity || 0) + quantity

  if (newQuantity > inv.stock_quantity) {
    throw new Error(`Only ${inv.stock_quantity} left in stock.`)
  }

  if (existingItem) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', existingItem.id)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ cart_id: cartId, product_id: productId, quantity })
    if (error) throw error
  }
}

/**
 * Directly sets a cart item's quantity (used by +/- buttons on the
 * Cart screen). Setting quantity to 0 removes the item entirely.
 */
export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    return removeFromCart(cartItemId)
  }
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
  if (error) throw error
}

/**
 * Removes one item from the cart entirely.
 */
export async function removeFromCart(cartItemId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
  if (error) throw error
}
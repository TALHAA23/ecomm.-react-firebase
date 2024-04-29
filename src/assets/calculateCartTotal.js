export default function calculateTotalPrice(items) {
  // Validate input (optional)
  if (!Array.isArray(items)) {
    throw new Error("Input must be an array");
  }

  // Filter items based on 'ready' state
  const readyItems = items.filter((item) => item.ready);
  // Reduce function to sum prices
  const totalPrice = readyItems.reduce((accumulator, currentItem) => {
    const price = parseFloat(currentItem.price);
    if (isNaN(price)) {
      console.warn(
        `Error parsing price for item ${currentItem.id}: ${currentItem.price}`
      );
      return accumulator; // Ignore invalid prices
    }
    const itemQuantity = currentItem.qty || 1;
    return accumulator + price * itemQuantity;
  }, 0);

  return totalPrice;
}

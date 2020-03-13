export function getLastOrderIndex(orders) {
  console.log('last index arr', orders[orders.length - 1].id)
  const lastIndex = orders[orders.length - 1].id
  console.log('last index', lastIndex)
  return lastIndex
}

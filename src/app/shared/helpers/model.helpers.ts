/**
 * Return index of object given list of values and object id.
 *
 * @param {any[]} list
 * @param {string} id
 * @returns {number}
 */
export const getIndex = (list: any[], id: string): number => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) {
      return i;
    }
  }
};
/**
 * Angular Fire cannot do batch updates for objects that have arrays as properties.
 * Remove properties of type array and return updated item.
 *
 * @param item
 * @returns {any}
 */
export const getItemWithoutArrayProperties = (item: any): any => {
  const itemCopy = item;
  Object.keys(itemCopy).forEach((property) => {
    if (Array.isArray(itemCopy[property])) {
      delete itemCopy[property];
    }
  });
  return itemCopy;
};

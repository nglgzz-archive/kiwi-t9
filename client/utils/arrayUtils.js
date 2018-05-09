// Has problems with Date objects, function, circular references, but
// other than that it's fine and it's fast.
// https://stackoverflow.com/a/5344074/3720495
export const clone = (obj = {}) => JSON.parse(JSON.stringify(obj));

// Return the last element of an array. If such element is an object, return a
// deep copy of it.
export const last = (array = []) => array[array.length - 1];

// Return all elements of an array except the last one.
export const exceptLast = (array = []) => array.slice(0, -1);

// Return all elements of an array except the last one.
export const exceptFirst = (array = []) => array.slice(1, array.length);

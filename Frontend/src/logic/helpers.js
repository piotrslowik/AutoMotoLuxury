export const sortObjectsArrayByField = (array, field) => {
    array.sort((obj1, obj2) => (obj1[field] > obj2[field]) ? 1 : -1);
    return array;
}
export const makeObjectLast = (array, field, otherName) => {
    const names = array.map(obj => obj[field]);
    const index = names.indexOf(otherName);
    const other = array.splice(index, 1);
    array.push(other[0]);
    return array;
}
export const isStringInText = (string, text) => {
    return text.toLowerCase().indexOf(string.toLowerCase()) !== -1
}
export const isObjectEmpty = obj => {
    return Object.entries(obj).length === 0;
}
export const arrayToGraphQLString = array => {
    return array.map(el => `"${el}"`);
}
export const objectToGraphQLString = obj => {
  let result = '';
  Object.entries(obj).forEach(entry => {
    const [key, value] = entry;
    result += `${key}: ${typeof value === 'number' ? value : `"${value}"`}`;
  });
  return `{${result}}`;
}
export const formatNumber = number => {
    let spaceIterator = 0;
    let string = number.toString();
    let output = "";
    for (let i = string.length - 1; i >= 0; i--) {
        output = string.charAt(i) + output;
        spaceIterator++;
        if (spaceIterator % 3 === 0 && i !== 0) {
            output = " " + output;
        }
    }
    return output;
}
export const LocalStorageGet = key => {
    return localStorage.getItem(key);
}
export const LocalStorageSave = (key, value) => {
    return localStorage.setItem(key, value);
}
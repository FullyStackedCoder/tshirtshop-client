export const groupBy = (objectArray, property) => {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export const groupByToArray = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property][0]
    if (acc.indexOf(key) === -1) {
      acc.push(key)
    }
  }, []);
}

export const reduceArray = (array) => {
  return array.reduce(function (acc, obj) {
    acc.push(obj.attribute)
    return acc;
  }, []);
}

export const getUnique = (arr, comp) => {

  const unique = arr
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
}
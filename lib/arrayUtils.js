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
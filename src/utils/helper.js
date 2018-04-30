export const chunk = (array, chunkSize) => {
  if(array.length>chunkSize) {
    return [].concat.apply([],
      array.map(function(elem,i) {
          return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
      })
    );
  } else {
    return [].concat([array])
  }
}

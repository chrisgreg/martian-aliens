function getCoordinates(entry, includeOrientation) {
  const values = entry.split(' ');

  const coordinates = {
    x: Number(values[0]),
    y: Number(values[1])
  }

  if (includeOrientation) {
    coordinates.orientation = values[2];
  }

  return coordinates
}

function chunkInstructions(instructions) {
  const results = [];
  while(instructions.length > 0){
    results.push(instructions.splice(0, 2))
  }
  return results;
}


module.exports = {
  getCoordinates,
  chunkInstructions
}

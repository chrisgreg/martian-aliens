function getWorldSize(entry) {
  const values = entry.split(' ');
  return {
    x: values[0],
    y: values[1]
  }
}

function chunkInstructions(instructions) {
  const results = [];
  while(instructions.length > 0){
    results.push(instructions.splice(0, 2))
  }
  return results;
}

module.exports = {
  getWorldSize,
  chunkInstructions
}

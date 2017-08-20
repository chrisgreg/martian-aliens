const fs = require("fs")
const { getWorldSize, chunkInstructions } = require('./utils');

// Read input file
const input = fs.readFileSync('./input.txt', 'utf-8');

// Parse to array
const instructions = input.split('\n')
const worldSizeEntry = instructions.shift();

// Clean input instructions
const filteredInstructions = instructions.filter(l => l !== '');

// Group instructions and determine world size
const worldSizeCoordinates = getWorldSize(worldSizeEntry);
const groupedInstructions = chunkInstructions(filteredInstructions);

// Execute instructions
groupedInstructions.forEach(instruction => {
  console.log(instruction);
  console.log('hi');
})

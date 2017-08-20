const fs = require("fs")
const { getCoordinates, chunkInstructions } = require('./utils');

// Read input file
const input = fs.readFileSync('./input.txt', 'utf-8');

// Parse to array
const instructions = input.split('\n')
const worldSizeEntry = instructions.shift();

// Clean input instructions
const filteredInstructions = instructions.filter(l => l !== '');

// Group instructions and determine world size
const worldSizeCoordinates = getCoordinates(worldSizeEntry);
const groupedInstructions = chunkInstructions(filteredInstructions);

// Execute instructions
groupedInstructions.forEach(instruction => {
  const robotPosition = instruction[0];
  const robotInstructions = instruction[1];

  const initialState = getCoordinates(robotPosition, true)
  const eachInstruction = robotInstructions.split('');

  const finalState = eachInstruction.reduce((currentState, nextInstruction) => {
    return executeInstruction(currentState, nextInstruction)
  }, initialState)

  console.log(finalState);

})



function executeInstruction(currentState, nextInstruction) {

  let { x, y, orientation } = currentState;

  switch (nextInstruction) {
    case 'F':
      if (orientation === 'N') {
        y = y+1;
        break;
      }
      if (orientation === 'S') {
        y = y-1;
        break;
      }
      if (orientation === 'E') {
        x = x+1;
        break;
      }
      if (orientation === 'W') {
        x = x-1;
        break;
      }
      break;

    case 'L':
      if (orientation === 'N') {
        orientation = 'W'
        break;
      }
      if (orientation === 'W') {
        orientation = 'S'
        break;
      }
      if (orientation === 'S') {
        orientation = 'E'
        break;
      }
      if (orientation === 'E') {
        orientation = 'N'
        break;
      }
      break;

    case 'R':
      if (orientation === 'N') {
        orientation = 'E'
        break;
      }
      if (orientation === 'E') {
        orientation = 'S'
        break;
      }
      if (orientation === 'S') {
        orientation = 'W'
        break;
      }
      if (orientation === 'W') {
        orientation = 'N'
        break;
      }
      break;

    default:
      return currentState;
  }

  const newState = {
    x,
    y,
    orientation
  }

  return newState;
}

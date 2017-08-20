const fs = require("fs")
const { getCoordinates, chunkInstructions, reportRobotState } = require('./utils');
const { turnLeft, turnRight, moveForward } = require('./instructions');

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

  // Current coordinates of the robot including orientation
  const initialState = getCoordinates(robotPosition, true)
  const eachInstruction = robotInstructions.split('');

  // Reduce through instructions and apply to robot state
  const finalState = eachInstruction.reduce((currentState, nextInstruction) => {
    if (currentState.lost === true) {
      return currentState
    }
    return executeInstruction(currentState, nextInstruction)
  }, initialState)

  // Final report on robot status
  reportRobotState(finalState);
})


function executeInstruction(currentState, nextInstruction) {
  let newState = {};

  switch (nextInstruction) {
    case 'F':
      newState = moveForward(currentState, worldSizeCoordinates);
      break;

    case 'L':
      newState = turnLeft(currentState);
      break;

    case 'R':
      newState = turnRight(currentState);
      break;

    default:
      return currentState;
  }

  return newState;
}

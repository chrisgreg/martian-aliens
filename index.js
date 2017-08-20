const fs = require("fs")
const { getCoordinates, chunkInstructions, reportRobotState } = require('./utils');

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

const lostCoordinates = [];

// Execute instructions
groupedInstructions.forEach(instruction => {
  const robotPosition = instruction[0];
  const robotInstructions = instruction[1];

  const initialState = getCoordinates(robotPosition, true)
  const eachInstruction = robotInstructions.split('');

  const finalState = eachInstruction.reduce((currentState, nextInstruction) => {
    if (currentState.lost === true) {
      return currentState
    }
    return executeInstruction(currentState, nextInstruction)
  }, initialState)

  reportRobotState(finalState);
})


function moveForward(currentState) {
  let { x, y, orientation } = currentState;
  let lost = false;
  let newY = y
  let newX = x;

  switch (orientation) {
    case 'N':
      newY = y + 1;
      if (newY > worldSizeCoordinates.y) {
        lost = true;
      }
      break;

    case 'S':
      newY = y - 1;
      if (newY < 0) {
        lost = true;
      }
      break;

    case 'E':
      newX = x + 1;
      if (newX > worldSizeCoordinates.x) {
        lost = true;
      }
      break;

    case 'W':
      newX = x - 1;
      if (newX < 0) {
        lost = true;
      }
      break;

    default:
      return currentState;
  }

  const nextState = {
    x: newX,
    y: newY,
    orientation
  }

  // if next state is in lost coordinates
  const dangerousNextState = (nextState) => {
    return lostCoordinates.find(lost => {
      return lost.orientation === orientation && lost.x === x && lost.y === y
    })
  }

  if (dangerousNextState(nextState)) {
    return {
      ...currentState
    }
  }

  if (lost === true) {
    lostCoordinates.push({
      x,
      y,
      orientation
    });

    return {
      ...currentState,
      lost: true
    }
  }

  return {
    ...nextState,
    lost
  }
}

function turnLeft(currentState) {
  let { x, y, orientation } = currentState;

  switch (orientation) {
    case 'N':
      orientation = 'W'
      break;

    case 'S':
      orientation = 'E'
      break;

    case 'E':
      orientation = 'N'
      break;

    case 'W':
      orientation = 'S'
      break;

    default:
      return currentState;
  }

  return {
    x,
    y,
    orientation
  }
}


function turnRight(currentState) {
  let { x, y, orientation } = currentState;

  switch (orientation) {
    case 'N':
      orientation = 'E'
      break;

    case 'S':
      orientation = 'W'
      break;

    case 'E':
      orientation = 'S'
      break;

    case 'W':
      orientation = 'N'
      break;

    default:
      return currentState;
  }

  return {
    x,
    y,
    orientation
  }
}


function executeInstruction(currentState, nextInstruction) {

  let newState = {};

  switch (nextInstruction) {
    case 'F':
      newState = moveForward(currentState);
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

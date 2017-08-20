const lostCoordinates = [];

function moveForward(currentState, worldSizeCoordinates) {
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

  const futureState = {
    x: newX,
    y: newY,
    orientation
  }

  // check if next state is in lost coordinates
  const dangerousNextState = (futureState) => {
    return lostCoordinates.find(lost => {
      return lost.orientation === orientation && lost.x === x && lost.y === y
    })
  }

  // Don't continue if next state is dangerous
  if (dangerousNextState(futureState)) {
    return {
      ...currentState
    }
  }

  // Add a new value to dangerous coordinates if now lost
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
    ...futureState,
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

module.exports = {
  turnRight,
  turnLeft,
  moveForward
}

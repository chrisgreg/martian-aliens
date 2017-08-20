const { turnLeft, turnRight, moveForward } = require('../instructions');

describe('Instructions', () => {
  describe('turnLeft', () => {
    test('orientates correctly', () => {
      let currentState = { orientation: 'N' };
      expect(turnLeft(currentState)).toEqual({orientation: 'W'});

      currentState.orientation = 'W'
      expect(turnLeft(currentState)).toEqual({orientation: 'S'});

      currentState.orientation = 'S'
      expect(turnLeft(currentState)).toEqual({orientation: 'E'});

      currentState.orientation = 'E'
      expect(turnLeft(currentState)).toEqual({orientation: 'N'});
    })
  });

  describe('turnRight', () => {
    test('orientates correctly', () => {
      let currentState = { orientation: 'N' };
      expect(turnRight(currentState)).toEqual({orientation: 'E'});

      currentState.orientation = 'W'
      expect(turnRight(currentState)).toEqual({orientation: 'N'});

      currentState.orientation = 'S'
      expect(turnRight(currentState)).toEqual({orientation: 'W'});

      currentState.orientation = 'E'
      expect(turnRight(currentState)).toEqual({orientation: 'S'});
    })
  });

  describe('moveForward', () => {
    const worldSizeCoordinates = { x: 5, y: 3 };

    describe('correctly moves based on orientation', () => {
        test('Moves north', () => {
          let currentState = {
            x: 0,
            y: 0,
            orientation: 'N'
          }

          expect(moveForward(currentState, worldSizeCoordinates)).toEqual({
            x: 0,
            y: 1,
            orientation: 'N',
            lost: false
          })
        })

        test('Moves south', () => {
          let currentState = {
            x: 0,
            y: 1,
            orientation: 'S'
          }

          expect(moveForward(currentState, worldSizeCoordinates)).toEqual({
            x: 0,
            y: 0,
            orientation: 'S',
            lost: false
          })
        })

        test('Moves east', () => {
          let currentState = {
            x: 0,
            y: 1,
            orientation: 'E'
          }

          expect(moveForward(currentState, worldSizeCoordinates)).toEqual({
            x: 1,
            y: 1,
            orientation: 'E',
            lost: false
          })
        })

        test('Moves west', () => {
          let currentState = {
            x: 1,
            y: 1,
            orientation: 'W'
          }

          expect(moveForward(currentState, worldSizeCoordinates)).toEqual({
            x: 0,
            y: 1,
            orientation: 'W',
            lost: false
          })
        })
    })

    describe('lost state', () => {

      test('reports lost state and doesn\'t proceed', () => {
        const currentState = {
          x: 5,
          y: 3,
          orientation: 'N'
        }
        expect(moveForward(currentState, worldSizeCoordinates)).toEqual({
          x: 5,
          y: 3,
          orientation: 'N',
          lost: true
        })
      })
    })
  });
})

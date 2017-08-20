const { getCoordinates, chunkInstructions, reportRobotState } = require('../utils');

describe('Utils', () => {
  describe('getCoordinates', () => {
    test('returns coordinates without orientation', () => {
      const entry = '1 0';
      expect(getCoordinates(entry)).toEqual({
        x: 1,
        y: 0
      })
    })
    test('returns coordinates with orientation', () => {
      const entry = '1 0 N';
      expect(getCoordinates(entry, true)).toEqual({
        x: 1,
        y: 0,
        orientation: 'N'
      })
    })
  });

  describe('chunkInstructions', () => {
    test('returns chunked array with instructions', () => {
      const instructions = [
        '1 1 E',
        'RFRFRFRF',
        '3 2 N',
        'FRRFLLFFRRFLL',
        '0 3 W',
        'LLFFFLFLFL'
      ];
      expect(chunkInstructions(instructions)).toEqual(
        [["1 1 E", "RFRFRFRF"], ["3 2 N", "FRRFLLFFRRFLL"], ["0 3 W", "LLFFFLFLFL"]]
      )
    })
  });

  describe('reportRobotState', () => {
    test('returns a properly formatted string which isn\'t lost', () => {
      const instructions = {
        x: 1,
        y: 0,
        orientation: 'N'
      }
      expect(reportRobotState(instructions)).toEqual(
        '1 0 N'
      )
    })

    test('returns a properly formatted string which is lost', () => {
      const instructions = {
        x: 1,
        y: 0,
        orientation: 'N',
        lost: true
      }
      expect(reportRobotState(instructions)).toEqual(
        '1 0 N LOST'
      )
    })
  });
})

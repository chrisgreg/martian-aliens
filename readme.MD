# Martian Aliens


### How to run
- Input all instructions into input.txt
- `nvm use`
- `npm install` or `yarn install`
- `npm start` or `yarn start`

### Testing
- `npm test` or `yarn test`


### Notes:
- Using babel for jest due to my use of the spread operator - didn't want to babelify actual execution hence the `const { .. } = require('..')` instead of `import .. from ..`


### With more time I would have:
- Implemented end-to-end tests
- Written more unit tests (specifically lost state ones)
- Refactored the logic to chunk the instructions (not hard coded to a size split)
- Used constants for orientation i.e. `const Orientation.North = 'N'` instead of just a string.

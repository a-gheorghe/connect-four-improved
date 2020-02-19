# Ana's Connect Four Solution #

Connect Four with React

Connect Four is a game where each player tries to get 4 pieces of their own colour in a row either vertically, horizontally, or diagonally.

In this repo, most of the logic for the game can be found in src/Components/Board.js. The other components in the Components folder are primarily presentational.

To run the project:

```
git clone https://github.com/a-gheorghe/connect-four.git
cd connect-four
npm i
npm start
```

# Technical decisions #
- Using React framework, upgraded to 16.8+ to use Hooks. We have started using Hooks recently at work and I wanted to take the opportunity to familiarize myself with them further.

# Tasks still yet to be done: #
- Writing tests (either Enzyme/Jest or react-testing-library because I've heard good things and want to try it out!)

- Accessibility improvements - can navigate by keyboard and some screenreader aria-live regions, but not tested. Colour contrast could definitely be improved.

- General UI styling should be refined:
  - focus state on the individual buttons. I'd like to ideally be able to highlight the entire column instead of one button at a time
  - responsiveness layout

- Animations!! It would be fun to animate the chips being dropped into the board, and them being removed by a sliding lever under the board.

- Personalization - have players input their names, choose a color palette for theselves

-----------------------------------------------------------------------------------------------------------------------

# Cognite interview workspace

This boilerplate is provided for candidates before interviews so we can spend as much time as possible doing interesting stuff in the interview.

If you prefer to set up something on your own, feel free to do so.
We don't require you to use React, but make sure that your enviroment is set up and ready to go.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Preparing for the interview

Set this up on your local machine and make sure that you can run the application.  
Running `npm start` should show you a working application on [http://localhost:3000](http://localhost:3000)  
This should reload automatically with any changes you make.

Running `npm test` should run tests from all files of the form `*.test.js`

Feel free to add any tooling you want, and make sure that your editor is set up for you to work efficiently.
# connect-four

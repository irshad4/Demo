// Unit tests for Snake Game

const game = require('./snake-game'); // Assuming you have a main game file named snake-game.js

describe('Snake Game', () => {
  let snake;
  let food;

  beforeEach(() => {
    snake = game.initializeSnake(); // Function to initialize the snake
    food = game.placeFood(); // Function to place food
  });

  test('Should move the snake', () => {
    snake.move(); // Move the snake
    expect(snake.position).toEqual([{x: 1, y: 0}]); // Adjust expectation as necessary
  });

  test('Should detect collision with wall', () => {
    snake.move('up'); // Move snake up to collide with wall
    expect(game.isGameOver(snake)).toBe(true);
  });

  test('Should detect collision with itself', () => {
    snake.grow(); // Grow the snake
    snake.move(); // Move the snake
    expect(game.isGameOver(snake)).toBe(false); // Not a collision yet
    snake.move(); // Move into itself
    expect(game.isGameOver(snake)).toBe(true);
  });

  test('Should consume food and grow', () => {
    const initialLength = snake.length;
    snake.move(); // Move to the food position
    game.eatFood(snake, food); // Function to consume food

    expect(snake.length).toBe(initialLength + 1);
  });

  test('Should update game state correctly', () => {
    game.updateState(snake, food);
    expect(game.state.snakePosition).toEqual(snake.position);
    expect(game.state.foodPosition).toEqual(food.position);
  });
});
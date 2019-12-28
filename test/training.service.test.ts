import { Test, TestingModule } from '@nestjs/testing';
const {findTraining} = require('../src/trainings/trainings.service');

describe('Find training', () => {
  it('should return training data for exist user', () => {
    expect(findTraining(1, '1')).toBe('Could not find training or user.');
  });
});

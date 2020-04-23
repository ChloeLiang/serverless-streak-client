import amplify from 'aws-amplify';
import { AWS } from '../../constants/enum';
import * as goalService from '../../services/goal';

jest.mock('aws-amplify');

afterEach(jest.resetAllMocks);

it('should call create goal endpoint', async () => {
  const goal = {
    title: 'title',
  };
  await goalService.createGoal(goal);
  expect(amplify.API.post).toHaveBeenCalledTimes(1);
  expect(amplify.API.post).toHaveBeenCalledWith(AWS.API_NAME, '/goals', {
    body: {
      content: goal,
    },
  });
});

it('should call get goals endpoint', async () => {
  await goalService.getGoals();
  expect(amplify.API.get).toHaveBeenCalledTimes(1);
  expect(amplify.API.get).toHaveBeenCalledWith(AWS.API_NAME, '/goals', null);
});

it('should call get goal endpoint', async () => {
  await goalService.getGoal('id');
  expect(amplify.API.get).toHaveBeenCalledTimes(1);
  expect(amplify.API.get).toHaveBeenCalledWith(AWS.API_NAME, '/goals/id', null);
});

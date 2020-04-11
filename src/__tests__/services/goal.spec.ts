import amplify from 'aws-amplify';
import AWS from '../../constants/aws';
import * as goalService from '../../services/goal';

jest.mock('aws-amplify');

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

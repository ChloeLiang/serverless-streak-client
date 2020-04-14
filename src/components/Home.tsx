import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from 'react';
import AuthContext from '../contexts/AuthContext';
import { getGoals } from '../services/goal';
import { GoalResponse } from '../constants/interface';
import GoalsList from './GoalsList';

const Home: FunctionComponent = () => {
  const [isAuthenticated] = useContext(AuthContext);

  const [goals, setGoals] = useState<GoalResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const goals = await getGoals();
        setGoals(goals);
      } catch (e) {
        // TODO: handle error
        console.error(e);
      }
      setIsLoading(false);
    };
    onLoad();
  }, [isAuthenticated, goals]);

  const renderGoalsList = (goals: GoalResponse[]) => {
    return (
      <div className="Home__goals-container">
        <GoalsList title="Upcoming" goals={goals} />
        <GoalsList title="In Progress" goals={goals} />
        <GoalsList title="Done" goals={goals} />
      </div>
    );
  };

  const renderLander = () => {
    return (
      <div className="Home__landing">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Streak</span>
          <span className="heading-primary--sub">
            A Simple Goal Tracking App
          </span>
        </h1>
      </div>
    );
  };

  const renderGoals = () => {
    return !isLoading && renderGoalsList(goals);
  };

  return (
    <div className="Home">
      {isAuthenticated ? renderGoals() : renderLander()}
    </div>
  );
};

export default Home;

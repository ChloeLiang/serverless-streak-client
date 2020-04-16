import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from 'react';
import AuthContext from '../contexts/AuthContext';
import GoalsList from './GoalsList';
import { getGoals } from '../services/goal';
import { GoalResponse } from '../constants/interface';
import { goalCategory } from '../constants/enum';
import getGoalsInList from '../utils/getGoalsInList';

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
        <GoalsList
          title={goalCategory.UPCOMING}
          goals={getGoalsInList(goals, goalCategory.UPCOMING)}
        />
        <GoalsList
          title={goalCategory.IN_PROGRESS}
          goals={getGoalsInList(goals, goalCategory.IN_PROGRESS)}
        />
        <GoalsList
          title={goalCategory.DONE}
          goals={getGoalsInList(goals, goalCategory.DONE)}
        />
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

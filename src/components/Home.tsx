import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from 'react';
import AuthContext from '../contexts/AuthContext';
import { getGoals } from '../services/goal';

const Home: FunctionComponent = () => {
  const [isAuthenticated] = useContext(AuthContext);

  const [goals, setGoals] = useState([]);
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
  }, [isAuthenticated]);

  const renderGoalsList = (goals: any) => {
    return <p>Goals</p>;
  };

  const renderLander = () => {
    return (
      <h1 className="heading-primary">
        <span className="heading-primary--main">Streak</span>
        <span className="heading-primary--sub">A Simple Goal Tracking App</span>
      </h1>
    );
  };

  const renderGoals = () => {
    return <div>{!isLoading && renderGoalsList(goals)}</div>;
  };

  return (
    <div className="Home">
      {isAuthenticated ? renderGoals() : renderLander()}
    </div>
  );
};

export default Home;

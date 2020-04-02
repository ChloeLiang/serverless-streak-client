import React, { FunctionComponent } from 'react';
import './Home.css';

const Home: FunctionComponent = () => {
  return (
    <div className="Home">
      <div className="lander">
        <h1 className="heading-primary">Streak</h1>
        <p className="heading-secondary">A Simple Goal Tracking App</p>
      </div>
    </div>
  );
};

export default Home;

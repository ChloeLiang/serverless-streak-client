import React, { FunctionComponent } from 'react';

const Home: FunctionComponent = () => {
  return (
    <div className="Home">
      <div className="lander">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Streak</span>
          <span className="heading-primary--sub">
            A Simple Goal Tracking App
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Home;

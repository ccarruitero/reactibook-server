import React, { Fragment, useState } from 'react';
import Header from './shared/Header';
import EditablePost from './EditablePost';

const Dashboard = () => {
  return (
    <Fragment>
      <Header
        title='Dashboard'
      />
      <EditablePost />
    </Fragment> 
  );
};

export default Dashboard;

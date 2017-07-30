import React from 'react';
import { render } from 'react-dom';
import store from 'stores';
import Application from 'components/Application';

render(
  <Application store={ store } />,
  document.getElementById('root')
);

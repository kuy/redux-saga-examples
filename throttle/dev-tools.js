import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// import SagaVisualizer from 'redux-devtools-saga-visualizer';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' changeMonitorKey='ctrl-m'>
    // <SagaVisualizer theme='tomorrow' />
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools;

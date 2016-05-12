export const numOfRunning = state => state.jobs.filter(j => j.status === 'running').length;
export const pending = state => state.jobs.filter(j => j.status === 'pending');

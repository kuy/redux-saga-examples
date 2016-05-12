export const numOfRunning = state => state.throttle.jobs.filter(j => j.status === 'running').length;
export const pending = state => state.throttle.jobs.filter(j => j.status === 'pending');
export const limit = state => state.throttle.limit;
export const job = id => state => {
  const jobs = state.throttle.jobs.filter(job => job.id === id);
  if (jobs.length !== 1) {
    throw `ERROR: Job #${id} not found`
  }
  return jobs[0];
};

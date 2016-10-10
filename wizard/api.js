export function verify(email) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (email === 'ok@example.com') {
        resolve({ data: 'SECRET CODE' });
      } else {
        resolve({ error: 'ERROR: something wrong' });
      }
    }, 5000);
  });
}

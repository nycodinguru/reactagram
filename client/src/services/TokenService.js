export default {
  save(token) {
    window.localStorage.setItem('authToken', token); // store token in localStorage under the 'authToken' key

  },

  read() {
    return window.localStorage.getItem('authToken') || ''; // fetch the token out of localStorage

  },

  destroy() {
    window.localStorage.removeItem('authToken'); // delete the token
  },

};

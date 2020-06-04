const domUpdates = {
  submitLogin(param) {
    let login = document.querySelector('.login-container');
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let traveler = document.querySelector('.traveler');
    let agency = document.querySelector('.agent');

    if (username === 'agency' && password === 'travel2020') {
      agency.classList.remove('hidden')
      login.classList.add('hidden')
    } else if (username.includes(param) && password === 'travel2020') {
      traveler.classList.remove('hidden')
      login.classList.add('hidden')
    } else {
      alert('Incorrect username or password');
    }
  }
}
//username.includes([array of ids])
export default domUpdates;
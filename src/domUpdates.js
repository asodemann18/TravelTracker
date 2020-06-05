const domUpdates = {
  submitLogin() {
    const login = document.querySelector('.login-container');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const traveler = document.querySelector('.traveler');
    const agency = document.querySelector('.agent');
    if (username === 'agency' && password === 'travel2020') {
      agency.classList.remove('hidden')
      login.classList.add('hidden')
      return 'agent' 
    } else if (username.includes('traveler') && 
              (username.split("traveler")[1] < 51 && username.split("traveler")[1] > 0) &&
               password === 'travel2020') {
      traveler.classList.remove('hidden')
      login.classList.add('hidden')
      //console.log(username.split("traveler")[1]);
      return username
    } else {
      alert('Incorrect username or password');
    }
  }
}
//username.includes([array of ids])
export default domUpdates;
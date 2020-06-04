class Users {
  constructor(allUserData) {
    this.users = allUserData;
  }

  checkLogin(username, password) {
    if (this.username === username && this.password === password) {
      return true
    } else {
      alert('error')
    }
  }
}

export default Users;
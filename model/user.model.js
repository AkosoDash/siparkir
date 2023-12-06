class User {
  constructor(id, email, username, password, level) {
    (this.id = id),
      (this.email = email),
      (this.username = username),
      (this.password = password),
      (this.level = level);
  }
}

export default User;

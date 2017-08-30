export class DjangoUser {
  constructor (protected username: String, protected password: String) {}
  
  public getUsername() {
    return this.username;
  }
  
  public getPassword() {
    return this.password;
  }

  public toJson() {
    return JSON.stringify(this);
  }

}

export class User {
  sub: String = '';
  roles: String[] = [];


  constructor(sub: String, role: String[]) {
    this.sub = sub;
    this.roles = role;
  }
}

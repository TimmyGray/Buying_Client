export class Client {
  constructor(
    public _id: string,
    public login: string,
    public email: string,
    public password: string) { }
}

export class RegInfo extends Client {

  confirmPass: string = ''

}

import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http:HttpClient) { }
  private urlUser = environment.rootURL+"/users";

  private _users: Array<User>;
  private _loggedUser : User;

  public getAllUsers(){
    return this.http.get(this.urlUser+'/')
  }
  public getProfileInfos() {
    if(this._loggedUser ==! null){
      return {...this._loggedUser};
    }
    return null;
  }


  get loggedUser(): User {
    if(this._loggedUser === null)
      return new User();
    return this._loggedUser;
  }

  set loggedUser(value: User) {
    this._loggedUser = value;
  }

  get users(): Array<User> {
    if(this._users === null)
      return new Array<User>();
    return this._users;
  }

  set users(value: Array<User>) {
    this._users = value;
  }
}

import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlUser = environment.rootURL+"/users";
  private _currentUser: User;
  constructor(private http:HttpClient) { }

  public readProfile(){
    return this.http.get<User>(this.urlUser+'/me/')
  }
  public loginUser(user:User){
    return this.http.post(this.urlUser+'/login',user);
  }
  public logoutUser(){
    return this.http.post(this.urlUser+'/logout',{});
  }
  public logoutAllUser(){
    return this.http.post(this.urlUser+'/logoutAll',{});
  }
  public register(user:User){
    return this.http.post(this.urlUser,user);
  }

  // public sortTasks(condition:string){
  //   const url= environment.rootURL;
  //   switch (condition) {
  //     case 'completed:desc':
  //   }
  //
  // }




  get loggedUser(): User {
    if(this._currentUser === null)
      return new User();
    return this._currentUser;
  }

  set loggedUser(value: User) {
    this._currentUser = value;
  }

}

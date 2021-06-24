import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http:HttpClient) { }

  private urlUser = environment.rootURL+"/user";
  private userLabel = "user";
  private tokenLabel = "token";
}

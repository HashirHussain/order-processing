import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppHttpService } from '../utils/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  result: any[];
  constructor(private http: HttpClient,
    private _http: AppHttpService) { }

  getUsersList(searchUser): Observable<any> {
    return this.http.get('https://tph-usersservice.azurewebsites.net/api/users/search?userName=' + searchUser)
  }

  /**
   * @description Service method to get Task List
   * @author Krunal Shriram Sakharkar
   * @date 2020-05-07
   * @param {*} payload
   * @returns
   * @memberof UsersService
   */
  getTasksList(payload) {
    console.log('payload', payload);
    return this.http.get('https://tph-userdashboard-tasktrackingservice.azurewebsites.net/api/v1/userdashboard/tasktrackings?' + payload);
    // return this._http.get('api/v1/userdashboard/tasktrackings?' + payload)
  }


}

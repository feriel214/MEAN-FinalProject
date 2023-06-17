import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private _http: HttpClient) {}
  

  url='http://localhost:5000/TAManagement/session/';

  addSession(data: any): Observable<any> {
    console.log("session data ",data);
    return this._http.post( this.url + 'ajout', data);
  }

  updateSession(id: number, data: any): Observable<any> {
    return this._http.put(this.url + 'update/' + id , data);
  }

  getSessionList(): Observable<any> {
    return this._http.get(this.url + 'all');
  }

  deleteSession(id: number): Observable<any> {
    return this._http.delete(this.url + 'supprimer/' + id);
  }
}

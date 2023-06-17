import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private _http: HttpClient) {}
  

  url='http://localhost:5000/TAManagement/formation/';

  addFormation(data: any): Observable<any> {
    console.log("formation data ",data);
    return this._http.post( this.url + 'ajout', data);
  }

  updateFormation(id: number, data: any): Observable<any> {
    return this._http.put(this.url + 'update/' + id , data);
  }

  getFormationList(): Observable<any> {
    return this._http.get(this.url + 'all');
  }

  deleteFormation(id: number): Observable<any> {
    return this._http.delete(this.url + 'supprimer/' + id);
  }
}

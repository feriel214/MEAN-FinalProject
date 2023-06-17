import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private _http: HttpClient) {}
  

  url='http://localhost:5000/TAManagement/employe/';

  addEmployee(data: any): Observable<any> {
    console.log("employee data ",data);
    return this._http.post( this.url + 'ajout', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(this.url + 'update/' + id , data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.url + 'all');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(this.url + 'supprimer/' + id);
  }
}

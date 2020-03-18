import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosPersonales } from 'src/modelo/datosPersona';


@Injectable({
  providedIn: 'root'
})
export class DatosPersonaService {

  url:string ="http://localhost:8080/apiBackend";
  constructor(private http:HttpClient) { }

  getAll() :Observable<any>{
    return this.http.get(this.url +"/listar");
  }

  save(datosPersonales: DatosPersonales) :Observable<any>{
       let headers = new HttpHeaders();
       headers = headers.set('Content-Type','application/json');
       return this.http.post(this.url +"/registro", JSON.stringify(datosPersonales),{headers: headers});
  }
}

import { Component, OnInit } from '@angular/core';
import { DatosPersonales } from 'src/modelo/datosPersona';
import { DatosPersonaService } from '../service/datos-persona.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  datosP: DatosPersonales[];
  items: MenuItem[];
  displaySave: boolean = false;
  datos: DatosPersonales = {
   id:null,
   nombre: null,
   apellido:null,
   procesado:null
 }; 

  constructor(private datosPersonaService: DatosPersonaService) { }

  getAll() {
    this.datosPersonaService.getAll().subscribe(
      (result: any) => {
        let datosP: DatosPersonales[] = [];
        for (let i = 0; i < result.length; i++) {
          let datosPersona = result[i] as DatosPersonales;
          datosP.push(datosPersona);
        }
        this.datosP = datosP;
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarModal() {
    this.displaySave =true;
  }

  save(){
    this.datosPersonaService.save(this.datos).subscribe(
      (result: any) => {
        let datos = result as DatosPersonales;
        this.datosP.push(datos);
        this.displaySave = false;
        },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getAll();

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.guardarModal()
      }
    ]
  }
}
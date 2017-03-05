import { Component } from '@angular/core';
import {FormControl,Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import {Resultados} from  './../resultados/resultados';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Nombre: any="";
  public Email: any="";
  public FechaN:any="";
  public EC:any="";
  public Genero:any="";
  public Intereses:any={};


  
  private Formulario : FormGroup;
  
  constructor( private formBuilder: FormBuilder ,public navCtrl: NavController) {
    this.Formulario = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Email:  ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      FechaN: ['', Validators.required],
      EC :    ['', Validators.required],
      Genero: ['', Validators.required],
      //se añade un control  de tipo formgroup (formgroup anidado) con los intereses dentro de este formgroup (que son controles)
      Intereses: this.formBuilder.group({
        Politica: false,
        Musica: false,
        Otros: false
      }, {//Se añade el validator que retorna lo del metodo validateInterests (final de archivo)
        validator: (formGroup: FormGroup) => {
          return this.validateIntereses(formGroup);
        }
      })
  
     

    });
    this.Nombre = this.Formulario.controls['Nombre'];
    this.Email = this.Formulario.controls['Email'];
    this.FechaN = this.Formulario.controls['FechaN'];
    this.EC = this.Formulario.controls['EC'];
    this.Genero = this.Formulario.controls['Genero'];
    this.Intereses = this.Formulario.controls['Intereses'];
  }

sendData() {
    let data = {
      Nombre: this.Nombre.value,
      Email: this.Email.value,
      FechaN: this.FechaN.value,
      EC: this.EC.value,
      Genero: this.Genero.value,
      Intereses: this.Intereses.value
    };
    console.log(data);
    this.navCtrl.push(Resultados,data);

  }

//Recorre los controles del formGroup
  private validateIntereses(formGroup: FormGroup) {
  for (let key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      let control: FormControl = <FormControl>formGroup.controls[key];
      if (control.value) {
        //Si el value del control es 'true' quiere decir que al menos uno esta seleccionado sino
        return null;
      }
    }
  }
  //retorna false
  return {
    validateDays: {
      valid: false
    }
  };
}
}

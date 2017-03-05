import{ Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'resultados',
    templateUrl:'resultados.html'
})

export class Resultados{
  
    constructor(public navCtrl: NavController, public params:NavParams){}
    
     ionViewDidLoad() {
    console.log('ionViewDidLoad Resultados');
  }
}
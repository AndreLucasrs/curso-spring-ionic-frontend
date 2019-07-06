import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// Para gerar um component pelo terminal basta usar o comando
// ionic g page categorias --- nesse caso foi usado para gerar categorias
@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public categoriaService: CategoriaService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log('Resposta ', response);
      },
      error => {
        console.log('ERROR ', error);
      }
    );
  }

}

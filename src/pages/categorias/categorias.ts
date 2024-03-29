import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

// Para gerar um component pelo terminal basta usar o comando
// ionic g page categorias --- nesse caso foi usado para gerar categorias
@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public categoriaService: CategoriaService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
      }
    );
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }

}

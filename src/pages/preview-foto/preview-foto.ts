import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreviewFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-preview-foto',
  templateUrl: 'preview-foto.html',
})
export class PreviewFotoPage {	
	data_list:any = [];
	text:any;
	image:any;
	index_image:any=-1;
	disablePrev:any = true;
	disableNext:any = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.data_list = navParams.get("data");  
  	console.log(this.data_list);
  	this.init();
  }

  init() {
  	      
  	console.log(this.data_list);
  	if ("length" in this.data_list && this.data_list.length > 0) {
  		if (this.data_list.length > 0) {
	        this.setDocument(0);        
	      }
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewFotoPage');
  }

  setDocument(index) {
    if (this.data_list.length > 0) {      
      let dok = this.data_list[index];
      this.text = dok.text;
      this.image = dok.image;
      this.index_image = index;              
    }

    if (this.index_image == 0) {
      this.disablePrev = true;
    } else {
      this.disablePrev = false;
    }

    if ((this.index_image+1) == this.data_list.length) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  prevDocument() {
    this.setDocument(this.index_image-1);
  }

  nextDocument() {
    this.setDocument(this.index_image+1);
  }

}

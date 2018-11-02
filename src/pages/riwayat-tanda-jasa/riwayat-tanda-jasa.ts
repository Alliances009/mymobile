import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';

import { DokumenPage } from '../dokumen/dokumen';
/**
 * Generated class for the RiwayatTandaJasaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-riwayat-tanda-jasa',
  templateUrl: 'riwayat-tanda-jasa.html',
})
export class RiwayatTandaJasaPage {
	  data_list:any;
  	data:any;
    page:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider) {
  	this.data = navParams.data.item;  	
    this.page = navParams.data.page;
  	this.getData(this.data.PERSONELID);
  }

  ionViewDidLoad() {
    
  }

   getData(pid) {
      var me = this;
      let maskLoading = this.app_config.showLoading('Proses'),
          params = {
            pgid: btoa(pid)
          }      
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/drh/tandajasa/App/get",params,function(result){

      	 let data = [];
      	 result.data.forEach(function(row){      	 	
           if (row.TMTTANDAJASA != null) {             
             let tgl_tmt = me.app_config.split_date_indo(row.TMTTANDAJASA,'-',1);
             row.TMTTANDAJASA_TANGGAL = tgl_tmt[0];
             row.TMTTANDAJASA_BULAN = tgl_tmt[1].substr(0,3);
             row.TMTTANDAJASA_TAHUN = tgl_tmt[2];
           }
          row.hasDocument = ' bg-green ';
          row.classLeft = ' ls-tmt col ';
          row.classLeft += row.hasDocument;
      	 	row = me.app_config.ifvallnull(row,'-');
      	 	data.push(row);
      	 })      	 
          me.data_list = data;          
          setTimeout(() => {
            maskLoading.dismiss();            
          }, 500);  
      });

  }

  openMenu() {
    this.app_config.openMenuRiwayat(this.data);
  }

  clickDocument(e,dt) {        
    dt.ID_PAGE = this.page.id_page;
    this.navCtrl.push(DokumenPage, {
      item: dt
    });    
  }

}
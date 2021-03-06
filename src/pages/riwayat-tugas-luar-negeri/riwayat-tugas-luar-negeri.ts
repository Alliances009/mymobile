import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';

import { DokumenPage } from '../dokumen/dokumen';
/**
 * Generated class for the RiwayatTugasLuarNegeriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-riwayat-tugas-luar-negeri',
  templateUrl: 'riwayat-tugas-luar-negeri.html',
})
export class RiwayatTugasLuarNegeriPage {
	data_list:any = [];
  data:any;
  page:any;
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider) {
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
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/drh/tugas_ln/App/get",params,function(result){

      	 let data = [];
      	 result.data.forEach(function(row){      	 	
      	 	if (row.AWAL != null) {      	 		
	      	 	let tgl_tmt = me.app_config.split_date_indo(row.AWAL,'-',1);
	      	 	row.AWAL_TANGGAL = tgl_tmt[0];
	      	 	row.AWAL_BULAN = tgl_tmt[1].substr(0,3);
	      	 	row.AWAL_TAHUN = tgl_tmt[2];
      	 	}
          row.hasDocument = ' ';
           row.classLeft = ' ls-tmt col ';
           if (row.EXISTS_FILE_MOBILE != null) {            
            row.hasDocument = ' bg-green ';                        
           }
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
    this.app_config.setContent("viewCtrl",this.viewCtrl);
    this.app_config.openMenuRiwayat(this.data);
  }

  clickDocument(e,dt) {        
    if (dt.EXISTS_FILE_MOBILE != null && dt.EXISTS_FILE_MOBILE != '-') {        
      dt.ID_PAGE = this.page.id_page;
      this.navCtrl.push(DokumenPage, {
        item: dt
      });    
    }
  }

}

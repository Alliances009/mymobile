import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';

import { DokumenPage } from '../dokumen/dokumen';
/**
 * Generated class for the RiwayatPrestasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-riwayat-prestasi',
  templateUrl: 'riwayat-prestasi.html',
})
export class RiwayatPrestasiPage {
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
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/drh/prestasi/App/get",params,function(result){

      	 let data = [];
      	 result.data.forEach(function(row){      	 	
           // if (row.MULAI != null) {             
           //   let tgl_tmt = me.app_config.split_date_indo(row.MULAI,'-',1);
           //   row.MULAI_TANGGAL = tgl_tmt[2];
           //   row.MULAI_BULAN = tgl_tmt[1].substr(0,3);
           //   row.MULAI_TAHUN = tgl_tmt[0];
           // }
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

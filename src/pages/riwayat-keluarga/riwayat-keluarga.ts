import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';

import { DokumenPage } from '../dokumen/dokumen';
/**
 * Generated class for the RiwayatKeluargaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-riwayat-keluarga',
  templateUrl: 'riwayat-keluarga.html',
})
export class RiwayatKeluargaPage {
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
          list_tampil = [1,2], // 1 Suami/Istri, 2 Anak, 3 Orang Tua. 4 Mertua, 5 Saudara
          params = {
            pgid: btoa(pid)
          }      
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/drh/keluarga/App/get",params,function(result){

      	 let data = [],
      	 	 jk_list =  {
      	 	 	L:'Laki-laki',
      	 	 	P:'Perempuan',
      	 	 };
      	 result.data.forEach(function(row){  
           if (list_tampil.indexOf(row.urutan) !== -1) {            
        	 	if (row.TGLLAHIR != null) {      	 		
  	      	 	let tgl_lahir = me.app_config.split_date_indo(row.TGLLAHIR,'-',1);
  	      	 	row.TGLLAHIR_TANGGAL = tgl_lahir[0];
  	      	 	row.TGLLAHIR_BULAN = tgl_lahir[1].substr(0,3);
  	      	 	row.TGLLAHIR_TAHUN = tgl_lahir[2];
  	      	 	row.TGLLAHIR_TEXT = tgl_lahir.join(" ");
        	 	}
        	 row.STATUS_ = '-';
        	 if (row.STATUS != null) {
        	 	row.STATUS_ = me.app_config.ucwords(row.STATUS.replace(new RegExp("_", 'g'), " "));
        	 }

           if (row.STATUS_.toLowerCase() == 'pernikahan') 
           {
             if ("JENISKELAMIN" in me.data) {
               console.log(me.data.JENISKELAMIN.toUpperCase());
               if (me.data.JENISKELAMIN.toUpperCase() == 'L' || me.data.JENISKELAMIN.toUpperCase() == 'LAKI-LAKI') {
                 row.STATUS_ = 'Istri';
               } else {
                 row.STATUS_ = 'Suami';
               }
             }            
           }

        	 row.JENISKELAMIN = '-';

        	 if (row.JK != null) {
        	 	row.JENISKELAMIN = me.app_config.ifvallnull2(jk_list[row.JK],'-');
        	 }

            row.hasDocument = ' ';
             row.classLeft = ' ls-tmt col ';
             if (row.EXISTS_FILE_MOBILE != null) {            
              row.hasDocument = ' bg-green ';                        
             }
             row.classLeft += row.hasDocument;
        	 	row = me.app_config.ifvallnull(row,'-');
        	 	data.push(row);
          }         
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
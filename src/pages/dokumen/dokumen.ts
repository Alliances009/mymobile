import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the DokumenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dokumen',
  templateUrl: 'dokumen.html',
})
export class DokumenPage {
	aa:any;
	data:any;
  data_list:any;
  klasifikasi_dokumen:any;
  dokumen:any;
  index_dokumen:any=-1;
  disablePrev:any = true;
  disableNext:any = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public sanitizer: DomSanitizer) {  	
    this.data = navParams.data.item;    
    this.data_list = [];
  	this.aa = "http://192.168.1.124:8056/produk/sisfopers/app/siap.phpdosir/app/load_file_mobile?url=http://192.168.1.124:8056/produk/sisfopers/app//client/mabestni/uploads/drh/riwayat_pangkat/no_image.png&token="+this.app_config.getToken();  	      
    this.listeners();
  }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad DokumenPage');
  }

  listeners() {    
    let me = this,
        params = {
          id:this.data.ID_PAGE,
          PERSONELID:this.data.PERSONELID,
          RIWAYATID:this.data.ROWID
      },
      loading = me.app_config.showLoading("Memuat...");

    me.app_config.getKlasifikasiDossier(params,function(result) {
      me.data_list = result.data;
      if (me.data_list.length > 0) {
        me.setDocument(0);        
      }
      
      loading.dismiss();
    });
  }

  setDocument(index) {
    if (this.data_list.length > 0) {      
      let dok = this.data_list[index];
      this.klasifikasi_dokumen = dok.KLASIFIKASI;
      this.index_dokumen = index;   
      let dok_name = dok.NAME_GENERATED;
      if (dok_name == undefined || dok_name == null) {
        dok_name = "no_image.png";
      }
      let url =this.app_config.data.site_url+"dosir/app/load_file_mobile?url="+this.app_config.data.base_url+"/client/mabestni/uploads/drh/riwayat_pangkat/"+dok_name+"&token="+this.app_config.getToken();
      this.dokumen = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      console.log(dok,url,this.dokumen);
    }

    if (this.index_dokumen == 0) {
      this.disablePrev = true;
    } else {
      this.disablePrev = false;
    }

    if ((this.index_dokumen+1) == this.data_list.length) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  prevDocument() {
    this.setDocument(this.index_dokumen-1);
  }

  nextDocument() {
    this.setDocument(this.index_dokumen+1);
  }


}

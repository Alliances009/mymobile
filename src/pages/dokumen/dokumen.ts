import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentViewer } from '@ionic-native/document-viewer';
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
  is_modal:any = false;
  disablePrev:any = true;
  disableNext:any = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public sanitizer: DomSanitizer,public documentView: DocumentViewer) {  	
    this.data = navParams.data.item;    
    if (navParams.data.is_modal === true) {      
      this.is_modal = navParams.data.is_modal;      
    }
    this.data_list = [];  	
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
          RIWAYATID:this.data.ROWID,          
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
      let dok_name = dok.NAME_GENERATED,
          is_json = false;
      try
      {
        let dt = JSON.parse(dok_name);
        if("length" in dt) {
          is_json = true;
        }
      }
      catch(e)
      {
        is_json = false;
      }
      if (dok_name == undefined || dok_name == null || dok_name == "not_exist" || is_json) {
        dok_name = "no_image.png";
      }
      let url =this.app_config.data.site_url+"dosir/app/load_file_mobile?url="+this.app_config.data.base_url+"/client/mabestni/uploads/drh/"+this.data.ID_PAGE+"/"+dok_name+"&token="+this.app_config.getToken();
      this.dokumen = this.sanitizer.bypassSecurityTrustResourceUrl(url);      
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

  dismiss() {   
   this.navCtrl.pop();
   }

   openPdf() {
     
    alert("AA");
    this.documentView.viewDocument('https://devdactic.com/html/5-simple-hacks-LBT.pdf', 'application/pdf', {});
   }

}

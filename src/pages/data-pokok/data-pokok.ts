import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PreviewFotoPage } from '../preview-foto/preview-foto';
import { DokumenPage } from '../dokumen/dokumen';
import { CetakRhPage } from '../cetak-rh/cetak-rh';
import { PencarianPersonelPage } from '../pencarian-personel/pencarian-personel';
/**
 * Generated class for the DataPokokPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-pokok',
  templateUrl: 'data-pokok.html',
})
export class DataPokokPage {
	data:any;
  template:any="";
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider,public modalCtrl: ModalController) {  	
  	this.data = navParams.data.item;
  	this.getDetailPersonel(this.data.PERSONELID);
    this.app_config.setContent('viewCtrl',this.viewCtrl);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DataPokokPage');
  }

  getDetailPersonel(pid) {
      var me = this;
      let maskLoading = this.app_config.showLoading('Proses'),
          params = {
            pgid: btoa(pid),
            is_mobile: 1
          },
          list_default = ["DIKMA","LAST_DIKTUK","DIKMILTI","DIKUM","DIKUMTI","HP","TELEPON","ALAMATKTP","TMTTNI","TMTPERWIRA","SUMBER_PRAJURIT","NAMA_KORPS"],
          list_tahun_pendidikan = ["TAHUN_DIKMA","TAHUN_DIKTUK","TAHUN_DIKMILTI","TAHUN_DIKUM","TAHUN_DIKUMTI"],
          jenis_kelamin = {L:'Laki-laki',P:"Perempuan","T":"-"};

      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/app/get_by_id",params,function(result){

          me.data = result.data;
          if (me.data.FOTO == null || me.data.FOTO == "not_exist") {
              me.data.FOTO_MOBILE = "assets/imgs/img_avatar.png";
          }

          me.data.CLASS_MATRA = me.data.MATRAID+" content-sub-head-riwayat row ";
          
          for(var i in me.data)
          {
            if(list_default.indexOf(i) !== -1)
            {
               me.data[i] = me.app_config.ifvallnull2(me.data[i],"-");
            }

            if(list_tahun_pendidikan.indexOf(i) !== -1)
            {
               me.data[i] = me.app_config.ifvallnull2(me.data[i],"");
               if (me.data[i] != "") {
                 me.data[i] = "("+me.data[i]+")";
               }

            }
             if (i == 'JENISKELAMIN') {
               me.data[i] = me.app_config.ifvallnull2(me.data[i],"T");
               me.data[i] = me.app_config.ifvallisset(jenis_kelamin,me.data[i].substr(0,1).toUpperCase(),"-");
             }             
          }

          setTimeout(() => {
            maskLoading.dismiss();            
          }, 500);  
      });
  }
 
  previewFoto() {
    
   let data = this.data;
   data.ID_PAGE = 'identitas';
   data.ROWID = data.PERSONELID;
   let profileModal = this.modalCtrl.create(DokumenPage, { 
     item: data,
     is_modal: true
    });
   profileModal.present();  
 }

  openMenu() {        
    this.app_config.openMenuRiwayat(this.data);    
  }

  cetakRH() {
    let me = this, 
      params = {
        pgid: btoa(this.data.PERSONELID),
        is_mobile: 1
      };
      let profileModal = me.modalCtrl.create(CetakRhPage, { 
         data:this.data,
         template: this.app_config.data.site_url+"/pegawai/app/cetak_drh_singkat_mobile?pgid="+params.pgid,         
        });
       profileModal.present();
    // this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/app/cetak_drh_singkat_mobile",params,function(result){      
    // });
  }

}

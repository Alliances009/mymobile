import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider) {  	
  	this.data = navParams.data.item;
  	this.getDetailPersonel(this.data.PERSONELID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataPokokPage');
  }

  getDetailPersonel(pid) {
      var me = this;
      let maskLoading = this.app_config.showLoading('Proses'),
          params = {
            pgid: btoa(pid)
          }      
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/app/get_by_id",params,function(result){

          me.data = result.data;

          setTimeout(() => {
            maskLoading.dismiss();            
          }, 500);  
      });
  }

  openMenu() {
    this.app_config.openMenuRiwayat(this.data);
  }

}

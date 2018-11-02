import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';

import { DataPokokPage } from '../data-pokok/data-pokok';
//import { UnitOrganisasiPage } from '../unit-organisasi/unit-organisasi';
import { FormPencarianPersonelPage } from '../form-pencarian-personel/form-pencarian-personel';

@Component({
  selector: 'page-pencarian-personel',
  templateUrl: 'pencarian-personel.html'
})
export class PencarianPersonelPage {
	selectedItem: any;
  	icons: string[];
  	items: Array<{title: string, note: string, icon: string}>;
    data_list: any;
    config: any;
    token: any;    
    info_semua:any;
    info_al:any;
    info_au:any;
    info_ad:any;
    filter:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider) {    
    this.config = {
      page:0,
      is_load: false
    };
    this.info_semua = 0;
    this.info_al = 0;
    this.info_au = 0;
    this.info_ad = 0;        
    this.data_list = [];
    this.navCtrl = navCtrl;
  	this.selectedItem = navParams.get('item');     
    this.filter.f_text = '';
    

    this.getDataPersonel();
  }

  itemTapped(event, item) {    
    //item.PERSONELID = '578F7670-2994-431E-BD7D-FF80CD87F161';
    this.navCtrl.push(DataPokokPage, {
      item: item
    });
  }

  getDataPersonel() {
      var me = this;
      let maskLoading = this.app_config.showLoading('Proses'),
          params = {
            per_page:me.config.page*20,
            m:me.config.page*20,
            f_ad: 'tni_al',
            f_au: 'tni_au',
            f_al: 'tni_ad',
            f_text: this.filter.f_text
          }
      me.config.is_load = true;
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/app/get",params,function(result){

          let data = result,
              data_pegawai = [];

          data.data.forEach(function(row){
            row.row_class = row.MATRA_CLASS+" row-personel item item-block item-md";
            data_pegawai.push(row);
            me.data_list.push(row);
          });                           
          me.data_list = me.data_list;
          // for(var i = 0;i <= data_pegawai.length;i++)
          // {
          //   this.data_list.push(data_pegawai[i]);
          // }

          me.info_semua = data.count;
          me.info_al = data.al;
          me.info_au = data.au;
          me.info_ad = data.ad;

          setTimeout(() => {
            maskLoading.dismiss();
            me.config.is_load = false;
          }, 500);  
      });

  }

  doInfinite(infiniteScroll) {    
    if(this.config.is_load === false)
    {      
      this.config.page++;      
      this.getDataPersonel();            
      infiniteScroll.complete(); 
    }
  }

  openMenu(arg) {
    this.app_config.openMenu(arg);
  }

  showUnitKerja() {
    // this.navCtrl.push(UnitOrganisasiPage, {
      
    // });
  }

  showFormPencarian() {
    this.navCtrl.push(FormPencarianPersonelPage, {
      
    });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';

import { DataPokokPage } from '../data-pokok/data-pokok';
import { UnitOrganisasiPage } from '../unit-organisasi/unit-organisasi';
import { FormPencarianPersonelPage } from '../form-pencarian-personel/form-pencarian-personel';


@Component({
  selector: 'page-pencarian-personel',
  templateUrl: 'pencarian-personel.html'
})
export class PencarianPersonelPage {
    is_first_open:boolean = true;
	  selectedItem: any;
    infiniteScroll:any;
  	icons: string[];
  	items: Array<{title: string, note: string, icon: string}>;
    data_list: any;
    config: any;
    token: any;    
    info_semua:any;
    satker:any;
    info_al:any;
    info_au:any;
    info_ad:any;
    msg_data:any='Data Tidak Ditemukan';
    filter:any = {
      sumber_prajurit:''
    };    
    filter_advanced:any = {};    
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {    
    let maskLoading = this.app_config.showLoading('Memuat');
    this.app_config.cek_token(function() {
      try {
        maskLoading.dismiss();
      } catch(e) {

      }

    })
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
    this.satker = this.pencarian.getData("satker_selected");     
    this.filter.f_text = '';
    this.filter.satkerid = "";
    this.filter_advanced = this.pencarian.getData("filter_advanced");
    this.filter.sumber_prajurit = this.pencarian.getData("sumber_prajurit");
    //this.getDataPersonel();
  }

  itemTapped(event, item) {    
    //item.PERSONELID = '578F7670-2994-431E-BD7D-FF80CD87F161';
    this.navCtrl.push(DataPokokPage, {
      item: item
    });
  }

  getDataPersonel() {
      var me = this,
          filter_advanced = this.pencarian.getData("filter_advanced");
      this.satker = this.pencarian.getData("satker_selected");
      if(this.satker != undefined)
      {
        this.filter.satkerid = this.satker.SATKERID;
      }

      let maskLoading = this.app_config.showLoading('Proses'),
          params = {
            per_page:me.config.page*20,
            m:me.config.page*20,            
            f_text: this.filter.f_text,
            satkerid:this.filter.satkerid,
            is_mobile:1
          }
      
      for(var i in filter_advanced)
      {
        let value = this.app_config.ifvallnull2(filter_advanced[i].VALUE,null);

        if (value == null) {
          value = this.app_config.ifvallnull2(filter_advanced[i].NAMA,null);
          if (value == null) { 
            value = filter_advanced[i];
          }
        }



         params[i] = value;
      }      
      params.f_text = params.f_text.replace(" ", "_");
      me.config.is_load = true;
      this.app_config.requestAjaxPost(this.app_config.data.site_url+"/mobile/app/get_pegawai",params,function(result){

          let data = result,
              data_pegawai = [];

          data.data.forEach(function(row){
            if (me.app_config.findValueFromArrayObject(me.data_list,"PERSONELID",row.PERSONELID) == -1) {              
              row.row_class = row.MATRA_CLASS+" row-personel item item-block item-md";
              if (row.FOTO == null || row.FOTO == "not_exist") {
                row.FOTO_MOBILE = "assets/imgs/img_avatar.png";
              }            
              data_pegawai.push(row);
              me.data_list.push(row);
            }
          });                           
          me.data_list = me.data_list;
          // for(var i = 0;i <= data_pegawai.length;i++)
          // {
          //   this.data_list.push(data_pegawai[i]);
          // }
          me.info_semua = data.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          me.info_al = data.al;
          me.info_au = data.au;
          me.info_ad = data.ad;
          me.is_first_open = false;
          setTimeout(() => {         
            maskLoading.dismiss();
            if(me.data_list.length == 0){
              me.msg_data = "Data Tidak Ditemukan";
            }
            me.config.is_load = false;
          }, 500);  
      });

  }

  doInfinite(infiniteScroll) {    
      this.infiniteScroll = infiniteScroll;
    if (this.info_semua != this.data_list.length) {      
       try
        {        
          this.infiniteScroll.complete();        
        }
        catch(e)
        {

        }

      if(this.config.is_load === false)
      {      
        this.config.page++;      
        this.getDataPersonel();            
        infiniteScroll.complete();
      }
      console.log(this.infiniteScroll,this.config.is_load);
      try
        {        
          console.log(this.infiniteScroll,this.config.is_load);
          this.infiniteScroll.complete();        
        }
        catch(e)
        {

        }
    } else {
       try
        {        
          console.log(this.infiniteScroll,this.config.is_load);
          this.infiniteScroll.complete();        
        }
        catch(e)
        {

        }
    }
  }

  openMenu(arg) {
    this.app_config.openMenu(arg);
  }

  showUnitKerja() {    
    let me = this;
    this.navCtrl.push(UnitOrganisasiPage, {    
      selected: this.satker,
      satker: this.pencarian.getData("satker"),
      parent: me
    });
  }

  showFormPencarian() {
    let me = this;
    this.navCtrl.push(FormPencarianPersonelPage, {
      parent: me
    });
  }

  onSearch(keyCode) {
    if (keyCode == 13) {      
      this.search();
    }
  }

  search() {    
    this.data_list = [];
    this.msg_data = "";
    this.config.page = 0;
    if (this.infiniteScroll != undefined && this.infiniteScroll != null) {      
      try
      {        
        this.infiniteScroll.complete();
        this.config.is_load = false;
      }
      catch(e)
      {

      }
    }
    this.getDataPersonel();
  }

  reset() {
    this.filter.f_text = "";
    this.resetAdavanced();
    this.search();    
  }

   resetAdavanced() {
    let me = this;    
    var reset_field = {
      f_nrp:'',
      f_nama:'',
      f_usia_from:'',
      f_usia_to:'',
      f_lichting_from:'',
      f_lichting_to:'',
      f_kelamin_p:'P',
      f_kelamin_l:'L',
      f_ad:'tni_ad',
      f_al:'tni_al',
      f_au:'tni_au',
      f_sumber_prajuritid:{VALUE:'',TEXT:''},
      f_pangkat_from:0,
      f_pangkat_to:21,
      f_kategori_personelid:{VALUE:'',TEXT:''},
      f_korps:{VALUE:'',TEXT:'',DATA:[]},
      f_satker_id:{VALUE:'',TEXT:'',DATA:[]},
      f_satker:{VALUE:'',TEXT:'',DATA:[]}
    };
    var reset_data = {
      data_kategori_personel:null,
      data_korps_personel:null,
      data_unit_orgnisasi:null,
      data_sumber_prajurit:null
    }    
    me.pencarian.setData("filter_advanced",reset_field);    
    for(let i in reset_data){
      me.pencarian.setData(i,reset_data[i]);    
    }    
    var rangePangkat = {
        lower: 0,
        upper: 21
    };
    this.pencarian.setAdvancedFilter('f_pangkat_from',1);
    this.pencarian.setAdvancedFilter('f_pangkat_to',22);    
     
  }


}

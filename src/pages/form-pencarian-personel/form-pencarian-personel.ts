import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';
import { PencarianSumberPrajuritPage } from '../pencarian-sumber-prajurit/pencarian-sumber-prajurit';
import { PencarianKategoriPersonelPage } from '../pencarian-kategori-personel/pencarian-kategori-personel';
import { PencarianKorpsKecabanganPage } from '../pencarian-korps-kecabangan/pencarian-korps-kecabangan';
import { PencarianUnitOrganisasiPage } from '../pencarian-unit-organisasi/pencarian-unit-organisasi';

/**
 * Generated class for the FormPencarianPersonelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-form-pencarian-personel',
  templateUrl: 'form-pencarian-personel.html',
})
export class FormPencarianPersonelPage {
  
  data:any={
    sumber_prajurit:[],
    pangkat:[]
  };
  filter:any={
   
  };
  list_tahun:any=[];
  parent:any;
  checkbox:any = {
    f_kelamin_l:true,
    f_kelamin_p:true,
    f_ad:true,
    f_al:true,
    f_au:true
  };
  rangePangkat:any= {
    lower: 0,
    upper: 0,
    max_value:0,
    min_value:0,
    max_text:'',
    min_text:''
  };
  filter_advanced_default:any = {
      f_nrp:'',
      f_nama:'',
      f_usia_from:'',
      f_usia_to:'',
      f_kelamin_p:'P',
      f_kelamin_l:'L',
      f_ad:'tni_ad',
      f_al:'tni_al',
      f_au:'tni_au',
      f_sumber_prajuritid:{VALUE:'',TEXT:''},
      f_pangkat_from:'',
      f_pangkat_to:'',
      f_kategori_personelid:{VALUE:'',TEXT:''},
      f_korps:{VALUE:'',TEXT:'',DATA:[]},
      f_satker_id:{VALUE:'',TEXT:'',DATA:[]},
      f_satker:{VALUE:'',TEXT:'',DATA:[]}
    };
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {
    

    for (var i = 1970; i <= (new Date().getFullYear()+1); ++i) {
      this.list_tahun.push({tahun:i});
    }

    this.setFilter();
    this.parent = this.navParams.get("parent");     

    this.getDataPangkat();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPencarianPersonelPage');
  }

  setFilter() {
    if (this.pencarian.getData("filter_advanced") != undefined) 
    {      
      this.filter = this.pencarian.getData("filter_advanced");
    }
    else
    {
      this.filter = this.pencarian.filter_advanced;
    }    
    
    for(var i in this.filter){      
      if(i in this.checkbox) 
      {
        if (this.filter[i] != "" && this.filter[i] != null && this.filter[i] != undefined) 
        {
          this.checkbox[i] = true;
        } 
        else 
        {
          this.checkbox[i] = false;
        }
      }
    }
    console.log(this.filter);
  }

   search() {     
      this.pencarian.setData('filter_advanced',this.filter);   
      this.getSelectedPangkat();
      this.pencarian.setAdvancedFilter('f_pangkat_from',this.filter.f_pangkat_from);
      this.pencarian.setAdvancedFilter('f_pangkat_to',this.filter.f_pangkat_to);
      this.parent.search();
      this.navCtrl.popToRoot(); 
     
   }

   changeCheckbox(name,val,evt) {          
     if(evt.value) {
       this.filter[name] = val;
     } else {
       this.filter[name] = "";
     }
   }

   filterSumberPrajurit() {
     let me = this;
     this.navCtrl.push(PencarianSumberPrajuritPage,{
        parent:me
    });
   }

   filterKategoriPersonel() {
      let me = this;
     this.navCtrl.push(PencarianKategoriPersonelPage,{
        parent:me
    }); 
   }

   filterKorpsKecabangan() {
      let me = this;
     this.navCtrl.push(PencarianKorpsKecabanganPage,{
        parent:me
    }); 
   }

   filterUnitOrganisasi() {
      let me = this;
     this.navCtrl.push(PencarianUnitOrganisasiPage,{
        parent:me
    }); 
   }

   load_filter() {
      if (this.pencarian.getData("filter_advanced") != undefined) 
      {      
        this.filter = this.pencarian.getData("filter_advanced");
      }
      else
      {
        this.filter = this.pencarian.filter_advanced;
      }
   }
  
  getDataPangkat() {
    let me = this;
    if (me.pencarian.getDataList("pangkat") != null && me.pencarian.getDataList("pangkat") != undefined) 
    {      
       me.data.pangkat = me.pencarian.getDataList("pangkat"); 
       if (me.data.pangkat.length > 0) {
          me.rangePangkat.max_value = (me.data.pangkat.length-1);          
        }
    } 
    else 
    {      
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/Simplelist/get_pangkat_list",{},function(result) {
        var data = [];
        result.data.forEach(function(row) {
          if (row.PANGKATID > 0) {
            data.push(row);
          }
        })
          me.data.pangkat = data;
          me.data.pangkat.sort(me.compare);       
          if (me.data.pangkat.length > 0) {
            me.rangePangkat.max_value = (me.data.pangkat.length-1);     
            me.rangePangkat.upper = me.rangePangkat.max_value;
            me.rangePangkat.min_text = me.app_config.ifvallnull2(me.data.pangkat[me.rangePangkat.lower].GABTNI,"");
            me.rangePangkat.max_text = me.app_config.ifvallnull2(me.data.pangkat[me.rangePangkat.upper].GABTNI,"");
          }
          me.pencarian.setDataList("pangkat",me.data.pangkat);
      });
    }

    if (me.pencarian.getAdvancedFilter("f_pangkat_from") != "" && me.pencarian.getAdvancedFilter("f_pangkat_from") != null && me.pencarian.getAdvancedFilter("f_pangkat_from") != undefined) {
      if (me.data.pangkat.length > 0) {
         let index = me.app_config.findValueFromArrayObject(me.data.pangkat,"PANGKATID",me.pencarian.getAdvancedFilter("f_pangkat_from"));         
         if (index !== -1) {
            console.log("AAAA",index);
             me.rangePangkat.lower = index;
             me.rangePangkat.min_text = me.app_config.ifvallnull2(me.data.pangkat[index].GABTNI,"");
         }
      }
    }

    if (me.pencarian.getAdvancedFilter("f_pangkat_to") != "" && me.pencarian.getAdvancedFilter("f_pangkat_to") != null && me.pencarian.getAdvancedFilter("f_pangkat_to") != undefined) {
      if (me.data.pangkat.length > 0) {
         let index = me.app_config.findValueFromArrayObject(me.data.pangkat,"PANGKATID",me.pencarian.getAdvancedFilter("f_pangkat_to"))
            console.log("BBBB",index,me.data.pangkat,me.pencarian.getAdvancedFilter("f_pangkat_to"));
         if (index !== -1) {
             me.rangePangkat.upper = index;
             me.rangePangkat.max_text = me.app_config.ifvallnull2(me.data.pangkat[index].GABTNI,"");
         }
      }
    }
  }

  changePangkat(data) {    
    let me = this;
    if (me.data.pangkat.length > 0) {      
      me.rangePangkat.min_text = me.data.pangkat[data.lower].GABTNI;
      me.rangePangkat.lower = data.lower;
      me.rangePangkat.max_text = me.data.pangkat[data.upper].GABTNI;
      me.rangePangkat.upper = data.upper;
    }
  }

  getSelectedPangkat() {
    let me = this;
    if (me.data.pangkat.length > 0) {            
      me.filter.f_pangkat_from = me.data.pangkat[me.rangePangkat.lower].PANGKATID;
      me.filter.f_pangkat_to = me.data.pangkat[me.rangePangkat.upper].PANGKATID;
    }
  }

  reset() {
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
    this.setFilter();    
    var rangePangkat = {
        lower: 0,
        upper: 21
    };
    this.pencarian.setAdvancedFilter('f_pangkat_from',1);
     this.pencarian.setAdvancedFilter('f_pangkat_to',23);    
     me.rangePangkat = {
       lower: 0,
      upper: 0,
      max_value:21,
      min_value:0,
      max_text:'',
      min_text:''
     };
     me.changePangkat(rangePangkat);  
  }

  compare(a,b) {
    if (a.PANGKATID < b.PANGKATID) {      
      return -1;
    }
    if (a.PANGKATID > b.PANGKATID){      
      return 1;
    }    
    return 0;
  } 
}

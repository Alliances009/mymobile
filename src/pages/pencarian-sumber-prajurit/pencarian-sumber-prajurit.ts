import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';

/**
 * Generated class for the PencarianSumberPrajuritPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pencarian-sumber-prajurit',
  templateUrl: 'pencarian-sumber-prajurit.html',
})
export class PencarianSumberPrajuritPage {
	data_list:any=[];
  parent:any;
  selected:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {
  	let data = this.pencarian.getData("data_sumber_prajurit");
  	if (data != undefined && data != null) {
  		this.data_list = data;
  	} else {
  		this.getData();
  	}

    let selected = this.pencarian.getAdvancedFilter("f_sumber_prajuritid");    
    if (selected != undefined && selected != null && selected.DATA) {
      this.selected = selected.DATA;
    } 

    this.parent = this.navParams.get('parent');
  }

  ionViewDidLoad() {
    
  }

   getData() {
     let me = this;
      this.app_config.requestAjaxGet(this.app_config.data.site_url+"/Simplelist/get_sumberprajurit_list",{},function(result){
        let data = [];
        result.data.forEach(function(row) {
          row.selected = false;
          if (row.SUMBERPRAJURITID != "") {
            data.push(row);
          }
        })
        me.data_list = data;
      	me.pencarian.setData("data_sumber_prajurit",me.data_list);
      });

   }

   itemTapped(evt,data) {     
     let me = this;     
     this.data_list.forEach(function(row,i) {
       //row.selected = false;
       me.data_list[i] = row;
     })
     let index = this.app_config.findValueFromArrayObject(this.data_list,"SUMBERPRAJURITID",data.SUMBERPRAJURITID);
     if (index !== -1) {
       
       if (this.selected.length > 0) {
         if(this.selected[0].SUMBERPRAJURITID == this.data_list[index].SUMBERPRAJURITID) {
           this.data_list[index].selected = true;
         }
       }
       if (this.data_list[index].selected) {
         this.data_list[index].selected = false;     
         let now_selected = this.data_list[index];
         let idx = me.app_config.findValueFromArrayObject(this.selected,"SUMBERPRAJURITID",now_selected.SUMBERPRAJURITID);
         if (idx !== -1) {
           this.selected.splice(idx,1);
         }
       }else{
         this.data_list[index].selected = true;         
         this.selected.push(data);
       }       
        
     }     
   }

   pilih() {
     this.pencarian.setAdvancedFilter("f_sumber_prajuritid",{
         VALUE:'',TEXT:''
       });
     if (this.selected.length > 0) {              
       this.pencarian.setAdvancedFilter("f_sumber_prajuritid",{
         VALUE:this.selected.map(function(row){return row.SUMBERPRAJURITID}).join(','),
         TEXT:this.selected.map(function(row){return row.NAMA}).join(', '),
         DATA:this.selected
       });
     }
       this.navCtrl.pop();
       try
       {
         this.parent.load_filter();
       }
       catch(e) 
       {

       }
   }

}

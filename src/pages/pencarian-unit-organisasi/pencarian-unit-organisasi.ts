import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';

/**
 * Generated class for the PencarianUnitOrganisasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pencarian-unit-organisasi',
  templateUrl: 'pencarian-unit-organisasi.html',
})
export class PencarianUnitOrganisasiPage {
	data_tree:any=[];
	parent:any;
	selected:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {
  let me = this,
  		data = this.pencarian.getData("data_unit_orgnisasi");
  	if (data != undefined && data != null) {
  		this.data_tree = data;
  	} else {
  		this.getDataTree({},function(result) {
  			result.forEach(function(row,i) {
  				result[i].TEXT = row.SATKER;
  			});
        me.data_tree = result;	        
        me.pencarian.setData("data_unit_orgnisasi",me.data_tree);
	    }); 
  	}
    // let selected = this.pencarian.getAdvancedFilter("f_korps");
    // try {
    // 	console.log(selected);
    // 	if('DATA' in selected && selected.DATA.length > 0) {
    // 		let row = selected.DATA[0],
    // 		a = me.findIndexTree(data,row.level,row.SATKERID,0);
    // 		console.log(a);
    // 	}
    // } catch(e) {
    // 	console.debug(e);
    // }
    this.parent = this.navParams.get('parent');
  }

  ionViewDidLoad() {
    
  }

   getDataTree(params,callback) {    
    let maskLoading = this.app_config.showLoading('Memuat...');
    this.app_config.requestAjaxGet(this.app_config.data.site_url+"Simplelist/get_tree_satker",params,function(result) {      
      if (callback) {
        callback(result)
      }
      setTimeout(() => {
        maskLoading.dismiss();        
      }, 500);  
      // console.log(me.data_tree);
    })
  }

  onExpand(node) {
    let me = this;      
    let index = this.findIndexTree(me.data_tree,node.level,node.SATKERID,0);    
    if (index !== -1) {        
      if (!("Children" in index))
      {
        this.getDataTree({id:node.SATKERID,level:node.level+1},function(result) {                                        
            result.forEach(function(row,i) {
              result[i].TEXT = row.SATKER;
              result[i].checked = node.checked;
            });
            index.Children = result;
        });
      }
    } 
    this.pencarian.setData("data_unit_orgnisasi",me.data_tree);
  }

  onSelected(node){        
    
    // this.pencarian.setData("satker_selected",node);
    // this.parent.search();
    // this.navCtrl.popToRoot();      
    
  }

  findIndexTree(data,level,SATKERID,index) {
    let me = this,
        dt = data;
    if (level != index) {          	
      let idx = me.app_config.findValueFromArrayObject(data,"SATKERID",SATKERID.substr(0,index+2));            	
      if (idx !== -1) {        
        dt = data[idx];                    
        if ("Children" in dt) {          
          dt = me.findIndexTree(dt.Children,level,SATKERID,index+2);
        }
      }
    }        
    return dt;
  }

  pilih(cmp) {   
    let selected = cmp.getSelected();    
     this.pencarian.setAdvancedFilter("f_satker_id",{
         VALUE:'',
         TEXT:''
       });
     this.pencarian.setAdvancedFilter("f_satker",{
         VALUE:'',
         TEXT:''
       });     
     if (selected.length > 0) {            	
       this.pencarian.setAdvancedFilter("f_satker_id",{
         VALUE:selected.map(function(row){return row.SATKERID}).join(','),
         TEXT:selected.map(function(row){return row.SATKER}).join(','),
         DATA:selected
       });
       this.pencarian.setAdvancedFilter("f_satker",{         
         TEXT:selected.map(function(row){return row.SATKERID}).join(','),
         VALUE:selected.map(function(row){return row.SATKER}).join(','),
         DATA:selected
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

   reset(cmp) {
      this.stateSelected(this.data_tree,false);            
      cmp.resetSelected();
   }

   stateSelected(data,selected) {
     let me = this;
     if (data.length > 0) {
       data.forEach(function(row) {
         row.checked = selected;
         if ("Children" in row && row.Children.length > 0) {
           me.stateSelected(row.Children,selected);
         }
       })
     }
   }

}

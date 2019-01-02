import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';

/**
 * Generated class for the PencarianKorpsKecabanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pencarian-korps-kecabangan',
  templateUrl: 'pencarian-korps-kecabangan.html',
})
export class PencarianKorpsKecabanganPage {
	data_tree:any=[];
	parent:any;
	selected:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {
	let me = this,
  		data = this.pencarian.getData("data_korps_personel");
  	if (data != undefined && data != null) {
  		this.data_tree = data;
  	} else {
  		this.getDataTree({},function(result) {
  			result.forEach(function(row,i) {
  				result[i].TEXT = row.SINGKATAN;
  			});
        me.data_tree = result;	        
        me.pencarian.setData("data_korps_personel",me.data_tree);
	    }); 
  	}
    // let selected = this.pencarian.getAdvancedFilter("f_korps");
    // try {
    // 	console.log(selected);
    // 	if('DATA' in selected && selected.DATA.length > 0) {
    // 		let row = selected.DATA[0],
    // 		a = me.findIndexTree(data,row.level,row.KORPS_ID,0);
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
    this.app_config.requestAjaxGet(this.app_config.data.site_url+"Simplelist/get_tree_kecabangan",params,function(result) {      
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
    let index = this.findIndexTree(me.data_tree,node.level,node.KORPS_ID,0);    
    if (index !== -1) {        
      if (!("Children" in index))
      {
        this.getDataTree({id:node.KORPS_ID,level:node.level+1},function(result) {                                        
            result.forEach(function(row,i) {
              result[i].TEXT = row.SINGKATAN;
              result[i].checked = node.checked;
            });
            index.Children = result;
        });
      }
    } 
    this.pencarian.setData("data_korps_personel",me.data_tree);
  }

  onSelected(node){        
    
    // this.pencarian.setData("satker_selected",node);
    // this.parent.search();
    // this.navCtrl.popToRoot();      
    
  }

  findIndexTree(data,level,KORPS_ID,index) {
    let me = this,
        dt = data;
    if (level != index) {      
    	let temp = KORPS_ID,
    		node_split = temp.split("."),
    		node_id = node_split.splice(0,index+1).join(".")+".";
      let idx = me.app_config.findValueFromArrayObject(data,"KORPS_ID",node_id);    	
      if (idx !== -1) {        
        dt = data[idx];                    
        if ("Children" in dt) {          
          dt = me.findIndexTree(dt.Children,level,KORPS_ID,index+1);          
        }
      }
    }        
    return dt;
  }

  pilih(cmp) {   
    let selected = cmp.getSelected();    
     this.pencarian.setAdvancedFilter("f_korps",{
         VALUE:'',
         TEXT:'',
         DATA:[]
       });     
     console.log(selected);
     if (selected.length > 0) {            	
       this.pencarian.setAdvancedFilter("f_korps",{
         VALUE:selected.map(function(row){return row.KORPS_ID}).join(','),
         TEXT:selected.map(function(row){return row.SINGKATAN}).join(','),
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

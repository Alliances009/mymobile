import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';

/**
 * Generated class for the PencarianKategoriPersonelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pencarian-kategori-personel',
  templateUrl: 'pencarian-kategori-personel.html',
})
export class PencarianKategoriPersonelPage {
	data_tree:any=[];
	parent:any;
	selected:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {
  	let me = this,
  		data = this.pencarian.getData("data_kategori_personel");      
  	if (data != undefined && data != null) {
  		this.data_tree = data;
  	} else {
  		this.getDataTree({},function(result) {
  			result.forEach(function(row,i) {
  				result[i].TEXT = row.STATUSPERSONEL;
  			});
        me.data_tree = result;	        
        me.pencarian.setData("data_kategori_personel",me.data_tree);
	    }); 
  	}    
    this.parent = this.navParams.get('parent');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PencarianKategoriPersonelPage');
  }

   getDataTree(params,callback) {    
    let maskLoading = this.app_config.showLoading('Memuat...');
    this.app_config.requestAjaxGet(this.app_config.data.site_url+"Simplelist/get_tree_kategori",params,function(result) {      
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
    let index = this.findIndexTree(me.data_tree,node.level,node.STATUSPERSONELID,0);            
    if (index !== -1) {        
      if (!("Children" in index))
      {
        this.getDataTree({id:node.STATUSPERSONELID,level:node.level+1},function(result) {                                        
            result.forEach(function(row,i) {
              result[i].TEXT = row.STATUSPERSONEL;
              result[i].checked = node.checked;
            });
            index.Children = result;
        });
      }
    } 
    this.pencarian.setData("data_kategori_personel",me.data_tree);    
  }

  onSelected(node){        
    
    // this.pencarian.setData("satker_selected",node);
    // this.parent.search();
    // this.navCtrl.popToRoot();      
    
  }

  findIndexTree(data,level,STATUSPERSONELID,index) {
    let me = this,
        dt = data;
    if (level != index) {      
        let temp = STATUSPERSONELID,
            node_split = temp.split("."),
            node_id = node_split.splice(0,index+1).join(".")+".";
        let idx = me.app_config.findValueFromArrayObject(data,"STATUSPERSONELID",node_id);
      if (idx !== -1) {        
        dt = data[idx];            
        if ("Children" in dt) {          
          dt = me.findIndexTree(dt.Children,level,STATUSPERSONELID,index+1);          
        }
      }
    }        
    return dt;
  }

  pilih(cmp) {   
    let selected = cmp.getSelected()
     this.pencarian.setAdvancedFilter("f_kategori_personelid",{
         VALUE:'',
         TEXT:''
       });     
     if (selected.length > 0) {       
       this.pencarian.setAdvancedFilter("f_kategori_personelid",{
         VALUE:selected.map(function(row){return row.STATUSPERSONELID}).join(','),
         TEXT:selected.map(function(row){return row.STATUSPERSONEL}).join(',')
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

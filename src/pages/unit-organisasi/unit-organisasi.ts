import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PencarianProvider } from '../../providers/pencarian/pencarian';
/**
 * Generated class for the UnitOrganisasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-unit-organisasi',
  templateUrl: 'unit-organisasi.html',
})
export class UnitOrganisasiPage {
	data_tree:any;
  parent:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app_config: AppConfigProvider, public pencarian: PencarianProvider) {
    let me = this,
        satker = this.navParams.get("satker");
  	this.data_tree = [];    
    this.parent = this.navParams.get("parent");
    if (satker != undefined) {
      me.data_tree = satker;
    }
    else
    {      
      this.getTreeSatker("",function(result) {
        me.data_tree = result;
        if (me.data_tree.length > 0) {          
          let node = me.data_tree[0];
          me.onExpand(node);
          node.visible = true;          
        }
      });    
    }
  }

  getTreeSatker(id,callback) {    
    let maskLoading = this.app_config.showLoading('Memuat...');
    this.app_config.requestAjaxGet(this.app_config.data.site_url+"Simplelist/get_tree_satker",{id:id},function(result) {      
      if (callback) {
        callback(result)
      }
      setTimeout(() => {
        maskLoading.dismiss();        
      }, 500);  
      // console.log(me.data_tree);
    })
  }

  ionViewDidLoad() {  	  	
    console.log('ionViewDidLoad UnitOrganisasiPage');
  }

  onExpand(node) {
  	let me = this;      
    let index = this.findIndexTree(me.data_tree,node.level,node.SATKERID,0);        
    if (index !== -1) {        
      if (!("Children" in index))
      {
        this.getTreeSatker(node.SATKERID,function(result) {                              
            index.Children = result;
        });
      }
    } 
    this.pencarian.setData("satker",me.data_tree);
  }

  onSelected(node){        
    this.pencarian.setData("satker_selected",node);
    this.parent.search();
    this.navCtrl.popToRoot();      
    
  }

  findIndexTree(data,level,SATKERID,index) {
    let me = this,
        dt = data;
    if (level != index) {      
      let idx = me.app_config.findValueFromArrayObject(data,"SATKERID",SATKERID.substr(0,index+2));            
      dt = data[idx];            
      if (idx !== -1) {        
        if ("Children" in dt) {          
          dt = me.findIndexTree(dt.Children,level,SATKERID,index+2);          
        }
      }
    }        
    return dt;
  }

}

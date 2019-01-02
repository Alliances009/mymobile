import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ResourceTreeProvider } from '../../providers/resource-tree/resource-tree';
import { AppConfigProvider } from '../../providers/app-config/app-config';
/**
 * Generated class for the TreeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tree',
  templateUrl: 'tree.html'
})
export class TreeComponent {

  @Input() TreeData: any[];
    @Input() levelExpanded: any = 0;
    @Input() nameData: any = 'id';
    @Input() namSelected: any = 'data_selected';
    @Input() hasCheckbox: boolean = true;
    @Output() onExpand = new EventEmitter();
    @Output() onSelected = new EventEmitter();
    selected:any = []; 
    clicked:any; 
    icon_expanded:any = 'add'; 
    constructor(public tree_provider: ResourceTreeProvider, public app_config: AppConfigProvider) {
        this.init();        
    }

    init() {
        this.selected = this.tree_provider.getData(this.namSelected);
        if (this.selected == null) {
           this.selected = [];
       }
    }

    toggleChildren(event,node: any) {        
        node.visible = !node.visible;
        this.clicked = node;        
        this.tree_provider.setClicked(node);
        if (node.visible === true) {   
            event.srcElement.className = "icon icon-remove ion-md-remove";
            this.onExpand.emit(this.clicked);
        }else{
            event.srcElement.className = "icon icon-add ion-md-add";
        }        
    }

    defaultExpand() {
        
    }

    onExpanded() {
        let node = this.tree_provider.getClicked();        
        this.onExpand.emit(node);
    }

    onSelect(node:any) {
      this.tree_provider.setSelected(node);                
      this.selectItem();
    }

    onSelectedChild(node:any) {               
       this.selectItem();
    }

    selectItem() {        
       let selected = this.selected,
           me = this,
           dt = this.tree_provider.getSelected();

       if (selected == null) {
           selected = [];
       }

       if ('checked' in dt && 'Children' in dt) {
           if (dt.Children.length > 0) {
             selected = me.stateSelected(dt.Children,dt.checked,selected);
             selected.reverse();
           }
       }
       let idx = this.app_config.findValueFromArrayObject(selected,me.nameData,dt[me.nameData]);
       if (dt.checked) {                       
           if (idx === -1) {
               selected.push(dt);
           }
       } else {
            if(idx !== -1) {
               selected.splice(idx,1);
           }
       }           
       me.tree_provider.setData(me.namSelected,selected);       
    }

    getSelected(){        
        return this.tree_provider.getData(this.namSelected);
    }

    stateSelected(data,state,selected) {
     let me = this;     
     if (data.length > 0) {
       data.forEach(function(row) {
         row.checked = state;
           let idx = me.app_config.findValueFromArrayObject(selected,me.nameData,row[me.nameData]);           
           if (state) {                       
               if (idx === -1) {                 
                   selected.push(row);
               }
           } else {
                if(idx !== -1) {
                   selected.splice(idx,1);
               }
           }           
         if ("Children" in row && row.Children.length > 0) {           
           selected = me.stateSelected(row.Children,state,selected);
         }         
       })
     }     
     return selected;
   }

   resetSelected() {
     this.tree_provider.setData(this.namSelected,[]);
   }

}

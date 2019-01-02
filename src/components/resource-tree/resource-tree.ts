import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ResourceTreeProvider } from '../../providers/resource-tree/resource-tree';

/**
 * Generated class for the ResourceTreeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resource-tree',
  templateUrl: 'resource-tree.html'
})
export class ResourceTreeComponent {

   	@Input() TreeData: any[];
    @Input() levelExpanded: any = 0;
    @Input() hasCheckbox: boolean = false;
    @Output() onExpand = new EventEmitter();
    @Output() onSelected = new EventEmitter();
    selected:any; 
    clicked:any; 
    icon_expanded:any = 'add'; 
    constructor(public tree_provider: ResourceTreeProvider) {
        this.init();        
    }

    init() {
        
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
        let dt = this.tree_provider.getSelected();
        this.onSelected.emit(dt);
    }

    onSelectedChild(node:any) {        
        let dt = this.tree_provider.getSelected();        
        this.onSelected.emit(dt);
    }


}

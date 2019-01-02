import { NgModule } from '@angular/core';
import { ResourceTreeComponent } from './resource-tree/resource-tree';
import { TreeComponent } from './tree/tree';
@NgModule({
	declarations: [ResourceTreeComponent,
    TreeComponent],
	imports: [],
	exports: [ResourceTreeComponent,
    TreeComponent]
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataPokokPage } from './data-pokok';

@NgModule({
  declarations: [
    DataPokokPage,
  ],
  imports: [
    IonicPageModule.forChild(DataPokokPage),
  ],
})
export class DataPokokPageModule {}

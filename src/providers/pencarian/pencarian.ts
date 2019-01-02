import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PencarianProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PencarianProvider {
	satker_selected:any;
  satker:any;
  data:any={
    sumber_prajurit:[],
    pangkat:null
  };  
  filter_advanced:any = {
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
      f_pangkat_from:'',
      f_pangkat_to:'',
      f_kategori_personelid:{VALUE:'',TEXT:''},
      f_korps:{VALUE:'',TEXT:'',DATA:[]},
      f_satker_id:{VALUE:'',TEXT:'',DATA:[]},
      f_satker:{VALUE:'',TEXT:'',DATA:[]}
    };
   filter_advanced_default:any = {
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
      f_pangkat_from:'',
      f_pangkat_to:'',
      f_kategori_personelid:{VALUE:'',TEXT:''},
      f_korps:{VALUE:'',TEXT:'',DATA:[]},
      f_satker_id:{VALUE:'',TEXT:'',DATA:[]},
      f_satker:{VALUE:'',TEXT:'',DATA:[]}
    };
  constructor(public http: HttpClient) {
    console.log('Hello PencarianProvider Provider');
  }

  setData(name,dt) {  
  	this[name] = dt;
  }

  getData(name) {
  	return this[name];
  }

  setAdvancedFilter(name,dt) {  
    this.filter_advanced[name] = dt;
  }

  getAdvancedFilter(name) {
    return this.filter_advanced[name];
  }

  setDataList(name,dt) {  
    this.data[name] = dt;
  }

  getDataList(name) {
    return this.data[name];
  }


}

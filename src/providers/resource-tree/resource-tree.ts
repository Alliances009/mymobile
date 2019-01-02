import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ResourceTreeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResourceTreeProvider {
	selected:any;
	clicked:any;
  constructor(public http: HttpClient) {
    console.log('Hello ResourceTreeProvider Provider');
  }

  setSelected(dt) {
  	this.selected = dt;
  }

  getSelected() {
  	return this.selected;
  }

  setClicked(dt) {
  	this.clicked = dt;
  }

  getClicked() {
  	return this.clicked;
  }

  setData(name,dt) {
    this[name] = dt;
  }

  getData(name) {
    let val = null;
    if (name in this) {
      val = this[name];
    }
    return val;
  }

}

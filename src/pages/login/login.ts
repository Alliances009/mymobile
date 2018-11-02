import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PencarianPersonelPage } from '../pencarian-personel/pencarian-personel';
import { AppConfigProvider } from '../../providers/app-config/app-config';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	data:any = {};
	user:any = {};
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public app_config : AppConfigProvider) {
  	if(this.app_config.getLogin() === "true")
  	{  		
    	this.navCtrl.setRoot(PencarianPersonelPage);
  	}
  	
  	this.user.username = '';
  	this.user.password = '';
	this.data.response = '';
	 	
	this.http = http;
	this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
  	
  }

  doLogin(event) {  	  	  	  	
  	let loading = this.app_config.showLoading("Proses");  	
	  this.http.post(this.app_config.data.url_login,JSON.stringify(this.user))
		.subscribe(
			res => {				
				if('_body' in res)
				{					
					try{
						var result = JSON.parse(res["_body"]);				
						if(result.success)
						{
							this.app_config.showToast("Login Berhasil",'top');					    
							this.app_config.setToken(result.token);
							this.app_config.setUser(JSON.stringify(result.user));
							this.app_config.setLogin("true");
							this.navCtrl.setRoot(PencarianPersonelPage);
						}
						else
						{
							this.app_config.showToast(result.msg,'top');						
						}
					}
					catch(e)
					{
						
					}
					setTimeout(function(){
						loading.dismiss();
					},200);
				}
			},
			error => {				
				setTimeout(function(){
					loading.dismiss();
				},200);				
			}
		); 

  }


}

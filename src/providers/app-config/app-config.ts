import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App, ToastController, LoadingController, MenuController } from 'ionic-angular';


/*
  Generated class for the AppConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConfigProvider {  
	data: any = [];
  rootPage:any;
  loadingMask:any = false;
  content:any = {
    viewCtrl:null
  };
	static_name: any = {
		token:'tokenMS',
		isLogin:'isLoginMS',
    user:'userMS',
	};
  constructor(public app: App, public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public menu: MenuController) {
    
    // let base_url = 'http://192.168.1.220/sisfo/',
    // let base_url = 'http://192.168.1.124:8056/produk/sisfopers/app/',
    let base_url = 'http://222.124.141.3:81/',
    // let base_url = 'http://202.182.55.114:8081/sisfopers/',
        site_url = base_url+"siap.php/";
    this.data = {
    	base_url:base_url,
      site_url:site_url,
    	url_login: site_url+'mobile/app/do_login',
      args:{}
    }
    menu.enable(true);
  }

  openMenu(evt) {
      if(evt === "main"){
         this.menu.enable(true, 'menu1');
         this.menu.enable(false, 'menu2');
      }else{
         this.menu.enable(true, 'menu2');
         this.menu.enable(false, 'menu1');
      }
      this.menu.toggle();
  }

  openMenuRiwayat(args) {
      this.data.args = args;
      this.menu.enable(true, 'menu2');
      this.menu.enable(false, 'menu1');
      this.menu.toggle();
  }

  getArgs(){
    return this.data.args;
  }

  showToast(msg,pos){
  	try
  	{ 
  		pos = pos;
  	}
  	catch(e)
  	{
  		pos = "top";
  	}
  	let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: pos
    });
    toast.present();
  }


  showLoading(content) {
  	try
  	{
  		content = content;
  	}
  	catch(e)
  	{
  		content = 'Proses';
  	}

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: content
    });

    loading.present();
    this.loadingMask = loading;
    return loading;
  }

  setToken(token) {
  	localStorage.setItem(this.static_name.token,token);
  }

  setRootPage(page:any) {
    this.rootPage = page;
  }

  getToken() {
    // let token = "",
    //     length = parseInt(localStorage.getItem("length_tokenMS"));

    // for (let i = 1; i <= length; ++i) {
    //   token += localStorage.getItem("tokenMS_"+i);
    // }
    let token = localStorage.getItem(this.static_name.token);  
    return token;
  }

  removeToken() {
  	localStorage.removeItem(this.static_name.token);
  }

  setLogin(isLogin) {
  	localStorage.setItem(this.static_name.isLogin,isLogin);
  }

  getLogin() {
    return localStorage.getItem(this.static_name.isLogin);
  }

  removeLogin() {
  	localStorage.removeItem(this.static_name.isLogin);
  }

  setUser(user) {
    localStorage.setItem(this.static_name.user,user);
  }

  getUser() {
    var dt = {};
    try
    {
      dt = JSON.parse(localStorage.getItem(this.static_name.user))
    }
    catch(e)
    {
      dt = {};
    }
    return dt;
  }

  removeUser() {
    localStorage.removeItem(this.static_name.user);
  }

  requestAjaxGet(url,args,callback) {   
    args.is_mobile = 1;     
    let params = this.serialize_get(args);    
  	 this.http.get(url+"?token="+this.getToken()+params,{})
	    .subscribe(
        result => {        
	        if(result['_body'] != '')
	        {
	            try
	            {                  
	               	callback(result);	                    
	            }
	            catch(e)
	            {
                this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
	              console.debug(e);
	            }
	        }
          else
          {
            if (this.loadingMask) {
              this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
              console.debug(result);
              this.loadingMask.dismiss();
            }
          }
	              
    	},
       err => {
         if (this.loadingMask) {
            this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
            console.debug(err);
            this.loadingMask.dismiss();
          }
       });
  }  

  requestAjaxPost(url,args,callback) {
    args.token = this.getToken();
    this.http.post(url,JSON.stringify(args))
    .subscribe(
      result => {        
        if(result['_body'] != '')
          {
              try
              {                  
                   callback(result);                      
              }
              catch(e)
              {
                this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
                console.debug(e);
              }
          }
          else
          {
            if (this.loadingMask) {
              this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
              console.debug(result);
              this.loadingMask.dismiss();
            }
          }
      },
      error => {        
        if (this.loadingMask) {
            this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
            console.debug(error);
            this.loadingMask.dismiss();
          }  
      }
    ); 
  }

  serialize_get(args) {
    let params = "";
    for(var i in args){
      params += "&"+i+"="+args[i];
    }

    return params;
  }

  split_date_indo(dt,prefix,index_month) {
    let tgl = dt.split(prefix),
        bulan = ['','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
        out = [];

      for (var i = 0, l = tgl.length; i < l; ++i)
      {
          let temp = tgl[i];
          if(i == index_month)
          {
            temp = bulan[parseInt(tgl[i])];
          }

          out.push(temp);
      }

    return out;
  }

  ifvallnull(data,dflt) {
    for(var i in data){
      if (data[i] == null) {
        data[i] = dflt;
      }
    }

    return data;
  }

  ifvallnull2(data,dflt) {   
      if (data == null) {
        data = dflt;
      }    
    return data;
  }

  ifvallisset(data,name,dflt) {   
    let out = dflt;
    if (name in data) {
      out = data[name];
    }    
    return out;
  }

   ucwords(val) {
    let str = val.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
      function(s){
        return s.toUpperCase();
    });
  }  

  getKlasifikasiDossier(args,callback) {
    let params = {
      id:args.id,
      PERSONELID:args.PERSONELID,
      RIWAYATID:args.RIWAYATID
    }    
    this.requestAjaxGet(this.data.site_url+"/Simplelist/get_klasifikasi_table_list_mobile",params,function(result) {
      callback(result);
    });
  }

  findValueFromArrayObject(arr,name,k) {
    var out = -1;
    for (var i = 0; i < arr.length; i++) 
    {
        if (name in arr[i])
        {
            if(arr[i][name] == k)
            {
                out = i;
                break;
            }            
        }        
    }

    return out;
  }

  setContent(name,val) {
    this.content[name] = val;
  }

  getContent(name) {
    return this.content[name];
  }

  cek_token(callback) {            
    let url = this.data.site_url+"mobile/app/cek_token";
     this.http.post(url,JSON.stringify({token:this.getToken()}))
      .subscribe(
        result => {        
          if(result['_body'] != '')
          {
              try
              {                  
                  if(!result['success']){
                      this.showToast(result['msg'],'top');
                      console.log(this.loadingMask);
                      // if (this.loadingMask) {
                      //   this.loadingMask.dismiss();   
                      // }
                      let nav = this.app.getActiveNav();
                      this.removeLogin();
                      nav.push(this.rootPage);                                            
                  }
                  callback();
                  
              }
              catch(e)
              {
                this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
                console.debug(e);
              }
          }
          else
          {
            if (this.loadingMask) {
              this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
              this.loadingMask.dismiss();
            }
          }
                
      },
       err => {
         if (this.loadingMask) {
            this.showToast('Terjadi Kesalahan Dalam Memuat Data','top');
            this.loadingMask.dismiss();
          }
       });
  }  

}

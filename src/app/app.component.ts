import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PencarianPersonelPage } from '../pages/pencarian-personel/pencarian-personel';
import { LoginPage } from '../pages/login/login';
// import { UnitOrganisasiPage } from '../pages/unit-organisasi/unit-organisasi';

import { DataPokokPage } from '../pages/data-pokok/data-pokok';
import { RiwayatPangkatPage } from '../pages/riwayat-pangkat/riwayat-pangkat';
import { RiwayatJabatanPage } from '../pages/riwayat-jabatan/riwayat-jabatan';
import { RiwayatTugasLuarNegeriPage } from '../pages/riwayat-tugas-luar-negeri/riwayat-tugas-luar-negeri';
import { RiwayatTugasOperasiPage } from '../pages/riwayat-tugas-operasi/riwayat-tugas-operasi';
import { RiwayatTandaJasaPage } from '../pages/riwayat-tanda-jasa/riwayat-tanda-jasa';
import { RiwayatPendidikanUmumPage } from '../pages/riwayat-pendidikan-umum/riwayat-pendidikan-umum';
import { RiwayatPendidikanMiliterPage } from '../pages/riwayat-pendidikan-militer/riwayat-pendidikan-militer';
import { RiwayatSeminarPage } from '../pages/riwayat-seminar/riwayat-seminar';
import { RiwayatKeluargaPage } from '../pages/riwayat-keluarga/riwayat-keluarga';
import { RiwayatJasmaniPage } from '../pages/riwayat-jasmani/riwayat-jasmani';
import { RiwayatDapenPage } from '../pages/riwayat-dapen/riwayat-dapen';
import { RiwayatKesehatanPage } from '../pages/riwayat-kesehatan/riwayat-kesehatan';
import { RiwayatPsikologiPage } from '../pages/riwayat-psikologi/riwayat-psikologi';
import { RiwayatKeahlianPage } from '../pages/riwayat-keahlian/riwayat-keahlian';
import { RiwayatPrestasiPage } from '../pages/riwayat-prestasi/riwayat-prestasi';
import { RiwayatPelanggaranPage } from '../pages/riwayat-pelanggaran/riwayat-pelanggaran';
import { RiwayatBahasaPage } from '../pages/riwayat-bahasa/riwayat-bahasa';
import { RiwayatOrganisasiPage } from '../pages/riwayat-organisasi/riwayat-organisasi';

import { AppConfigProvider } from '../providers/app-config/app-config';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Device } from '@ionic-native/device';

@Component({
  templateUrl: 'app.html' 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  mainViewCtrl:any;
  rootPage: any = PencarianPersonelPage;
  data_user:any = {USERNAMA:''};
  pages: Array<{title: string, component: any}>;
  pages_riwayat: Array<{title: string, component: any,id_page:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public app_config: AppConfigProvider, public menu: MenuController, private androidPermissions: AndroidPermissions, private device: Device) {
    this.initializeApp();   

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Pencarian Personel', component: PencarianPersonelPage }      
    ];

    this.data_user = this.app_config.getUser();
    this.app_config.setRootPage(LoginPage);
    this.pages_riwayat = [
      { title: 'Pangkat', id_page: 'riwayat_pangkat', component: RiwayatPangkatPage },
      { title: 'Jabatan', id_page: 'riwayat_jabatan', component: RiwayatJabatanPage },
      { title: 'Tugas Luar Negeri', id_page: 'tugas_luar_negeri', component: RiwayatTugasLuarNegeriPage },
      { title: 'Tugas Operasi', id_page: 'tugas_operasi', component: RiwayatTugasOperasiPage },
      { title: 'Tanda Jasa', id_page: 'tanda_jasa', component: RiwayatTandaJasaPage },      
      { title: 'Pendidikan Umum', id_page: 'pendidikan_umum', component: RiwayatPendidikanUmumPage },
      { title: 'Pendidikan Militer', id_page: 'pendidikan_militer', component: RiwayatPendidikanMiliterPage },
      { title: 'Seminar/Penataran', id_page: 'seminar', component: RiwayatSeminarPage },      
      { title: 'Keluarga', id_page: 'pernikahan', component: RiwayatKeluargaPage },      
      { title: 'Jasmani', id_page: 'jasmani', component: RiwayatJasmaniPage },
      { title: 'Dapen', id_page: 'dapen', component: RiwayatDapenPage },
      { title: 'Kesehatan', id_page: 'kesehatan', component: RiwayatKesehatanPage },
      { title: 'Psikologi', id_page: 'psikologi', component: RiwayatPsikologiPage },      
      { title: 'Keahlian', id_page: 'keahlian', component: RiwayatKeahlianPage },      
      { title: 'Prestasi', id_page: 'prestasi', component: RiwayatPrestasiPage },      
      { title: 'Pelanggaran', id_page: 'pelanggaran', component: RiwayatPelanggaranPage },            
      { title: 'Bahasa', id_page: 'bahasa', component: RiwayatBahasaPage }, 
      { title: 'Organisasi', id_page: 'organisasi', component: RiwayatOrganisasiPage }
    ];

  }

  initializeApp() {
    let me = this;
    console.log('Device UUID is: ' + this.device.uuid);
    console.log('Device Serial Number is: ' + this.device.serial);    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(()=>{
        me.permissionDownload();
        me.permissionWriteDownload();
        this.splashScreen.hide();  
      },1000);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);    
  }

  openPageRiwayat(page) {
    let me = this,
        viewCtrl = me.app_config.getContent('viewCtrl');    
    this.nav.push(page.component,{
      item:me.app_config.getArgs(),
      page:page
    });    

    if (viewCtrl != undefined && viewCtrl != null) {
      if (viewCtrl.component.name != "DataPokokPage") {        
        viewCtrl.dismiss();
        this.mainViewCtrl = null;
      } else {
        console.log(page.component);
        this.mainViewCtrl = viewCtrl;
      }
    }
  }

  backDataPokok() {
    let me = this,
         viewCtrl = me.app_config.getContent('viewCtrl'); 
    this.nav.push(DataPokokPage,{
      item:me.app_config.getArgs()
    }); 
    
    if (viewCtrl != undefined && viewCtrl != null) {
      viewCtrl.dismiss();
      console.log(viewCtrl,this.mainViewCtrl  );
      if (this.mainViewCtrl != undefined && this.mainViewCtrl != null) {
        this.mainViewCtrl.dismiss();
      }
    }
  }

  logout(){
    localStorage.removeItem("isLoginMS");
    localStorage.removeItem("token");
    this.nav.setRoot(LoginPage);
  }  

  change_password(){
    
  }  

  openMenu(evt) {
      if(evt === "riwayat"){
         this.menu.enable(true, 'menu2');
         this.menu.enable(false, 'menu1');
      }else{
         this.menu.enable(true, 'menu1');
         this.menu.enable(false, 'menu2');
      }
      this.menu.toggle();
  }

  permissionDownload() {
    if (this.platform.is('android')) {     
     console.log("Android");
      this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        .then(status => {
          console.log(JSON.stringify(status));
          if (status.hasPermission) {
            
          } 
          else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
              .then(status => {
                if(status.hasPermission) {
                  
                }
                console.log(JSON.stringify(status));
              });
          }
        });
   } else if (this.platform.is('ios')) {     
       console.log("ios");      
   } else {     
     console.debug("platform not found");
   }
  }

  permissionWriteDownload() {
    console.log("AAA");
    if (this.platform.is('android')) {     
     console.log("Android");
      this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        .then(status => {
          console.log(JSON.stringify(status));
          if (status.hasPermission) {
            
          } 
          else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
              .then(status => {
                if(status.hasPermission) {
                  
                }
                console.log(JSON.stringify(status));
              });
          }
        });
   } else if (this.platform.is('ios')) {     
       console.log("ios");      
   } else {     
     console.debug("platform not found");
   }
  }

}

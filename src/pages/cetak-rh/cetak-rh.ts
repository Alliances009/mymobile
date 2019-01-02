import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Gesture  } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { DomSanitizer } from '@angular/platform-browser';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DocumentViewer } from '@ionic-native/document-viewer';

/**
 * Generated class for the CetakRhPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cetak-rh',
  templateUrl: 'cetak-rh.html',
})
export class CetakRhPage {
  private gesture: Gesture;
  @ViewChild('zoom') element;
  @ViewChild('content') elementContent;
	template:any='';
  data:any={};
  scale:any=1;
  zoom:any=0;
  container = null;
  transforms = [];
  adjustScale = 1;
  adjustDeltaX = 0;
  adjustDeltaY = 0;

  currentScale = null;
  currentDeltaX = null;
  currentDeltaY = null;

  public media: any;
  public src: string;
  public mediaType: string;  
  public mediaLoaded:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public sanitizer: DomSanitizer, public app_config:AppConfigProvider, public file: File, public transfer: FileTransfer, private platform: Platform, private androidPermissions: AndroidPermissions, public document: DocumentViewer) {    
    let url = this.navParams.get('template');
    let data = this.navParams.get('data');
  	this.template = this.sanitizer.bypassSecurityTrustResourceUrl(url+"&token="+this.app_config.getToken());	
    this.data = data;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CetakRhPage');
   
  }

  initZoom() {
    this.container = this.elementContent.nativeElement;
    this.gesture = new Gesture(this.element.nativeElement);

    //listen for the gesture
    this.gesture.listen();
    this.gesture.on("pinch", (ev) => {      
      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale;    
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

      // Concatinating and applying parameters.
      if (this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }

      if (this.currentScale > 2.5) {
        this.currentScale = 2.5;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }


      this.transforms.push('scale(' + this.currentScale + ')');
      this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');  
      console.log("Pinch");
      console.log(this.currentScale); 
      console.log(this.currentDeltaX);
      console.log(this.currentDeltaY);
      console.log("EFR1 = "+this.container.style.width);
      if(this.currentScale == 1){
        this.container.style.width = "100%";
      } else if(this.currentScale == 2.5) {
          this.container.style.width = 50+"%";
      } else {

      }
      
    });
    
    this.gesture.on("pinchend", (ev) => {
      console.log("Pinched");
      // Saving the final transforms for adjustment next time the user interacts.
      let scale = (this.currentScale-1),
          width = this.container.style.width.replace("%");
      if(width && width != "") {
        if(this.currentScale < 1.42) {
          this.container.style.width = (100-(scale*60))+"%";
        } else if(this.currentScale < 1.7 && width < 50) {
          this.container.style.width = (100-(scale*40))+"%";
        }else if(this.currentScale > 2) {
          this.container.style.width = 50+"%";
        }
      }
      console.log(this.currentScale,this.currentDeltaX,this.currentDeltaY);     
      console.log("EFR2 = "+this.container.style.width);
      this.adjustScale = this.currentScale;
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });

    this.gesture.on("panend", (ev) => {
      console.log("Panned");
      // Saving the final transforms for adjustment next time the user interacts.
      console.log(this.currentScale,this.currentDeltaX,this.currentDeltaY); 
      console.log("EFR3 = "+this.container.style.width);
      this.adjustScale = this.currentScale;
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });
  }

  pinchEvent(event) {
        console.log(event);
        console.log("a",JSON.stringify(event));
    }

   panEvent(event) {
      console.log(event);
        console.log("a",JSON.stringify(event));
    }


  dismiss() {   
   this.navCtrl.pop();
 }

 downloadFile() {
   let params = {
     pgid: btoa(this.data.PERSONELID)
   }
   let me = this;
   this.app_config.showLoading("Download");
   this.app_config.requestAjaxGet(this.app_config.data.site_url+"/pegawai/app/download_drh_singkat_mobile",params,function(result) {     
     let url = me.app_config.data.base_url+"/../client/mabestni/rh/"+result.rh+".pdf",
         download_name = me.data.NRP.replace(/[/\\?%*:|"<>]/g, ''),
         path = null;      
       
      if (me.platform.is('ios')) {
        path = me.file.documentsDirectory;
      } else if (me.platform.is('android')) {        
        path = me.file.externalRootDirectory + '/Download/';
      }           
      const transfer = me.transfer.create();
      transfer.download(url, path + download_name + '.pdf').then(entry => {
          if(me.app_config.loadingMask) {
            me.app_config.loadingMask.dismiss();
            me.app_config.showToast('Download berhasil','top');
          }
      });
     
   })

 }

 download_rh() {   
   console.log("A");
   if (this.platform.is('android')) {     
     console.log("Android");
      this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        .then(status => {
          if (status.hasPermission) {
            this.downloadFile();
          } 
          else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
              .then(status => {
                if(status.hasPermission) {
                  this.downloadFile();
                }
              });
          }
        });
   } else if (this.platform.is('ios')) {     
       console.log("ios");
      this.downloadFile();
   } else {     
     console.debug("platform not found");
   }
 }

 onZoomIn(cmp) {
    if(this.zoom < 10) {
      this.zoom++;
      let scale = (this.scale+0.1),
          width = (100-(5*this.zoom));
         cmp.style.transform = "scale("+scale+")";
         this.scale = scale;
         cmp.style.width = width+"%";
    }
 }

 onZoomOut(cmp) {
    if(this.zoom > 0) {
      this.zoom--;

      let scale = (this.scale-0.1),
        wd = parseInt(cmp.style.width.replace("%")),
        width = (wd+5);
       cmp.style.transform = "scale("+scale+")";
       this.scale = scale;
       cmp.style.width = width+"%";
    }
 }

 tapEvent(event) {
        console.log(event);
        console.log("a",JSON.stringify(event));
    }

 pressEvent(event) {
    console.log(event);
      console.log("a",JSON.stringify(event));
  }

}

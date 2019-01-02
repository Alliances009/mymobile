import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { HttpClientModule } from '@angular/common/http';
import { ResourceTreeComponent } from '../components/resource-tree/resource-tree';
import { TreeComponent } from '../components/tree/tree';

import { MyApp } from './app.component';

import { UnitOrganisasiPage } from '../pages/unit-organisasi/unit-organisasi';
import { PencarianPersonelPage } from '../pages/pencarian-personel/pencarian-personel';
import { FormPencarianPersonelPage } from '../pages/form-pencarian-personel/form-pencarian-personel';
import { PencarianSumberPrajuritPage } from '../pages/pencarian-sumber-prajurit/pencarian-sumber-prajurit';
import { PencarianKategoriPersonelPage } from '../pages/pencarian-kategori-personel/pencarian-kategori-personel';
import { PencarianKorpsKecabanganPage } from '../pages/pencarian-korps-kecabangan/pencarian-korps-kecabangan';
import { PencarianUnitOrganisasiPage } from '../pages/pencarian-unit-organisasi/pencarian-unit-organisasi';

import { LoginPage } from '../pages/login/login';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { ResourceTreeProvider } from '../providers/resource-tree/resource-tree';

import { DokumenPage } from '../pages/dokumen/dokumen';
import { PreviewFotoPage } from '../pages/preview-foto/preview-foto';
import { CetakRhPage } from '../pages/cetak-rh/cetak-rh';
import { PencarianProvider } from '../providers/pencarian/pencarian';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp,
    UnitOrganisasiPage,
    PencarianPersonelPage,
    LoginPage,
    DataPokokPage,
    RiwayatPangkatPage,
    RiwayatJabatanPage,
    RiwayatTugasLuarNegeriPage,
    RiwayatTugasOperasiPage,
    RiwayatTandaJasaPage,
    RiwayatPendidikanUmumPage,
    RiwayatPendidikanMiliterPage,
    RiwayatSeminarPage,
    RiwayatKeluargaPage,
    RiwayatJasmaniPage,
    RiwayatDapenPage,
    RiwayatKesehatanPage,
    RiwayatPsikologiPage,
    RiwayatKeahlianPage,
    RiwayatPrestasiPage,
    RiwayatPelanggaranPage,
    RiwayatBahasaPage,
    RiwayatOrganisasiPage,
    DokumenPage,
    ResourceTreeComponent,
    TreeComponent,
    FormPencarianPersonelPage,
    PreviewFotoPage,
    PencarianSumberPrajuritPage,
    PencarianKategoriPersonelPage,
    PencarianKorpsKecabanganPage,
    PencarianUnitOrganisasiPage,
    CetakRhPage    
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    HttpClientModule,    
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    UnitOrganisasiPage,
    PencarianPersonelPage,
    LoginPage,
    DataPokokPage,
    RiwayatPangkatPage,
    RiwayatJabatanPage,
    RiwayatTugasLuarNegeriPage,
    RiwayatTugasOperasiPage,
    RiwayatTandaJasaPage,
    RiwayatPendidikanUmumPage,
    RiwayatPendidikanMiliterPage,
    RiwayatSeminarPage,
    RiwayatKeluargaPage,
    RiwayatJasmaniPage,
    RiwayatDapenPage,
    RiwayatKesehatanPage,
    RiwayatPsikologiPage,
    RiwayatKeahlianPage,
    RiwayatPrestasiPage,
    RiwayatPelanggaranPage,
    RiwayatBahasaPage,
    RiwayatOrganisasiPage,
    DokumenPage,
    ResourceTreeComponent,
    TreeComponent,
    FormPencarianPersonelPage,
    PreviewFotoPage,
    PencarianSumberPrajuritPage,
    PencarianKategoriPersonelPage,
    PencarianKorpsKecabanganPage,
    PencarianUnitOrganisasiPage,
    CetakRhPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConfigProvider,
    ResourceTreeProvider,
    DocumentViewer,
    File,
    FileTransfer,
    AndroidPermissions,
    Device,
    PencarianProvider
  ]
})
export class AppModule {}

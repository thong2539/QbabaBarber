import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { NewbarberPage} from '../newbarber/newbarber';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  barbershop:any=0;
  data:any=0;
  constructor(public navCtrl: NavController,public navParam: NavParams, public http: Http,private alertCtrl:AlertController) {
    this.getData();
  }
  showDetail(id)
  {
    this.navCtrl.push(DetailPage,{barberid:id});
  }
  newbarber()
  {
    this.navCtrl.push(NewbarberPage);
  }  
  //แสดงข้อมูลเมื่อเปิดมาสู่หน้าครั้งแรก
  getData(){
    this.http.get('http://localhost:8080/barbershop')
    .map(res => res.json()).subscribe(data => {this.barbershop= data});
  }
  //แสดงข้อมูลเมื่อไปหน้าอื่นแล้วกลับมาสู่หน้า Home
  ionViewWillEnter(){
    this.getData();
  }
  deleteData(BarberID){
    this.alertCtrl.create({
      title:"Confirm", subTitle:"Confirm delete",buttons:[
        { 
          text: "Yes",
          handler:()=>{
            let url ="http://localhost:8080/barbershop/"+BarberID;
            this.http.delete(url)
              .subscribe(res=>{
                this.data=res;
                console.log(this.data);
                  this.showAlert("Success", "Data deleted");
                  this.getData();
              }); 
          }
        },
        {
          text: "No",
          handler:()=>{}
        }
      ]
    })
      .present();
   
  }

  showAlert(msgTitle:string, message:string){
    const alert = this.alertCtrl.create({
      title: msgTitle,
      subTitle: message,
      buttons: ["OK"]
    });
    //show alert
    alert.present();
}

}

import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { UserModel } from '../models/UserModel';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  @ViewChild(IonCard, { read: ElementRef }) card : ElementRef<HTMLIonButtonElement>;

  private animation: Animation;

  listUser: UserModel[] = [
    new UserModel('Jorge','Gomez','jgomez@gmail.com',undefined,'estudiante','jgomez','jorge123'),
    new UserModel('Juan','Perez','jperez@gmail.com',undefined,'profesor','jperez','juan123'),
    new UserModel('Carlos','Gomez','cgomez@gmail.com',undefined,'estudiante','cgomez','carlos123'),
    new UserModel('Valentina','Gomez','vgomez@gmail.com',undefined,'profesor','vgomez','valentina123')
  ];

  public alertButtons = ['Comprendo'];

  userLoginModal: IUserLogin = {
    username: '',
    password: ''
  };

  constructor(private route: Router, private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.userLoginModalRestart();

  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'blue', 'var(--background)');

    this.animation.play();
  }


  userLogin(userLoginInfo: IUserLogin): boolean{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].username == userLoginInfo.username) && (this.listUser[i].password == userLoginInfo.password)){
        console.log('User Loged...', this.userLoginModal.username, this.userLoginModal.password);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if(this.listUser[i].type == 'estudiante'){

          setTimeout(() => {
            let sendInfo = this.route.navigate(['/home'], userInfoSend);
            return true;
          }, 3000);
     
        }else{

          setTimeout(() => {
            let sendInfo = this.route.navigate(['/admin'], userInfoSend);
            return true;
          }, 3000)
      
        }
      }
    }
    this.userLoginModalRestart();
    return false;
    
  }

  userLoginModalRestart(): void{
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
  }

}

import { UiService } from './../shared/ui.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private isAuthenticated=false;
authChange=new Subject<boolean>();
  constructor(private router:Router,
    private aFAuth:AngularFireAuth,
    private uiservice:UiService) { }

 registerUser(authData:AuthData)
 {
  this.uiservice.loadingStateChanged.next(true);
   this.aFAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
   .then(result=>{
    this.uiservice.loadingStateChanged.next(false);
   })
   .catch(error=>{
    this.uiservice.loadingStateChanged.next(false);
    this.uiservice.showSnackbar(error.message,null,4000);
   });
 }
 login(authData:AuthData)
 {
   this.uiservice.loadingStateChanged.next(true);
  this.aFAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
  .then(result=>{
    this.uiservice.loadingStateChanged.next(false);
    console.log(result);

  })
  .catch(error=>{
    this.uiservice.loadingStateChanged.next(false);
    this.uiservice.showSnackbar(error.message,null,4000);
  });
 }
 logout(){
this.aFAuth.auth.signOut();
 }

 isAuth(){
   return this.isAuthenticated;
 }

initAuthListener(){
  this.aFAuth.authState.subscribe(user=>{
    if(user){
      this.isAuthenticated=true;
      this.authChange.next(true);
      this.router.navigate(['/training']);
    }
    else{
      this.authChange.next(false);
   this.router.navigate(['/login']);
   this.isAuthenticated=false;
    }
  })
}


}

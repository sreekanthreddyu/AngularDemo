import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
loginForm:FormGroup;
isLoading=false;
private loadingSub:Subscription;
  constructor(private authService:AuthService,
    private uiService:UiService) { }

  ngOnInit() {
 this.loadingSub=this.uiService.loadingStateChanged.subscribe(isLoading =>
      {
        this.isLoading=isLoading
      });
    this.loginForm=new FormGroup({
      email:new FormControl('',{
        validators:[Validators.email,Validators.required]
      }),
      password:new FormControl('',{
        validators:[Validators.required]
      })
    });
  }

onSubmit()
{
  this.authService.login({
    email:this.loginForm.value.email,
    password:this.loginForm.value.password
  })
}
ngOnDestroy(){
  this.loadingSub.unsubscribe();
}
}

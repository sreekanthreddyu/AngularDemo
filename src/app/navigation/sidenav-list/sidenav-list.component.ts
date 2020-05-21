import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit,EventEmitter,Output,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,OnDestroy {
@Output() closeToggle=new EventEmitter<void>();
authSubscription:Subscription;
isAuth=false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus;
    })
  }
  onClose(){
    this.closeToggle.emit();
  }
  onLogout(){
    this.authService.logout();
    this.onClose();
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}

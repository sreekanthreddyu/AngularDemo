import { AuthService } from './auth.service';
import{CanActivate,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import{Router} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService,private router:Router){}
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){

     if(this.authService.isAuth()){
       return true;
     }
     else
     {
       this.router.navigate(['/login']);
     }
  }
}

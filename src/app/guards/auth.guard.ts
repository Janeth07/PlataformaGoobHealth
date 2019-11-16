import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {take, map, tap} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private afsAuth:AngularFireAuth, private router:Router){}

  canActivate(
    next:ActivatedRouteSnapshot, 
    state: RouterStateSnapshot)
  : Observable<boolean> | Promise<boolean> | boolean{
    return this.afsAuth.authState.
    pipe(take(1)).
    pipe(map (authSate=>!! authSate))
    .pipe(tap (auth=>{
      if(!auth){
        this.router.navigate(['/']);
      }
    }));
    /*if (this.authService) {//despues del authservice va el metodo de autentificacion 
      //Login True
      return true;
    }else{
      this.router.navigate(['login'])///adentro de los parentesis va la ruta a donde se va a direccionar
return false;
    }*/
   
  }
}

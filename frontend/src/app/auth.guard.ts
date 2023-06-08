import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let b:boolean = true;
      if(this.auth.isLoggedIn()!=route.data['login']){
        if(this.auth.isLoggedIn())
		      this.nav(this.auth.getRole());
        else
          this.router.navigate(['login']);
        b = false;
      }else if(this.auth.isLoggedIn()){
        if(this.auth.getRole()!=route.data['role']){
          this.nav(this.auth.getRole());
          b = false;
        }
	    }
      return b;
  }
	nav(role:string){
	  switch(role){
	    case "s":
		  this.router.navigate(['s']);
		  break;
	  }
	}

}

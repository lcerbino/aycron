import { UserService } from './../services/user.service';
import { IUser } from './../user/user';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {
        this.userService = userService;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkLogin();
    }
    checkLogin(): boolean {
        let userName = sessionStorage.getItem('userName');
        let password = sessionStorage.getItem('password');

        console.log(userName);
        console.log(password);
        this.userService.getUsersByPasswordAndUserName(String(userName), String(password)).subscribe({
            next: user => {

                if (typeof user !== 'undefined') {
                    // this.router.navigate(["/user"]);
                    console.log('here');
                    return true;
                }
                this.router.navigate(['/login']);
                return false;
            }
        });

        return false;
    }

}
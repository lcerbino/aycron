import { UserService } from './../services/user.service';
import { IUser } from './../user/user';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    isAutenticated: Boolean = false;

    constructor(private router: Router, private userService: UserService) {
        this.userService = userService;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.checkLogin();

    }
    async checkLogin(): Promise<any> {
        let username = sessionStorage.getItem('userName');
        let password = sessionStorage.getItem('password');

        let users = await this.userService.getUsers().toPromise();
        let user = Object.values(users).find(z => z.userName == username && z.password == password);
        if (typeof user !== 'undefined') {
            return true;
        }

        sessionStorage.setItem('userName', '');
        sessionStorage.setItem('password', '');
        this.router.navigate(["/login"]);
        return false;
    }
}
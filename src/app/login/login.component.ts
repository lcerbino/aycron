import { IUser } from './../user/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LogInComponent {
    errorMessage: any;
    enableInvalidCredential: boolean = false;

    constructor(private router: Router, private userService: UserService) {
    }
    username: any = '';
    password: any = '';

    ngOnInit() {
        this.enableInvalidCredential = false;
    }

    async login(): Promise<void> {

        let users = await this.userService.getUsers().toPromise();
        let user = Object.values(users).find(z => z.userName == this.username && z.password == this.password);

        console.log(Object.values(users));
        if (typeof user !== 'undefined') {
            sessionStorage.setItem('userName', user.userName);
            sessionStorage.setItem('password', user.password);
            this.router.navigate(["/user"]);
        } else {
            this.enableInvalidCredential = true;
        }

    }
}

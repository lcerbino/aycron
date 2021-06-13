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

    login(): void {
        this.checkUserByPasswordAndUserName(this.username, this.password);
    }

    checkUserByPasswordAndUserName(username: any, password: any): any {
        this.userService.getUsersByPasswordAndUserName(username, password).subscribe({
            next: user => {

                sessionStorage.setItem('userName', username);
                sessionStorage.setItem('password', password);

                if (typeof user !== 'undefined') {
                    console.log('hola');
                    this.router.navigate(["/user"]);
                } else {
                    this.enableInvalidCredential = true;
                }
            },
            error: err => this.errorMessage = err
        });
    }

}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-newUser-root',
    templateUrl: './newUser.component.html',
    styleUrls: ['./newUser.component.css']
})
export class NewUserComponent {

    constructor(private fb: FormBuilder) { }

    profileForm = this.fb.group({
        userName: ['', Validators.required, Validators.email],
        lastName: ['', Validators.required],
        repeatPassword: ['', Validators.required],
        password: ['', Validators.required]
    });

}

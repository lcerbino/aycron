import { UserService } from './../services/user.service';

import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
    selector: 'app-user',
    styleUrls: ['user.component.css'],
    templateUrl: 'user.component.html',
})
export class UserComponent {
    displayedColumns: string[] = ['fecha', 'userName', 'name', 'actions'];
    // dataSource = [...ELEMENT_DATA];

    @ViewChild(MatTable)
    table!: MatTable<PeriodicElement>;
    users: any;

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(z => {
            this.users = Object.values(z);
        });
    }

    addUser() {
        this.router.navigate(["/newUser"]);
    }

    delete(row: any) {
        //delete from the dom
        let usersAux = [...this.users];
        let userAuxfiltered = usersAux.filter(r => r.id !== row.id);
        this.users = [...userAuxfiltered];

        //update deleted

        this.userService.UpdateUser(this.users).subscribe();
    }
}
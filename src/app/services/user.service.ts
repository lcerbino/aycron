import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from "../user/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = 'https://aycorn-a7dbe-default-rtdb.firebaseio.com/users.json';

    constructor(private http: HttpClient) { }

    //get all users
    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.userUrl)
            .pipe(
                tap(data => console.log('All: ', JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getUsersByPasswordAndUserName(userName: string, password: string): Observable<IUser | undefined> {
        return this.getUsers()
            .pipe(
                map((users: IUser[]) => users.find(p => p.userName === userName && p.password === password))
            );
    }


    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error occurred: ${err.error.message}`;
        } else {

            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}

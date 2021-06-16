import { IUser } from './../user/user';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = 'https://aycorn-a7dbe-default-rtdb.firebaseio.com/users.json';

    constructor(private http: HttpClient) { }

    //get all users
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.userUrl)
            .pipe(
                tap(data => console.log('All: ', JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getUsersByPasswordAndUserName(userName: string, password: string): Observable<any | undefined> {
        return this.getUsers()
            .pipe(
                map((users: any[]) => users.find(p => p.userName === userName && p.password === password))
            );
    }

    AddUser(user: IUser) {
        return this.http.post(this.userUrl, user).
            pipe(catchError(this.handleError));
    }

    UpdateUser(user: IUser) {
        return this.http.put(this.userUrl, user).
            pipe(catchError(this.handleError));
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

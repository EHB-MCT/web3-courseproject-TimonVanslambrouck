import { IUser } from '../user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<IUser[]>(`http://localhost:3000/users`);
    }

    register(user: IUser) {
        return this.http.post(`http://localhost:3000/`, user);
    }
}
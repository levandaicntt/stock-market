import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  username: string;
  // Nếu API trả về token thì thêm token ở đây
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadInitialUser();
  }

  private loadInitialUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // Đăng ký user mới
  register(userData: {
    username: string;
    email: string;
    password: string
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }

  // Đăng nhập
  login(credentials: {
    email: string;
    password: string
  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/stocks']);
      })
    );
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Lấy thông tin user hiện tại
  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Tạo headers với token (nếu có)
  getAuthHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Authorization': `Bearer ${user?.token}`
    });
  }
}

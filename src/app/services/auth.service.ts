import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar si hay un usuario guardado
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Método público para verificar autenticación
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    // En un entorno real, esto sería una llamada a la API
    // Para simplificar, simulamos una respuesta exitosa
    return of({
      user: {
        id: 1,
        name: 'Usuario Demo',
        email: email
      }
    }).pipe(
      tap(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<any[]> {
    // Simulamos datos de usuarios
    return of([
      { id: 1, name: 'Usuario 1', avatar: null },
      { id: 2, name: 'Usuario 2', avatar: null },
      { id: 3, name: 'Usuario 3', avatar: null },
      { id: 4, name: 'Usuario 4', avatar: null },
      { id: 5, name: 'Usuario 5', avatar: null },
      { id: 6, name: 'Usuario 6', avatar: null }
    ]);
  }
}

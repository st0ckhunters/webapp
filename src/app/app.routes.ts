import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

// Guard simple
const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Cambiar esto para usar un método público en lugar de la propiedad privada
  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sales',
    loadComponent: () => import('./pages/sales/sales.component').then(m => m.SalesComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];

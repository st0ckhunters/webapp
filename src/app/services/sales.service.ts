import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor() {}

  getSales(): Observable<any[]> {
    // Datos de ejemplo
    const date = new Date();
    return of(
      Array(5)
        .fill(0)
        .map((_, i) => ({
          id: i + 1,
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - i
          ),
          product: 'Producto A',
          quantity: 10,
          status: 'Completado',
          client: 'Cliente A',
        }))
    );
  }
}

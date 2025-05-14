import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts(): Observable<any[]> {
    // Datos de ejemplo
    return of(
      Array(12)
        .fill(0)
        .map((_, i) => ({
          id: i + 1,
          name: `Producto ${i + 1}`,
          description: 'Descripción del producto',
          price: 25.0,
          category: 'Categoría',
          image: null,
        }))
    );
  }
}

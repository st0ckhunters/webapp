import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from '../../services/products.service';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, HeaderComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private productsService: ProductsService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = [...products];
      this.loading = false;
    });
  }

  searchProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
  }

  addProduct(): void {
    alert('Funcionalidad para agregar producto');
  }

  selectProduct(product: any): void {
    alert(`Producto seleccionado: ${product.name}`);
  }
}

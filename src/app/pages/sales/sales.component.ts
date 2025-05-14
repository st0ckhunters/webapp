import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SalesService } from '../../services/sales.service';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, HeaderComponent],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  sales: any[] = [];
  filteredSales: any[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private salesService: SalesService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.salesService.getSales().subscribe((sales) => {
      this.sales = sales;
      this.filteredSales = [...sales];
      this.loading = false;
    });
  }

  searchSales(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSales = [...this.sales];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredSales = this.sales.filter(
      (sale) =>
        sale.product.toLowerCase().includes(term) ||
        sale.client.toLowerCase().includes(term) ||
        sale.status.toLowerCase().includes(term)
    );
  }

  addSale(): void {
    alert('Funcionalidad para agregar venta');
  }

  selectSale(sale: any): void {
    alert(`Venta seleccionada: ${sale.id}`);
  }
}

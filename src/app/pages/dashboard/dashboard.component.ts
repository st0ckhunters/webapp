import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  salesChart: any;

  // Datos del dashboard
  summary = {
    income: 8580,
    stock: 325,
    salesTotal: 325,
  };

  recentActivity = Array(10)
    .fill(0)
    .map((_, i) => ({
      title: `Item ${i + 1}`,
      timestamp: new Date(
        new Date().getTime() - i * 3600000
      ).toLocaleTimeString(),
    }));

  constructor(
    private authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // Inicializar gráfico después de que la vista esté lista
    setTimeout(() => this.initSalesChart(), 100);
  }

  initSalesChart(): void {
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Datos de ejemplo para el gráfico
    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const data = [12, 8, 20, 15, 25, 18, 30];

    this.salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ventas por día',
            data: data,
            backgroundColor: '#1976d2',
            borderColor: '#1976d2',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

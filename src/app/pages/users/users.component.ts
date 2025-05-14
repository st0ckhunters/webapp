import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
      this.loading = false;
    });
  }

  selectUser(user: any): void {
    // Guardar usuario seleccionado y navegar al dashboard
    this.router.navigate(['/dashboard']);
  }
}

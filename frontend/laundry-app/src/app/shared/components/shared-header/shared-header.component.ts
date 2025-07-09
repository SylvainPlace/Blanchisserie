import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss']
})
export class SharedHeaderComponent {
  @Input() title: string = '';
  userFullName: string = '';

  constructor(
    private authService: AuthService, 
    private navigationService: NavigationService
  ) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userFullName = `${user.firstName} ${user.lastName}`;
    }
  }

  handleLogout() {
    this.authService.logout();
    this.navigationService.navigateToLogin();
  }
}

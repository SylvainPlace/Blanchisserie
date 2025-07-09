import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigService } from './config.service';
import { AppConfig } from '../interfaces/config.interface';

export interface ToastOptions {
  severity?: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private messageService: MessageService,
    private configService: ConfigService
  ) {}

  showSuccess(messageKey: keyof AppConfig['messages']['success'], options?: ToastOptions): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: this.configService.getSuccessMessage(messageKey),
      life: options?.life || this.configService.getToastDuration(),
      ...options
    });
  }

  showError(messageKey: keyof AppConfig['messages']['error'], options?: ToastOptions): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: this.configService.getErrorMessage(messageKey),
      life: options?.life || this.configService.getToastDuration(),
      ...options
    });
  }

  showInfo(messageKey: keyof AppConfig['messages']['info'], options?: ToastOptions): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: this.configService.getInfoMessage(messageKey),
      life: options?.life || this.configService.getToastDuration(),
      ...options
    });
  }

  showCustom(message: string, options?: ToastOptions): void {
    this.messageService.add({
      severity: options?.severity || 'info',
      summary: options?.summary || 'Information',
      detail: message,
      life: options?.life || this.configService.getToastDuration(),
      ...options
    });
  }

  clear(): void {
    this.messageService.clear();
  }
}

import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type ContactField = 'name' | 'email' | 'message';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactModalComponent implements OnDestroy {
  readonly isOpen = input(false);
  readonly closed = output<void>();

  @ViewChild('dialogPanel')
  private readonly dialogPanel?: ElementRef<HTMLElement>;

  @ViewChild('nameInput')
  private readonly nameInput?: ElementRef<HTMLInputElement>;

  private readonly formBuilder = inject(FormBuilder);
  private readonly document = inject(DOCUMENT);

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly isRendered = signal(false);
  readonly isVisible = signal(false);
  readonly isSubmitting = signal(false);
  readonly isSuccess = signal(false);

  private closeTimerId: number | null = null;
  private focusTimerId: number | null = null;
  private submitTimerId: number | null = null;
  private previouslyFocusedElement: HTMLElement | null = null;
  private previousBodyPaddingRight = '';
  private previousBodyPosition = '';
  private previousBodyTop = '';
  private previousBodyWidth = '';
  private previousBodyLeft = '';
  private previousBodyRight = '';
  private previousBodyOverflow = '';
  private previousHtmlScrollBehavior = '';
  private lockedScrollY = 0;
  private isBodyScrollLocked = false;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.unlockBodyScroll();
  }

  get nameControl(): AbstractControl<string, string> {
    return this.form.controls.name;
  }

  get emailControl(): AbstractControl<string, string> {
    return this.form.controls.email;
  }

  get messageControl(): AbstractControl<string, string> {
    return this.form.controls.message;
  }

  requestClose(): void {
    this.closed.emit();
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalidControl();
      return;
    }

    this.isSubmitting.set(true);
    this.form.disable();

    this.submitTimerId = window.setTimeout(() => {
      this.submitTimerId = null;
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      this.form.enable();
      this.form.reset({
        name: '',
        email: '',
        message: ''
      });
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.focusDialogPanel();
    }, 1400);
  }

  startNewMessage(): void {
    this.isSuccess.set(false);
    this.focusFirstField();
  }

  isFieldInvalid(field: ContactField): boolean {
    const control = this.getControl(field);
    return control.invalid && (control.touched || control.dirty);
  }

  getFieldError(field: ContactField): string {
    const control = this.getControl(field);

    if (!this.isFieldInvalid(field)) {
      return '';
    }

    if (control.hasError('required')) {
      switch (field) {
        case 'name':
          return 'Cuéntame cómo te llamas.';
        case 'email':
          return 'Necesito un correo para responderte.';
        case 'message':
          return 'Escribe un mensaje con algo de contexto.';
      }
    }

    if (field === 'email' && control.hasError('email')) {
      return 'Ingresa un correo válido.';
    }

    if (field === 'message' && control.hasError('minlength')) {
      return 'El mensaje debe tener al menos 10 caracteres.';
    }

    return 'Revisa este campo e inténtalo nuevamente.';
  }

  @HostListener('document:keydown', ['$event'])
  handleDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isRendered()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.requestClose();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private openModal(): void {
    this.clearCloseTimer();

    if (!this.isRendered()) {
      this.previouslyFocusedElement = this.getActiveElement();
      this.resetModalState();
      this.isRendered.set(true);
    }

    this.lockBodyScroll();

    this.focusTimerId = window.setTimeout(() => {
      this.isVisible.set(true);
      this.focusFirstField();
    }, 16);
  }

  private closeModal(): void {
    if (!this.isRendered()) {
      return;
    }

    this.clearCloseTimer();
    this.clearFocusTimer();
    this.cancelFakeSubmit();

    this.isVisible.set(false);
    this.unlockBodyScroll();

    this.closeTimerId = window.setTimeout(() => {
      this.closeTimerId = null;
      this.isRendered.set(false);
      this.resetModalState();
      this.restorePreviousFocus();
    }, 220);
  }

  private resetModalState(): void {
    this.isSubmitting.set(false);
    this.isSuccess.set(false);
    this.form.enable();
    this.form.reset({
      name: '',
      email: '',
      message: ''
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private getControl(field: ContactField): AbstractControl<string, string> {
    return this.form.controls[field];
  }

  private focusFirstField(): void {
    if (this.isSuccess()) {
      this.focusDialogPanel();
      return;
    }

    this.nameInput?.nativeElement.focus();
  }

  private focusFirstInvalidControl(): void {
    if (this.nameControl.invalid) {
      this.nameInput?.nativeElement.focus();
      return;
    }

    const emailInput = this.dialogPanel?.nativeElement.querySelector<HTMLInputElement>(
      '[formcontrolname="email"]'
    );
    const messageInput = this.dialogPanel?.nativeElement.querySelector<HTMLTextAreaElement>(
      '[formcontrolname="message"]'
    );

    if (this.emailControl.invalid) {
      emailInput?.focus();
      return;
    }

    if (this.messageControl.invalid) {
      messageInput?.focus();
    }
  }

  private focusDialogPanel(): void {
    this.dialogPanel?.nativeElement.focus();
  }

  private trapFocus(event: KeyboardEvent): void {
    const container = this.dialogPanel?.nativeElement;

    if (!container) {
      return;
    }

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute('hidden'));

    if (!focusableElements.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = this.getActiveElement();

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  private lockBodyScroll(): void {
    if (this.isBodyScrollLocked) {
      return;
    }

    const body = this.document.body;
    const html = this.document.documentElement;
    const scrollbarGap = window.innerWidth - html.clientWidth;

    this.isBodyScrollLocked = true;
    this.lockedScrollY = window.scrollY;

    this.previousBodyPosition = body.style.position;
    this.previousBodyTop = body.style.top;
    this.previousBodyWidth = body.style.width;
    this.previousBodyLeft = body.style.left;
    this.previousBodyRight = body.style.right;
    this.previousBodyOverflow = body.style.overflow;
    this.previousBodyPaddingRight = body.style.paddingRight;
    this.previousHtmlScrollBehavior = html.style.scrollBehavior;

    body.style.position = 'fixed';
    body.style.top = `-${this.lockedScrollY}px`;
    body.style.width = '100%';
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';

    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }
  }

  private unlockBodyScroll(): void {
    if (!this.isBodyScrollLocked) {
      return;
    }

    const body = this.document.body;
    const html = this.document.documentElement;

    body.style.position = this.previousBodyPosition;
    body.style.top = this.previousBodyTop;
    body.style.width = this.previousBodyWidth;
    body.style.left = this.previousBodyLeft;
    body.style.right = this.previousBodyRight;
    body.style.overflow = this.previousBodyOverflow;
    body.style.paddingRight = this.previousBodyPaddingRight;

    this.isBodyScrollLocked = false;

    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, this.lockedScrollY);

    requestAnimationFrame(() => {
      html.style.scrollBehavior = this.previousHtmlScrollBehavior;
    });
  }

  private restorePreviousFocus(): void {
    this.previouslyFocusedElement?.focus({ preventScroll: true });
    this.previouslyFocusedElement = null;
  }

  private getActiveElement(): HTMLElement | null {
    return this.document.activeElement instanceof HTMLElement
      ? this.document.activeElement
      : null;
  }

  private cancelFakeSubmit(): void {
    if (this.submitTimerId !== null) {
      window.clearTimeout(this.submitTimerId);
      this.submitTimerId = null;
    }
  }

  private clearCloseTimer(): void {
    if (this.closeTimerId !== null) {
      window.clearTimeout(this.closeTimerId);
      this.closeTimerId = null;
    }
  }

  private clearFocusTimer(): void {
    if (this.focusTimerId !== null) {
      window.clearTimeout(this.focusTimerId);
      this.focusTimerId = null;
    }
  }

  private clearTimers(): void {
    this.clearCloseTimer();
    this.clearFocusTimer();
    this.cancelFakeSubmit();
  }
}

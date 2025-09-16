import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="backdrop" (click)="onBackdrop($event)">
      <div class="modal" #dialogEl role="dialog" aria-modal="true" [attr.aria-labelledby]="titleId" tabindex="-1" (click)="$event.stopPropagation()" (keydown.escape)="closeModal()" (keydown)="onKeydown($event)">
        <header>
          <h2 [id]="titleId">{{ title }}</h2>
          <button class="btn" (click)="closeModal()" aria-label="ปิด">✕</button>
        </header>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ModalComponent implements AfterViewInit {
  @Input() title = '';
  @Input() titleId = 'modal-title';
  @Output() close = new EventEmitter<void>();
  @ViewChild('dialogEl') dialogEl?: ElementRef<HTMLDivElement>;
  previouslyFocused: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.previouslyFocused = (document.activeElement as HTMLElement) ?? null;
    // Delay focus until after view is stable
    setTimeout(() => {
      this.dialogEl?.nativeElement.focus();
    }, 0);
  }

  closeModal(){
    // attempt to restore focus to previously focused element
    if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
      this.previouslyFocused.focus();
    }
    this.close.emit();
  }
  onBackdrop(event: MouseEvent) { this.closeModal(); }

  onKeydown(event: KeyboardEvent){
    if (event.key !== 'Tab') return;
    const focusables = this.getFocusableElements();
    if (focusables.length === 0) {
      // keep focus on dialog itself
      event.preventDefault();
      this.dialogEl?.nativeElement.focus();
      return;
    }
    const active = document.activeElement as HTMLElement | null;
    const currentIndex = active ? focusables.indexOf(active) : -1;
    let nextIndex = 0;
    if (event.shiftKey) {
      nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
    }
    event.preventDefault();
    focusables[nextIndex].focus();
  }

  private getFocusableElements(): HTMLElement[] {
    const root = this.dialogEl?.nativeElement;
    if (!root) return [];
    const selectors = [
      'a[href]','area[href]','button:not([disabled])','input:not([disabled])','select:not([disabled])','textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])','[contenteditable="true"]'
    ].join(',');
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));
    return nodes.filter(el => this.isVisible(el));
  }

  private isVisible(el: HTMLElement): boolean {
    const style = window.getComputedStyle(el);
    return style.visibility !== 'hidden' && style.display !== 'none' && el.offsetParent !== null || style.position === 'fixed';
  }
}

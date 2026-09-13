import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class AppClickOutsideDirective {
  @Input() appClickOutsideEnabled: boolean = true;
  @Output() appClickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (!this.appClickOutsideEnabled) {
      return;
    }
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}

import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  open = false;


  @HostListener('click')  onMouseClick() {
      if (this.open) {
        this.renderer.removeClass(this.elementRef.nativeElement.parentNode, 'open');
      } else {
        this.renderer.addClass(this.elementRef.nativeElement.parentNode, 'open');
      }
      this.open = !this.open;
  }


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

}

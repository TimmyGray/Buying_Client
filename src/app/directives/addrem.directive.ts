import { Directive,ElementRef,Renderer2,HostListener,HostBinding, Input } from '@angular/core';

@Directive({

  selector: '[addrem]'

})
export class AddRemDirective {

  @Input("addrem") display: string;

  @HostBinding('style.display') get getDisplay() {

    return this.display;

  }

  constructor(private elref: ElementRef, private renderer: Renderer2) {

    this.renderer.setStyle(elref.nativeElement, 'display', 'none');
    this.display = 'none';

  }

}

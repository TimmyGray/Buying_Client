import { Directive,Renderer2,HostListener,ElementRef, OnInit } from "@angular/core";


@Directive({
  selector:"[scroll]"

})

export class ScrollDirective implements OnInit {

  ngOnInit() {
    window.addEventListener('scroll', this.scrolling, true);
  }

  isFixed: boolean = true;
  scrolling(s:any) {
    let sc = s.target.scrollingElement.scrollTop;
    console.log();
    if (sc >= 100) { this.isFixed = true }
    else { this.isFixed = false }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

    //this.renderer.addClass(elRef.nativeElement, 'fixed');

  }

  @HostListener('window:scroll', ['$event']) onScroll(event: Event): void {
   // if (document.body.scrollHeight == this.elRef.nativeElement.getBoundingClientRect())
    //console.log(this.elRef.nativeElement.getBoundingClientRect().y);
    //console.log(document.body.scrollHeight);
    //console.log(document.body.clientHeight);
    //console.log(document.body.offsetHeight);
    //console.log(this.elRef.nativeElement.scrollTop);


  //  this.renderer.removeClass(this.elRef.nativeElement, 'fixed');

  }

}

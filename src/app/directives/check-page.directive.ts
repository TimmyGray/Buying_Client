import { Directive,ElementRef,Renderer2, OnInit,ViewChild, HostListener } from '@angular/core';

@Directive({

  selector: '[checkpage]'


})
export class CheckPageDirective implements OnInit {

  public fixed: boolean;
  
  private changeClass() {

    let dtb: Element|null = document.getElementById("dtb");
    dtb?.classList.add("fixedbot");

  }
  @HostListener('click') onClick() {
    var st = document.body.scrollTop;
    var sh = document.body.scrollHeight;
    var ch = document.body.clientHeight;
    var endofpage = Math.abs(st - sh - ch);
    this.changeClass();

    //console.log(`body scrolltop:${st}`);
    //console.log(`body scrollheight:${sh}`);
    //console.log(`body clientheight:${ch}`);
    //console.log(`end_of_page:${endofpage}`);


  }

  constructor(private elref: ElementRef, private renderer: Renderer2) {
    console.log(document.body.clientHeight);
    console.log(document.body.scrollHeight);
    if (document.body.clientHeight == document.body.scrollHeight) {

      this.fixed = true;
      this.elref.nativeElement.classList.add("fixed-bot");
      this.elref.nativeElement.classList.remove("sticky-bot");


    }
    else {

      this.elref.nativeElement.classList.remove("fixed-bot");
      this.elref.nativeElement.classList.add("sticky-bot");

      this.fixed = false;

    }

  }

  ngOnInit() {

  }


}

import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit{
  @Input() autoFocus: boolean;
  constructor(private elem: ElementRef) { }

  ngAfterContentInit(): void {
    this.elem.nativeElement.focus();
  }
}

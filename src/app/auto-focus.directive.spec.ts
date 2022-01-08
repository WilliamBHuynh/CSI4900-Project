import { AutoFocusDirective } from './auto-focus.directive';
import {ElementRef} from "@angular/core";

describe('AutoFocusDirective', () => {
  it('should create an instance', () => {
    const elem: ElementRef = new ElementRef<any>(null);
    const directive = new AutoFocusDirective(elem);
    expect(directive).toBeTruthy();
  });
});

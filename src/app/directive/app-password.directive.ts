import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appPassword]'

})

export class AppPasswordDirective {
  constructor(private el: ElementRef) {
   
  }

}


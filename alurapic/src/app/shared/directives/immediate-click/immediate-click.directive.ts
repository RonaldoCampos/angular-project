import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatFormDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class immediateClickDirective implements OnInit{

    constructor(
        private element: ElementRef<any>,
        private platFormDetector: PlatFormDetectorService) {
    }
    
    ngOnInit(): void {
        this.platFormDetector.isPlatFormBrowser &&
        this.element.nativeElement.click();
    }
}
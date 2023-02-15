import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup} from "@angular/forms";
import { AnimationController, Platform } from '@ionic/angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
    public userForm:any;
    show_accessible:boolean = false;
    fontSize = 16;

    myCustomPageTransition = ((baseEl: any, opts?: any) => { 

        const DURATION = 400;
        const EASING = 'cubic-bezier(0.1, -0.6, 0.2, 0)';
        const OPACITY = 'opacity';
        const TRANSFORM = 'transform';
        const TRANSLATEX = 'transform';
        const CENTER = 'translateX(0%)';
        const OFF_OPACITY = 1;
        const OFF_RIGHT = 'translateX(-100%)';
        const OFF_LEFT = 'translateX(100%)';
        if (opts.direction === 'forward') {
            // var anim1 = this.animationCtrl.create()
            //     .addElement(opts.leavingEl)
            //     .duration(800)
            //     .iterations(1)
            //     .easing('cubic-bezier(0.1, -0.6, 0.2, 0)')
            //     .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
            // var anim2 = this.animationCtrl.create()
            //     .addElement(opts.enteringEl)
            //     .duration(1200)
            //     .iterations(1)    
            //     .easing('cubic-bezier(0.1, 0, 0.2, -0.6)')
            //     .fromTo('opacity', '0.25', '1')
            // var anim3 = this.animationCtrl.create()
            //     .addAnimation([anim1, anim2]);
            // return anim3;

            var anim1 = this.animationCtrl.create()
                .addElement(opts.leavingEl)
                .duration(DURATION)
                .iterations(1)
                .easing(EASING)
                .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY)
                .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                .afterClearStyles([TRANSFORM, OPACITY])
            var anim2 = this.animationCtrl.create()
                .addElement(opts.enteringEl)
                .duration(DURATION)
                .iterations(1)
                .easing(EASING)
                .beforeClearStyles([OPACITY])
                .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY)
                .fromTo(TRANSLATEX, OFF_RIGHT, CENTER);
            var anim3 = this.animationCtrl.create()
                .addAnimation([anim1, anim2]);
            return anim3;

          }else{
            var anim4 = this.animationCtrl.create()
                .addElement(opts.leavingEl)
                .duration(200)
                .iterations(1)
                .beforeClearStyles([OPACITY])
                .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY)
                .fromTo(TRANSLATEX, CENTER, OFF_RIGHT)
            var anim5 = this.animationCtrl.create()
                .addElement(opts.enteringEl)
                .duration(200)
                .iterations(1)
                .fromTo(TRANSLATEX, OFF_LEFT, CENTER)
                .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY);
            var anim6 = this.animationCtrl.create()
                .duration(700)
                .iterations(1)
                .addAnimation([anim4, anim5]);
            return anim6;
            
            // var anim4 = this.animationCtrl.create()
            //     .addElement(opts.leavingEl)
            //     .duration(500)
            //     .iterations(1)
            //     .easing('cubic-bezier(0.1, 0, 0.2, -0.6)')
            //     .fromTo('transform', 'translateX(0%)', 'translateX(-100%)')
            // var anim5 = this.animationCtrl.create()
            //     .addElement(opts.enteringEl)
            //     .duration(600)
            //     .iterations(1)
            //     .easing('cubic-bezier(0.1, 0, 0.2, -0.6)')
            //     .fromTo('opacity', '0.25', '1')
            // var anim6 = this.animationCtrl.create()
            //     .duration(700)
            //     .iterations(1)
            //     .addAnimation([anim4, anim5]);
            // return anim6;
          }
    
    });
    
    constructor(
        private formBuilder: FormBuilder,
        private animationCtrl: AnimationController,
    ){}
    
    ngOnInit() {
        this.userForm = new FormGroup(
        {
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(
            null,
            [Validators.required, Validators.email]
        ),
        'hobbies': new FormArray([])
        });
    }
    
    prepareRoute(outlet: RouterOutlet): boolean {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
    }
    
    get controls() {
        return (this.userForm.get('hobbies') as FormArray).controls;
    }

    addHobby() {
        (this.userForm.get('hobbies') as FormArray)
        .push(
            new FormGroup({
                'name': new FormControl(null, Validators.required)
            })
        );
    }

    onSubmit() {
        console.log(this.userForm.value);
    }

    fontSizeChange(type:string) {
        this.fontSize = (type == 'increase' ? (this.fontSize - 1) : (this.fontSize + 1));
        var post = document.querySelectorAll<HTMLElement>('p, a, span, h1, h2, h3, h4, h5, h6, small, input, button');
        for (let i = 0; i < post.length; i++) {
            post[i].style.fontSize = this.fontSize + 'px';
        }
    }

    accessibleToggle(name:string){
        document.body.classList.toggle("accessible-"+name);
        if(name == 'dark'){
            document.body.classList.remove("accessible-bright");
        }else if(name == 'bright'){
            document.body.classList.remove("accessible-dark");
        }
    }
 
}
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatFormDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-passsord.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})

export class SignUpComponent implements OnInit{

    signupForm: FormGroup;
    @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder,
                private userNotTakenValidatorService: UserNotTakenValidatorService,
                private signupService: SignUpService,
                private router: Router,
                private platformDetectorService: PlatFormDetectorService){

    }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',[Validators.required,Validators.email]],
            userName: ['',[Validators.required,lowerCaseValidator,Validators.minLength(2), Validators.maxLength(30)],this.userNotTakenValidatorService.checkUserNameTaken()],
            fullName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(14)]],

        },{
            validator: userNamePassword
        })
        this.platformDetectorService.isPlatFormBrowser() &&
        this.inputEmail.nativeElement.focus();
    }
    signup(){
        if(this.signupForm.valid && !this.signupForm.pending){
            const newUser = this.signupForm.getRawValue() as NewUser
            this.signupService
            .signup(newUser)
            .subscribe(()=>{
                this.router.navigate([''])
            }, err => console.log(err))
        }
       
    }
}
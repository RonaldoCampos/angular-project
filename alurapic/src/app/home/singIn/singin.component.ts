import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatFormDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './singin.component.html'
})

export class SingInComponent implements OnInit{
    fromUrl: '';
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private platformDetectorService: PlatFormDetectorService,
                private activatedRoute: ActivatedRoute){

    }
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.fromUrl = params['fromUrl'];
        })
        this.loginForm = this.formBuilder.group({
            userName: ['',Validators.required],
            password: ['',Validators.required],
        });
        this.platformDetectorService.isPlatFormBrowser() &&
                    this.userNameInput.nativeElement.focus();
    }
    login(){
        const userName = this.loginForm.get('userName').value;
        const password= this.loginForm.get('password').value;

        this.authService.authenticate(userName,password)
            .subscribe(()=>{
            if(this.fromUrl){
                this.router.navigateByUrl(this.fromUrl)
            }else {
                this.router.navigate(['user',userName])
            }
        },
            err =>{
                console.log(err);
                this.loginForm.reset();
                this.platformDetectorService.isPlatFormBrowser() &&
                    this.userNameInput.nativeElement.focus();
                alert("invalid user name or password");
            }
        );
    }
   

}
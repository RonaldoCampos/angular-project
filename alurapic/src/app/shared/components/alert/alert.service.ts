import { Injectable } from "@angular/core";
import { NavigationStart, Router } from '@angular/router';
import { Subject } from "rxjs";
import { AlertType, Alert } from "./alert";

@Injectable({ providedIn: 'root'})
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfeterRouteChange = false;

    constructor(private router: Router){

        this.router.events.subscribe(event =>{
            if(event instanceof NavigationStart){
                if(this.keepAfeterRouteChange){
                    this.keepAfeterRouteChange = false;
                }
                else{
                    this.clear();
                }
            }
        })
    }

    success(message: string, keepAfeterRouteChange = false){
        this.alert(AlertType.SUCCESS, message, keepAfeterRouteChange);
    }
    warning(message: string, keepAfeterRouteChange = false){
        this.alert(AlertType.WARNING, message, keepAfeterRouteChange);
    }
    danger(message: string, keepAfeterRouteChange = false){
        this.alert(AlertType.DANGER, message, keepAfeterRouteChange);
    }
    info(message: string, keepAfeterRouteChange = false){
        this.alert(AlertType.INFO, message, keepAfeterRouteChange);
    }

    private alert(alertType: AlertType, message: string, keepAfeterRouteChange: boolean){
        this.keepAfeterRouteChange = keepAfeterRouteChange;
        this.alertSubject.next(new Alert(alertType,message));
    }

    getAlert(){
        return this.alertSubject.asObservable();
    }

    clear(){
        this.alertSubject.next(null);
    }

}
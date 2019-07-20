import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){}

    // intercepta a requisição 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // continua a requisição
        console.log("PASSOU no interceptor")
        return next.handle(req)
        // se acontecer erro, propaga esse erro
        .catch((error, caught) => {

            let errorObj = error;

            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectador pelo interceptor: ")
            console.log(errorObj);

            switch(errorObj.status) {
                case 401:
                    this.heandle401();
                    break;
                case 403:
                    this.heandle403();
                    break;
                case 422:
                    this.heandle422(errorObj);
                    break;    
                default:
                    this.heandleDefaultError(errorObj);    
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    heandle403() {
        this.storage.setLocalUser(null);
    }
    heandle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticação',
            message:'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
    heandle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
    heandleDefaultError(errorObj) {

        let alert = this.alertCtrl.create({
            title: 'Erro ' +errorObj.status+': '+errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    listErrors(message: FieldMessage[]): string {
        let s: string = '';
        for(let i = 0; i < message.length; i++) {
            s = s+ '<p><strong>' + message[i].fieldName + '</strong>: ' + message[i].message + '</p>';
        }
        return s;
    }
    
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}
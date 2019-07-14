import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

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
                case 403:
                    this.heandle403();
                    break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    heandle403() {
        this.storage.setLocalUser(null);
    }
    
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}

import {NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS}
  from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {
  LoaderInterceptorService,
} from './interceptors/loader-interceptor.service';
import {UsernameValidator} from './validators/username';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ServerErrorInterceptorService}
  from './interceptors/server-error-interceptor.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {environment} from '../environments/environment';
import {ServerAuthtokenInterceptorService}
  from './interceptors/server-authtoken-interceptor.service';

@NgModule({
  exports: [
    TranslateModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HammerModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    UsernameValidator,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerAuthtokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}



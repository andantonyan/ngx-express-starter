import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './containers';
import { UniversalInterceptor } from './interceptors';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

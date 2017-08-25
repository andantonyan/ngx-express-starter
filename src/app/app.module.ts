import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  MdButtonModule,
  MdChipsModule,
  MdIconModule,
  MdInputModule,
  MdLineModule,
  MdListModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';

import { AppComponent, HomeComponent, LoginComponent, NotFoundComponent } from './containers';
import { ControlMessagesComponent, LayoutComponent, NavItemComponent, SidenavComponent, ToolbarComponent } from './components';
import { ChunkPipe, EllipsisPipe, FormatDatePipe, FromNowPipe, KeysOrderPipe, KeysPipe } from './pipes';
import { AuthService, LocalStorage, UtilService, ValidationService } from './services';
import { CustomHeadersInterceptor } from './interceptors';
// import {} from './directives';
import { AuthEffects, reducer, } from './store';
import { AuthGuard, } from './guards';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    ControlMessagesComponent,
    EllipsisPipe,
    KeysPipe,
    KeysOrderPipe,
    ChunkPipe,
    FormatDatePipe,
    FromNowPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ngx-express-starter' }),
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    BrowserAnimationsModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthEffects),
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdLineModule,
    MdChipsModule,
    MdInputModule,
    MdSlideToggleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeadersInterceptor,
      multi: true
    },
    AuthGuard,
    AuthService,
    LocalStorage,
    UtilService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

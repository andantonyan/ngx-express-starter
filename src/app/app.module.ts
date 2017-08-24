import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
import { LayoutComponent, NavItemComponent, SidenavComponent, ToolbarComponent } from './components';
import { ChunkPipe, EllipsisPipe, FormatDatePipe, FromNowPipe, KeysOrderPipe, KeysPipe } from './pipes';
import { AuthService, LocalStorage, UtilService } from './services';
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
    HttpModule,
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
    AuthGuard,
    AuthService,
    LocalStorage,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

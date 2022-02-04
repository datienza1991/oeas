import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { authRoutes, AuthModule, AuthGuard } from '@batstateu/auth';
import { LayoutModule } from '@batstateu/layout';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
        { path: 'auth', children: authRoutes },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('@batstateu/dashboard').then(
              (module) => module.DashboardModule
            ),
          canActivate: [AuthGuard],
        },
        {
          path: 'setting',
          loadChildren: () =>
            import('@batstateu/setting').then((module) => module.SettingModule),
          canActivate: [AuthGuard],
        },
        {
<<<<<<< HEAD
          path: 'exams',
          loadChildren: () =>
            import('@batstateu/exams').then((module) => module.ExamsModule),
=======
          path: 'account',
          loadChildren: () =>
            import('@batstateu/account').then((module) => module.AccountModule),
>>>>>>> feat/sprint-1-account-profile
            canActivate: [AuthGuard],
        },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
    AuthModule,
    LayoutModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

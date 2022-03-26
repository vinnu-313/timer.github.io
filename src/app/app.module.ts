import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { CountdownModule } from 'ngx-countdown';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { AddResultComponent } from './add-result/add-result.component';
import { ResultsComponent } from './results/results.component';
import { ParticipantsComponent } from './participants/participants.component';


const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'add',
        component: AddParticipantComponent
      },
      {
        path: 'list',
        component: ParticipantsComponent
      },
      {
        path: 'radd',
        component: AddResultComponent
      }
    ]
  },
  {
    path: 'results', component: ResultsComponent
  },
  {
    path: 'counter', component: CounterComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    CounterComponent,
    AddParticipantComponent,
    AddResultComponent,
    ResultsComponent,
    ParticipantsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // , { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    CountdownModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    DataService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

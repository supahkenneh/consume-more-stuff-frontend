import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//modules
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//pages
import { HomeComponent } from './pages/home/home.component';
import { AddItemComponent } from './pages/additem/additem.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './pages/category/category.component';
import { AllItemsComponent } from './pages/allitems/allitems.component';

//services
import { BackendService } from './services/backend.service';
import { SessionService } from './services/session.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    AddItemComponent,
    SettingsComponent,
    MessagesComponent,
    CategoryComponent,
    AllItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'additem', component: AddItemComponent },
        { path: 'items', component: AllItemsComponent },
        { path: 'user/settings', component: SettingsComponent },
        { path: 'user/messages', component: MessagesComponent },
        { path: 'category/:id/items', component: CategoryComponent }
      ]
    )
  ],
  providers: [BackendService, SessionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}

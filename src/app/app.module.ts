import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//modules
import { RouterModule } from '@angular/router';

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
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'additem', component: AddItemComponent },
        { path: 'user/settings', component: SettingsComponent },
        { path: 'user/messages', component: MessagesComponent},
        { path: 'category/:id/items', component: CategoryComponent}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

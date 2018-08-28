import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//modules
import { RouterModule } from '@angular/router';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddItemComponent } from './pages/additem/additem.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MessagesComponent } from './pages/messages/messages.component';
// import { AdminCategoriesComponent } from './pages/admincategories/admincategories.component';
// import { AdminItemsComponent } from './pages/adminitems/adminitems.component';
// import { AdminUsersComponent } from './pages/adminusers/adminusers.component';

//pages


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    AddItemComponent,
    SettingsComponent,
    MessagesComponent
    // AdminCategoriesComponent,
    // AdminItemsComponent,
    // AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'additem', component: AddItemComponent },
        { path: 'user/settings', component: SettingsComponent },
        { path: 'user/messages', component: MessagesComponent}
        // { path: 'admin/categories', component: AdminCategoriesComponent },
        // { path: 'admin/items', component: AdminItemsComponent },
        // { path: 'admin/users', component: AdminUsersComponent }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

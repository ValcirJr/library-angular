import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {RentComponent} from "./pages/rent/rent.component";
import {AuthorsComponent} from "./pages/authors/authors.component";
import {BooksComponent} from "./pages/books/books.component";
import {PublishersComponent} from "./pages/publishers/publishers.component";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin", component: AdminComponent, children: [
      {path: "authors", component: AuthorsComponent},
      {path: "books", component: BooksComponent},
      {path: "publishers", component: PublishersComponent}
    ]},
  {path: "rent", component: RentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

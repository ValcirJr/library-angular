import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Author} from "../../models/author.model";
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  authors : Author[] = []
  dataSource = new MatTableDataSource(this.authors);

  constructor(private _authorService : AuthorService) {
    _authorService.findAuthors((authors) => {
      this.authors = authors
      this.dataSource = new MatTableDataSource(this.authors);
    })
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

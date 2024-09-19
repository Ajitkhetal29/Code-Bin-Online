import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items : {id : string , title : string}[] = []

  constructor ( private dbservice : DbService){}

  ngOnInit(){
    this.dbservice.getAllSnippet().then((data:any)=> {
      console.log(data)
      this.items = data
    })
  }

}

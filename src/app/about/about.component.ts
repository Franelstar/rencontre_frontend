import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  base_url = 'http://localhost/images/';
  anael = "anael.jpg";
  jeremie = "jeremie.jpeg";
  kevin = "kevin.jpg";
  rolvy = "rolvy.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}

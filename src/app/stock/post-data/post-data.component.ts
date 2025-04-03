import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-post-data',
  imports: [],
  templateUrl: './post-data.component.html',
  styleUrl: './post-data.component.css'
})
export class PostDataComponent implements OnInit {
  constructor(private httpServiceService: HttpServiceService) { }

  ngOnInit(): void {
    const body = {
      "name": "Last Stock Company",
      "code": "LSC",
      "price": "16000000000",
      "previousPrice": "14000000000",
      "exchange": "OKX",
      "favorite": "false"
    };
    this.httpServiceService.postStocks(body).subscribe((data) => {
      console.log('postStock', data);
    })
  }

}

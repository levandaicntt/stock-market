import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
@Component({
  selector: 'app-get-data',
  imports: [],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css'
})
export class GetDataComponent implements OnInit {
  constructor(private httpServiceService: HttpServiceService) { }

  ngOnInit(): void {
    this.httpServiceService.getStocks().subscribe((data) => {
      console.log('stock', data)
    })
  }
} 

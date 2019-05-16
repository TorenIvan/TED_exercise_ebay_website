import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllAuctions() {
    return this.httpClient.post('/api/read.php', {})
  }

  checkUser(username, password) {
    return this.httpClient.post('/api/signin.php', {username, password})
  }
}

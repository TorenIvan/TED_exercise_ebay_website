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

  newUser(name, surname, email, phone, country, state, town, address, postcode, afm, username, password) {
    return this.httpClient.post('api/signup.php', {name, surname, email, phone, country, state, town, address, postcode, afm, username, password})
  }

  sendEmail(email) {
    return this.httpClient.post('api/retrievepass.php', {email})
  }
}

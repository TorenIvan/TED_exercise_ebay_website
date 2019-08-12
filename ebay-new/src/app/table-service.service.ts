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

  getMyAuctions(id) {
    return this.httpClient.post('/api/usersonlyauctions.php', {id})
  }

  getUserInfo(id) {
    return this.httpClient.post('/api/userinfo.php', {id})
  }

  getAllUsers() {
    return this.httpClient.post('/api/printusers.php', {})
  }

  getApplications() {
    return this.httpClient.post('/api/printuserlistwithconnect.php', {})
  }

  deleteUser(id) {
    return this.httpClient.post('/api/deleteuser.php', {id})
  }

  acceptUser(id, flag) {
    return this.httpClient.post('/api/acceptuser.php', {id, flag})
  }

  addAuction(user_id, product, description, buy_price, category, country, state, town, address, postcode, latitude, longitude, end_date, start_date) {
    return this.httpClient.post('/api/addauction.php', {user_id, product, description, buy_price, category, country, state, town, address, postcode, latitude, longitude, end_date, start_date})
  }

  deleteAuction(id) {
    return this.httpClient.post('/api/deleteauction.php', {id})
  }

  getAllCategories() {
    return this.httpClient.post('/api/categories.php', {})
  }
}

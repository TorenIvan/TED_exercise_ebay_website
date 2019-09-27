import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  constructor(private httpClient: HttpClient) { }

  checkUser(username, password) {
    return this.httpClient.post('/api/signin.php', {username, password})
  }

  newUser(name, surname, email, phone, country, state, town, address, postcode, afm, username, password) {
    return this.httpClient.post('api/signup.php', {name, surname, email, phone, country, state, town, address, postcode, afm, username, password})
  }

  sendEmail(email) {
    return this.httpClient.post('api/retrievepass.php', {email})
  }

  getUserInfo(id) {
    return this.httpClient.post('/api/userinfo.php', {id})
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

  addBid(uId, aId, amount_of_money, buy_price) {
    return this.httpClient.post('/api/updatebids.php', {uId, aId, amount_of_money, buy_price})
  }

  getUserUsername(id) {
    return this.httpClient.post('/api/getusername.php', {id})
  }

  setNewPass(email, pass) {
    return this.httpClient.post('/api/newpassword.php', {email, pass})
  }

  saveProfile(id, username, name, surname, email, phone, country, state, town, address, postcode, afm) {
    return this.httpClient.post('/api/edituser.php', {id, username, name, surname, email, phone, country, state, town, address, postcode, afm})
  }

  saveAuctionChanges(id, product, category, description, buy_price, start_date, end_date, country, state, town, address, postcode, latitude, longitude) {
    return this.httpClient.post('/api/editauction.php', {id, product, category, description, buy_price, start_date, end_date, country, state, town, address, postcode, latitude, longitude})
  }

  findTheWinner(id) {
    return this.httpClient.post('/api/isThereABidder.php', {id})
  }

  getRecs(id) {
    return this.httpClient.post('/api/lsh.php', {id})
  }
}

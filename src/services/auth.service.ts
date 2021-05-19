import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User){
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User){
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.afa.signOut();
  }

  getAuth(){
    return this.afa;
  }
}

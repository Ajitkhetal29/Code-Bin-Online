import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { snippet } from '../../models/snippet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db?: any;

  constructor(private authService: AuthService , private router: Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: snippet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippet'), {
        ...snippet,
        by: this.authService.getUid()
      });
      console.log('Document written with ID: ', docRef.id);
      this.router.navigate(['/']);

    } catch (e) {
      console.error('Error adding document: ', e);
      alert('something went wrong');
    }
  }

  async getAllSnippet() {
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippet'));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }
  async getSnippetById(docId: string) {
    const docRef = doc(this.db, 'snippet', docId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // Document does not exist
      console.log('No such document!');
      return null; // Return null or another value to indicate the absence of a document
    }
  }
}

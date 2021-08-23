import { BadGatewayException, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { CollectionFirestore } from './collection-firestore';

@Injectable()
export class FirebaseFireStoreService {
  constructor(private firestore: firebase.firestore.Firestore) { }

  public static firestore() {
    if (!firebase.app()) {
      throw new Error('Firebase instance is undefined.');
    }
    return new FirebaseFireStoreService(firebase.firestore());
  }

  async create<V>(collection: CollectionFirestore, _value: V): Promise<any> {
    try {
      const doc = await this.firestore.collection(collection).doc();
      await doc.set({ ..._value });
      return {
        id: doc.id,
        ..._value,
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update<V>(
    collection: CollectionFirestore,
    _value: V,
    uid: string,
  ): Promise<any> {
    try {
      const doc = await this.firestore.collection(collection).doc(uid);
      await doc.set({
        ..._value,
      });
      return {
        id: doc.id,
        ..._value,
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async delete(collection: CollectionFirestore, uid: string): Promise<any> {
    try {
      const doc = await this.firestore.collection(collection).doc(uid);
      await doc.delete();
      return uid;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}

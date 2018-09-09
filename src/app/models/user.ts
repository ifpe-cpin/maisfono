import { Entity } from '../entity';
export class User extends Entity{
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
  }
export interface UserRequest {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
  localId: string
}

export interface Post {
  id?: string
  title: string
  content: string
  author: string
  date: Date
}

export interface User {
  id: string
  name?: string
  email?: string
}

export interface FbCreateResponse {
  name: string
}

export type AlertTypes = 0 | 1 | 2 | 3;

export enum ALERT_TYPES {
  Success,
  Warning,
  Error,
  Info
}



import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export const enum PetType {
  JINMAO = 'JINMAO',
  HASHIQI = 'HASHIQI',
  SHAMOYE = 'SHAMOYE',
  KEJI = 'KEJI',
  ALASIJIA = 'ALASIJIA',
  BIANMU = 'BIANMU',
  TIANYUAN = 'TIANYUAN',
  BOMEI = 'BOMEI',
  TAIDI = 'TAIDI',
  DEMU = 'DEMU'
}

export interface IPet {
  id?: number;
  created?: Moment;
  updated?: Moment;
  deleted?: boolean;
  petType?: PetType;
  nick?: string;
  birthday?: string;
  age?: number;
  avatar?: string;
  background?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IPet> = {
  deleted: false
};

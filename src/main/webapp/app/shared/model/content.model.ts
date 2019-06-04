import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export const enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  NONE = 'NONE'
}

export interface IContent {
  id?: number;
  created?: Moment;
  updated?: Moment;
  deleted?: boolean;
  media?: ContentType;
  mediaInfo?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IContent> = {
  deleted: false
};

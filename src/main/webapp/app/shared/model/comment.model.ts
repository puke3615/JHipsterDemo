import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IContent } from 'app/shared/model/content.model';
import { IComment } from 'app/shared/model/comment.model';

export interface IComment {
  id?: number;
  created?: Moment;
  updated?: Moment;
  deleted?: boolean;
  depth?: number;
  text?: string;
  user?: IUser;
  content?: IContent;
  parent?: IComment;
}

export const defaultValue: Readonly<IComment> = {
  deleted: false
};

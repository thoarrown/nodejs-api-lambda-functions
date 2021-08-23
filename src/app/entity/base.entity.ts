import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
export class Base<T> {
  protected readonly _id: string;
  protected readonly _props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : uuidv4();
    this._props = props;
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;
}

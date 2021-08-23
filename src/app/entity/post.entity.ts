import { Entity, Column } from 'typeorm';

import { Base } from '@app/entity/index';

interface PostProps {
  title?: string | null;
  slug?: string | null;
  user_id?: string | null;
  content?: string | null;
  docId?: string | null;
}
export interface PostDto extends PostProps {
  id?: string;
}

@Entity('post')
export class Post extends Base<PostProps> {
  private constructor(props: PostProps, id?: string) {
    super(props, id);
  }

  @Column({ type: 'varchar', length: 220 })
  title: string;

  @Column({ type: 'varchar', length: 220, unique: true, default: null })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  user_id: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  docId: string;

  public toDto(): PostDto {
    return {
      id: this._id?.toString(),
      docId: this._props.docId?.toString() || '',
      title: this._props.title?.toString() || '',
      slug: this._props.slug?.toString() || '',
      user_id: this._props.user_id?.toString() || '',
      content: this._props.content?.toString() || '',
    };
  }

  public static create(props: PostProps, id?: string): Post {
    return new Post(props, id);
  }
}

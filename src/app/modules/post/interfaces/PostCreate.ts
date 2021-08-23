export interface PostCreate {
  id?: string;
  title: string;
  content: string;
  slug: string;
  user_id: string;
  docId?: string;
}

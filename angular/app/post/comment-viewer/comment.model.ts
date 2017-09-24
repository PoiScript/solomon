export class CommentResponse {
  data: Comment[];
}

export class Comment {
  avatar: string;
  content: string;
  created: string;
  name: string;
  provider: string;
  uid: number;
  updated: string;
}

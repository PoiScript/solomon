export class Comment {
  id: number;
  created_at: string;
  updated_at: string;
  body_html: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  reactions: {
    total_count: number
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
  };
}

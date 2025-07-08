import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const publishedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <Card className="group glass-effect hover:bg-accent/50 transition-all duration-300 hover:shadow-elegant">
      <Link to={`/blog/${post.slug}`} className="block">
        {post.featured_image_url && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{publishedDate}</span>
            </div>
            {post.category && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {post.category.name}
              </Badge>
            )}
          </div>
          
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
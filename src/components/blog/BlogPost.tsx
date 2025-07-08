import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBlogPost, useIncrementViewCount } from '@/hooks/useBlog';
import { Skeleton } from '@/components/ui/skeleton';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug!);
  const incrementViewCount = useIncrementViewCount();

  useEffect(() => {
    if (post) {
      incrementViewCount.mutate(post.id);
    }
  }, [post, incrementViewCount]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="aspect-video w-full" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  const publishedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="group">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="space-y-6 mb-8">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{post.view_count} views</span>
          </div>
          
          {post.category && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {post.category.name}
            </Badge>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="mb-8">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      <Separator className="mb-8" />

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-foreground
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:underline
          prose-strong:text-foreground
          prose-ul:text-muted-foreground prose-ol:text-muted-foreground
          prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
          prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
        "
        dangerouslySetInnerHTML={{ 
          __html: post.content
            .split('\n\n')
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph)
            .map(paragraph => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)?.[0].length || 1;
                const text = paragraph.replace(/^#+\s*/, '');
                return `<h${level}>${text}</h${level}>`;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                const listItems = items.map(item => `<li>${item.substring(2)}</li>`).join('');
                return `<ul>${listItems}</ul>`;
              }
              return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
            })
            .join('')
        }}
      />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t">
        <div className="text-center">
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Read More Posts
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}

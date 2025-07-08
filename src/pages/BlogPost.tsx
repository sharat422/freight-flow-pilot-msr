import { useParams } from 'react-router-dom';
import { BlogPost as BlogPostComponent } from '@/components/blog/BlogPost';
import { useBlogPost } from '@/hooks/useBlog';
import { Helmet } from 'react-helmet-async';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post } = useBlogPost(slug!);

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.meta_title || post.title} | MSR Freight Blog</title>
          <meta name="description" content={post.meta_description || post.excerpt || ''} />
          <meta name="keywords" content={post.meta_keywords?.join(', ') || ''} />
          
          {/* Open Graph */}
          <meta property="og:title" content={post.meta_title || post.title} />
          <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${window.location.origin}/blog/${post.slug}`} />
          {post.featured_image_url && (
            <meta property="og:image" content={post.featured_image_url} />
          )}
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.meta_title || post.title} />
          <meta name="twitter:description" content={post.meta_description || post.excerpt || ''} />
          {post.featured_image_url && (
            <meta name="twitter:image" content={post.featured_image_url} />
          )}
          
          {/* Article specific */}
          {post.published_at && (
            <meta property="article:published_time" content={post.published_at} />
          )}
          {post.category && (
            <meta property="article:section" content={post.category.name} />
          )}
          {post.tags?.map((tag) => (
            <meta key={tag.id} property="article:tag" content={tag.name} />
          ))}
          
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt || '',
              "image": post.featured_image_url || '',
              "datePublished": post.published_at,
              "dateModified": post.updated_at,
              "author": {
                "@type": "Organization",
                "name": "MSR Freight Dispatchers"
              },
              "publisher": {
                "@type": "Organization",
                "name": "MSR Freight Dispatchers",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${window.location.origin}/Logo_MSR.png`
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${window.location.origin}/blog/${post.slug}`
              }
            })}
          </script>
        </Helmet>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="container mx-auto px-4 py-12">
          <BlogPostComponent />
        </div>
      </div>
    </>
  );
}

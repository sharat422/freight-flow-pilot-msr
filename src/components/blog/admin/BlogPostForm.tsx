import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { useCreateBlogPost, useUpdateBlogPost, useBlogCategories } from '@/hooks/useBlog';
import { useToast } from '@/hooks/use-toast';

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  category_id: string;
  status: 'draft' | 'published' | 'archived';
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export function BlogPostForm({ post, onSuccess }: BlogPostFormProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      featured_image_url: post?.featured_image_url || '',
      category_id: post?.category_id || '',
      status: post?.status || 'draft',
      meta_title: post?.meta_title || '',
      meta_description: post?.meta_description || '',
      meta_keywords: post?.meta_keywords?.join(', ') || '',
    }
  });

  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const { data: categories } = useBlogCategories();
  const { toast } = useToast();
  
  const watchTitle = watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !post) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchTitle, setValue, post]);

  // Initialize tags from post
  useEffect(() => {
    if (post?.tags) {
      setTags(post.tags.map(tag => tag.name));
    }
  }, [post]);

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: FormData) => {
    try {
      const postData = {
        ...data,
        meta_keywords: data.meta_keywords ? data.meta_keywords.split(',').map(k => k.trim()) : [],
      };

      if (post) {
        await updatePost.mutateAsync({ id: post.id, ...postData });
        toast({
          title: "Post updated",
          description: "Your blog post has been updated successfully."
        });
      } else {
        await createPost.mutateAsync(postData);
        toast({
          title: "Post created",
          description: "Your blog post has been created successfully."
        });
      }
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register('slug', { required: 'Slug is required' })}
            placeholder="post-url-slug"
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          {...register('excerpt')}
          placeholder="Brief description of the post"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          {...register('content', { required: 'Content is required' })}
          placeholder="Write your blog post content here..."
          rows={12}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="featured_image_url">Featured Image URL</Label>
          <Input
            id="featured_image_url"
            {...register('featured_image_url')}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category_id">Category</Label>
          <Select 
            value={watch('category_id')} 
            onValueChange={(value) => setValue('category_id', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="font-semibold">SEO Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="meta_title">Meta Title</Label>
          <Input
            id="meta_title"
            {...register('meta_title')}
            placeholder="SEO title (leave empty to use post title)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            {...register('meta_description')}
            placeholder="SEO description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_keywords">Keywords</Label>
          <Input
            id="meta_keywords"
            {...register('meta_keywords')}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Select 
          value={watch('status')} 
          onValueChange={(value: 'draft' | 'published') => setValue('status', value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button 
            type="submit" 
            disabled={createPost.isPending || updatePost.isPending}
          >
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </div>
    </form>
  );
}

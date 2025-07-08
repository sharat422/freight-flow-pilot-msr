import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useBlogPosts, useUpdateBlogPost } from '@/hooks/useBlog';
import { BlogPostForm } from './BlogPostForm';
import { AddSamplePost } from '../AddSamplePost';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

export function BlogAdmin() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: posts, isLoading } = useBlogPosts({ status: '' }); // Get all posts regardless of status
  const updatePost = useUpdateBlogPost();
  const { toast } = useToast();

  const handleDelete = async (postId: string) => {
    try {
      await updatePost.mutateAsync({ id: postId, status: 'archived' });
      toast({
        title: "Post archived",
        description: "The blog post has been archived successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive the post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (post: BlogPost, newStatus: 'draft' | 'published') => {
    try {
      await updatePost.mutateAsync({ 
        id: post.id, 
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null
      });
      toast({
        title: "Status updated",
        description: `Post ${newStatus === 'published' ? 'published' : 'saved as draft'} successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setSelectedPost(null);
              setIsFormOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
            </DialogHeader>
            <BlogPostForm 
              post={selectedPost} 
              onSuccess={() => {
                setIsFormOpen(false);
                setSelectedPost(null);
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Card key={post.id} className="group">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{post.view_count}</span>
                </div>
              </div>
              
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {post.created_at && new Date(post.created_at).toLocaleDateString()}
                </span>
                {post.category && (
                  <Badge variant="outline">{post.category.name}</Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Archive this post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will archive the post. You can restore it later if needed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(post.id)}>
                          Archive
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {post.status !== 'published' ? (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(post, 'published')}
                    disabled={updatePost.isPending}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(post, 'draft')}
                    disabled={updatePost.isPending}
                  >
                    Unpublish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!posts || posts.length === 0) && (
        <div className="space-y-6">
          <AddSamplePost />
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first blog post.
            </p>
            <Button onClick={() => {
              setSelectedPost(null);
              setIsFormOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
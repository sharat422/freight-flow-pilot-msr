import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createSampleBlogPost } from '@/hooks/useBlog';
import { useToast } from '@/hooks/use-toast';

export function AddSamplePost() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddPost = async () => {
    setIsLoading(true);
    try {
      await createSampleBlogPost();
      toast({
        title: "Blog post added!",
        description: "The Ultimate Guide to Trucking Industry Success has been published."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">Add Sample Blog Post</h3>
      <p className="text-muted-foreground mb-4">
        This will add "The Ultimate Guide to Trucking Industry Success" blog post to your website.
      </p>
      <Button onClick={handleAddPost} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Blog Post'}
      </Button>
    </div>
  );
}

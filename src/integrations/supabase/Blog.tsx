import { BlogList } from '@/components/blog/BlogList';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MSR Freight Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, insights, and tips from the freight and logistics industry.
            </p>
          </div>
          
          {/* Blog List */}
          <BlogList />
        </div>
      </div>
    </div>
  );
}

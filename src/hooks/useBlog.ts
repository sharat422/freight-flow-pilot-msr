import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogCategory, BlogTag } from '@/types/blog';

export const useBlogPosts = (filters?: { category?: string; tag?: string; status?: string }) => {
  return useQuery({
    queryKey: ['blog-posts', filters],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          tags:blog_post_tags(
            tag:blog_tags(*)
          )
        `)
        .order('published_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      } else {
        query = query.eq('status', 'published');
      }

      if (filters?.category) {
        query = query.eq('blog_categories.slug', filters.category);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(post => ({
        ...post,
        tags: post.tags?.map((pt: any) => pt.tag) || []
      })) as BlogPost[];
    }
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          tags:blog_post_tags(
            tag:blog_tags(*)
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      return {
        ...data,
        tags: data.tags?.map((pt: any) => pt.tag) || []
      } as BlogPost;
    },
    enabled: !!slug
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as BlogCategory[];
    }
  });
};

export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as BlogTag[];
    }
  });
};

// Function to create a sample blog post
export const createSampleBlogPost = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      title: 'The Ultimate Guide to Trucking Industry Success: Driver Recruitment and Retention Strategies',
      slug: 'ultimate-guide-trucking-industry-success-driver-recruitment-retention',
      excerpt: 'Discover proven strategies for attracting and retaining quality drivers in today\'s competitive trucking market. Learn about competitive compensation, training programs, company culture, and career advancement opportunities.',
      content: `Creating Competitive Compensation Packages

Look, money talks. And in an industry with a massive driver shortage, it screams. But throwing cash at drivers isn't enough anymore.

Smart trucking companies are going beyond basic per-mile pay. They're offering sign-on bonuses (that actually pay out without impossible conditions), performance bonuses for safety records, fuel efficiency, and on-time deliveries.

The real game-changers? Companies that guarantee minimum weekly pay regardless of miles. This safety net makes a huge difference when delays happen that aren't the driver's fault.

Benefits matter too. Health insurance that doesn't suck, retirement plans with company matching, and paid time off that drivers can actually use without getting grief from dispatch.

## Compensation Comparison

**Old-School Approach vs Modern Strategy:**

- **Pay Structure**: Per-mile pay only → Guaranteed minimum weekly pay
- **Health Insurance**: Basic coverage (high deductible) → Comprehensive family health coverage  
- **Retirement**: No retirement options → 401(k) with company matching
- **Time Off**: Unpaid home time → Paid time off and holiday pay
- **Raises**: Annual raises based on seniority → Performance-based incentives

## Implementing Effective Training Programs

Training programs in trucking often fail because they're boring, outdated, or just checking regulatory boxes.

The best companies are investing in simulator technology that puts drivers in real-world scenarios without the real-world risks. Want to know how a driver handles a blowout on a mountain pass? Test it in the simulator.

Mentorship programs pair rookies with experienced drivers who provide real-world guidance that goes beyond what any manual can teach. Like how to actually navigate those truck stops in the Northeast that were clearly designed by someone who hates trucks.

Ongoing training should be about growth, not punishment. Progressive fleets are using technology like AI-powered cameras not to play "gotcha" but to identify coaching opportunities that make drivers better.

One fleet reduced accidents by 63% by implementing a training program that included quarterly safety refreshers and personalized coaching based on telematics data. Their secret? They paid drivers for training time instead of treating it as an unpaid obligation.

## Building a Positive Company Culture

The dirty secret in trucking? Most companies treat their office coffee machine better than their drivers. They'll spend $5,000 fixing the coffee machine but won't answer a driver's call after hours.

Culture starts with respect. When dispatchers and fleet managers treat drivers like professionals rather than numbers, everything changes.

Communication matters enormously. Companies with the best retention rates have dispatchers who respond quickly to driver concerns, leadership that listens to feedback, and transparent policies that don't change on a whim.

The strongest cultures recognize that drivers are the heart of the operation. This means:

- Involving drivers in decision-making about equipment purchases
- Creating driver advisory boards with actual power
- Celebrating milestones and achievements publicly
- Developing realistic policies crafted by people who understand life on the road

One mid-sized carrier reduced turnover from 87% to 32% by implementing a "No Driver Left Behind" policy where every driver issue gets addressed within 4 hours, and driver comfort and convenience drive operational decisions instead of the other way around.

## Managing Driver Fatigue and Wellbeing

Driver fatigue isn't just about HOS compliance—it's about understanding human limitations.

Forward-thinking companies are going beyond the bare minimum ELD requirements by:

- Creating schedules that work with natural sleep patterns
- Installing APUs in all trucks to ensure quality rest without idling
- Offering gym memberships or fitness programs tailored to the road lifestyle
- Providing healthy food options and meal prep guidance
- Building mental health support systems that drivers can access remotely

Physical health initiatives make a difference too. Sitting for 11 hours a day takes a toll. Companies that invest in ergonomic seats, encourage regular stretching breaks, and design routes with driver wellness in mind see fewer injuries and better retention.

Mental health deserves special attention. The isolation of trucking can be brutal. Progressive fleets are implementing buddy systems, regular check-ins with mental health professionals, and creating online communities where drivers can connect.

One company reduced driver injury claims by 41% after implementing a comprehensive wellness program that included sleep coaching, nutrition guidance, and stress management techniques tailored specifically for long-haul drivers.

## Developing Career Advancement Opportunities

The old career path in trucking was simple: drive until you can't anymore, then figure something else out. No wonder drivers leave.

Innovative companies create clear advancement paths:

- Driver to trainer/mentor
- Specialized freight opportunities with higher pay
- Path to becoming owner-operators with fleet support
- Moving into safety, dispatch, or fleet management roles
- Leadership development programs specifically for drivers

What really works? Transparency about what it takes to advance. Drivers should know exactly what metrics, certifications, or experience they need for the next level.

Education assistance makes a huge difference too. Some companies offer tuition reimbursement for business management courses or technical training that prepares drivers for their next role.

One particularly successful approach I've seen involves "career sampling" where interested drivers can shadow dispatchers, safety managers, or fleet maintenance personnel to understand other roles before committing to a transition.

The numbers don't lie: companies with defined career paths see 47% better retention rates among drivers with 2+ years of experience compared to companies that offer driving positions only.

## Conclusion

Achieving success in the trucking industry requires meticulous planning and strategic implementation across multiple business areas. From understanding the essential requirements for starting your business to building a reliable fleet, effective driver management, and regulatory compliance – each element plays a crucial role in your company's longevity. 

Financial discipline, strong client relationships, and technology adoption further strengthen your foundation, positioning your business for sustainable growth in this competitive sector.

As you embark on or continue your trucking journey, remember that success rarely happens overnight. Focus on building excellence in every aspect of your operation, from vehicle maintenance to team development. The most successful trucking companies continuously adapt to changing market conditions while maintaining unwavering commitment to safety, service quality, and operational efficiency. 

By implementing the strategies outlined in this guide, you'll be well-equipped to navigate challenges and capitalize on opportunities in the dynamic and rewarding world of trucking.`,
      category_id: '624e1007-d32b-4a65-8c7c-be9c85d7cd5e', // Tips & Guides category
      status: 'published',
      meta_title: 'Ultimate Guide to Trucking Industry Success - Driver Recruitment & Retention',
      meta_description: 'Complete guide to driver recruitment and retention strategies for trucking companies. Learn proven methods for competitive compensation, training programs, company culture, and career advancement.',
      meta_keywords: ['trucking', 'driver recruitment', 'driver retention', 'compensation', 'training', 'company culture', 'fleet management', 'trucking business'],
      published_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      const postData = {
        title: post.title || '',
        content: post.content || '',
        slug: post.slug || generateSlug(post.title || ''),
        excerpt: post.excerpt,
        featured_image_url: post.featured_image_url,
        author_id: post.author_id,
        category_id: post.category_id,
        status: post.status || 'draft',
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords,
        published_at: post.status === 'published' ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    }
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          published_at: updates.status === 'published' ? new Date().toISOString() : updates.published_at
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    }
  });
};

export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      // Use the database function we created
      const { error } = await supabase.rpc('increment_blog_post_views', {
        post_id: postId
      });

      if (error) throw error;
    }
  });
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  url: string;
  slug: string;
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  refreshPosts: () => void;
}

export const useBlogPosts = (): UseBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseRSSFeed = async (rssUrl: string): Promise<BlogPost[]> => {
    try {
      // Try multiple CORS proxies for better reliability
      const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`
      ];
      
      let response;
      let lastError;
      
      // Try each proxy until one works
      for (const proxyUrl of proxies) {
        try {
          response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/xml, text/xml, application/rss+xml, */*',
            },
            // Add timeout to prevent hanging
            signal: AbortSignal.timeout(20000) // 20 second timeout
          });
          
          if (response.ok) {
            break; // Success, exit the loop
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (err) {
          lastError = err;
          console.warn(`Proxy ${proxyUrl} failed:`, err);
          continue; // Try next proxy
        }
      }
      
      if (!response || !response.ok) {
        throw lastError || new Error('All proxy attempts failed');
      }
      
      // Handle different proxy response formats
      let xmlContent;
      
      // Determine which proxy was used and parse accordingly
      const responseUrl = response.url;
      if (responseUrl.includes('allorigins.win')) {
        // allorigins returns JSON with contents property
        const data = await response.json();
        xmlContent = data.contents;
      } else if (responseUrl.includes('codetabs.com') || responseUrl.includes('corsproxy.io')) {
        // These proxies return raw XML as text
        xmlContent = await response.text();
      } else {
        // Fallback: try to parse as text first, then JSON if that fails
        try {
          xmlContent = await response.text();
        } catch {
          const data = await response.json();
          xmlContent = data.contents || data;
        }
      }
      
      // Log the received content for debugging
      console.log('RSS Content received - Length:', xmlContent ? xmlContent.length : 0);
      console.log('RSS Content preview (first 200 chars):', xmlContent ? xmlContent.substring(0, 200) : 'null/undefined');
      
      // Check if xmlContent is empty or null before parsing
      if (!xmlContent || xmlContent.trim() === '') {
        console.warn('RSS feed returned empty content, using fallback posts');
        throw new Error('RSS feed returned empty content - will use fallback posts');
      }
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      // Log raw XML content for debugging (first 500 chars)
      console.log('Raw RSS XML content (first 500 chars):', xmlContent.substring(0, 500));
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        const errorDetails = parseError.textContent || 'Unknown parsing error';
        console.error('XML parsing error details:', errorDetails);
        console.error('Raw XML content (first 500 chars):', xmlContent.substring(0, 500));
        throw new Error(`Failed to parse RSS feed: ${errorDetails}`);
      }
      
      const items = xmlDoc.querySelectorAll('item');
      const blogPosts: BlogPost[] = [];
      
      console.log(`Found ${items.length} RSS items to process`);
      
      // If no items found, throw error to trigger fallback
      if (items.length === 0) {
        console.warn('No RSS items found, will use fallback posts');
        throw new Error('No RSS items found in feed - will use fallback posts');
      }
      
      items.forEach((item, index) => {
        const title = item.querySelector('title')?.textContent || 'Untitled';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const guid = item.querySelector('guid')?.textContent || `post-${index}`;
        
        // Extract content (try content:encoded first, then description)
        const contentEncoded = item.querySelector('content\\:encoded, encoded')?.textContent;
        let content = contentEncoded || description;
        
        // Clean content by removing style and script tags with their content
        content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
        content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
        
        // Extract image - prioritize media:content, then img tags, then default
        let image = 'https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q2OWhX04KuyGpwxk16Y9eoV0QXRs5cPHaMnLZ';
        
        // First, try to get image from media:content tag (common in RSS feeds)
        const mediaContent = item.querySelector('media\\:content, content[medium="image"]');
        if (mediaContent) {
          const mediaUrl = mediaContent.getAttribute('url');
          if (mediaUrl) {
            image = mediaUrl;
          }
        }
        
        // If no media:content, try to extract image from content
        if (content) {
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch && imgMatch[1]) {
            image = imgMatch[1];
          }
        }
        
        // Log extracted post info for debugging
        console.log(`Post ${index + 1}: "${title}" - Image: ${image}`);
        
        // Create excerpt from cleaned content (strip remaining HTML and limit length)
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        const excerpt = textContent.length > 150 
          ? textContent.substring(0, 150) + '...'
          : textContent;
        
        // Format date
        const formattedDate = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Recent';
        
        // Estimate read time (average 200 words per minute)
        const wordCount = textContent.split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        
        // Create slug from title
        const slug = title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        blogPosts.push({
          id: guid,
          title,
          excerpt,
          content,
          image,
          author: 'Rebecca Pierce', // Default author
          date: formattedDate,
          category: 'Parenting Tips', // Default category, could be enhanced
          readTime: `${readTime} min read`,
          url: link,
          slug
        });
      });
      
      return blogPosts;
    } catch (err) {
      console.error('Error parsing RSS feed:', err);
      // Don't throw the error, let the calling function handle fallback
      throw new Error(`RSS feed fetch failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rssUrl = 'https://rss.beehiiv.com/feeds/OaaSRcdo6V.xml';
      const fetchedPosts = await parseRSSFeed(rssUrl);
      
      setPosts(fetchedPosts);
      
      // Set the first post as featured
      if (fetchedPosts.length > 0) {
        setFeaturedPost(fetchedPosts[0]);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
      setError(errorMessage);
      console.error('Error fetching blog posts:', err);
      
      // Fallback to static content if RSS fails
      const fallbackPosts: BlogPost[] = [
        {
          id: '1',
          title: "The Secret Superpower Hiding in Your Child's Imagination (And Why You Should Care)",
          excerpt: "Every child possesses an incredible superpower that most parents overlook. Discover how to unlock your child's imagination and why it's the key to their future success.",
          content: "Every child possesses an incredible superpower that most parents overlook. This superpower isn't found in comic books or movies—it's hiding in plain sight within your child's imagination...",
          image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800",
          author: "Rebecca Pierce",
          date: "January 20, 2025",
          category: "Parenting Tips",
          readTime: "6 min read",
          url: "https://beantostalkclub.beehiiv.com/p/secret-superpower-hiding-childs-imagination",
          slug: "secret-superpower-hiding-childs-imagination"
        },
        {
          id: '2',
          title: "The Magic of Reading Aloud",
          excerpt: "Discover how the simple act of reading aloud can transform your child's learning experience and strengthen your family connection.",
          content: "Reading aloud to children is one of the most powerful tools parents have for building connections and fostering learning...",
          image: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&w=800",
          author: "Rebecca Pierce",
          date: "January 15, 2025",
          category: "Family Learning",
          readTime: "5 min read",
          url: "https://beantostalkclub.beehiiv.com/p/magic-of-reading-aloud",
          slug: "magic-of-reading-aloud"
        }
      ];
      
      setPosts(fallbackPosts);
      setFeaturedPost(fallbackPosts[0]);
      
      console.log('Using fallback blog posts due to RSS fetch failure');
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    featuredPost,
    loading,
    error,
    refreshPosts
  };
};
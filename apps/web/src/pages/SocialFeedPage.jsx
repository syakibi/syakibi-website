import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SocialPostCard from '@/components/SocialPostCard.jsx';
import { useLocalStorage } from '@/hooks/use-LocalStorage.js';

const SocialFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Bluesky posts
  const fetchBlueskyPosts = async () => {
    try {
      console.log('Fetching Bluesky posts...');
      const response = await fetch('https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=syakibi.bsky.social&limit=20');

      if (!response.ok) {
        throw new Error(`Bluesky API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Bluesky API response:', data);

      if (data.feed && data.feed.length > 0) {
        const blueskyPosts = data.feed.map((item) => ({
          id: `bluesky-${item.post.cid}`,
          platform: 'bluesky',
          caption: item.post.record.text || 'No text content',
          image: item.post.embed?.images?.[0]?.fullsize || null,
          link: `https://bsky.app/profile/syakibi.bsky.social/post/${item.post.uri.split('/').pop()}`,
          timestamp: new Date(item.post.record.createdAt).toISOString().split('T')[0],
          rawDate: new Date(item.post.record.createdAt)
        }));

        console.log(`Fetched ${blueskyPosts.length} Bluesky posts`);
        return blueskyPosts;
      }
      console.log('No Bluesky posts found');
      return [];
    } catch (err) {
      console.error('Error fetching Bluesky posts:', err);
      throw err;
    }
  };

  // Fetch X (Twitter) posts - requires Bearer token
  // To add X integration, get a Bearer token from https://developer.twitter.com/
  // and add: const [twitterPosts] = await Promise.all([fetchTwitterPosts(), fetchBlueskyPosts()]);
  // const fetchTwitterPosts = async () => { /* Twitter API v2 implementation */ };

  // Fetch all social media posts
  const fetchAllPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const [blueskyPosts] = await Promise.all([
        fetchBlueskyPosts()
        // Add fetchTwitterPosts() here when you have a Twitter Bearer token
      ]);

      // Combine all posts and sort by date (latest first)
      const allPosts = [
        ...blueskyPosts
        // ...twitterPosts
      ].sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

      setPosts(allPosts);
    } catch (err) {
      setError('Failed to load social media posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Social Feed - Syakibi</title>
        <meta name="description" content="Stay updated with my latest art posts, stream announcements, and community updates from social media." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Social feed
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                  Catch up on my latest posts, stream announcements, and behind-the-scenes content from across social media.
                </p>
                <button
                  onClick={fetchAllPosts}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Refresh Feed'}
                </button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {loading ? (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading latest posts...</p>
                  </div>
                ) : error ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                      onClick={fetchAllPosts}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No posts found. Check back later!</p>
                  </div>
                ) : (
                  posts.map((post, index) => (
                    <SocialPostCard key={post.id} post={post} index={index} />
                  ))
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SocialFeedPage;
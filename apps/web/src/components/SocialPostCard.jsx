import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Twitter, Instagram, MessageCircle, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SocialPostCard = ({ post, index }) => {
  const platformIcons = {
    twitter: Twitter,
    instagram: Instagram,
    tiktok: MessageCircle,
    bluesky: Globe
  };

  const PlatformIcon = platformIcons[post.platform] || ExternalLink;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
        {post.image && (
          <div className="aspect-square overflow-hidden">
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-relaxed text-card-foreground flex-1">{post.caption}</p>
            <PlatformIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors duration-200"
            >
              View post
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocialPostCard;
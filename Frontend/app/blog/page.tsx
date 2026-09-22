'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  Tag,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  ExternalLink,
  ChevronRight,
  Bookmark,
  User,
  X,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'Spring Boot' | 'Next.js & React' | 'System Design' | 'Algorithms' | 'Space & APIs';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: {
        language: string;
        code: string;
      };
      callout?: string;
    }[];
    conclusion: string;
  };
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'low-latency-spring-boot-postgresql',
    title: 'Building High-Throughput & Low-Latency Backends with Java Spring Boot 3 & PostgreSQL',
    excerpt:
      'A deep dive into connection pool tuning, JPA Hibernate query optimization, indexing strategies, and non-blocking caching to achieve sub-15ms API response latencies.',
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'Spring Boot',
    readTime: '6 min read',
    publishDate: 'Sep 18, 2026',
    featured: true,
    author: {
      name: 'Sachin Tiwari',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Java', 'Spring Boot 3', 'PostgreSQL', 'Performance', 'JPA/Hibernate'],
    content: {
      introduction:
        'When architecting enterprise backend systems for financial platforms or high-traffic services, response latency and database throughput define system reliability. In this article, we explore the core architectural patterns and optimizations applied to reduce query execution time and scale Spring Boot microservices.',
      sections: [
        {
          heading: '1. HikariCP Pool Sizing & Connection Lifecycle',
          body: 'Many developers assume larger connection pools mean faster queries. In reality, oversized pools induce severe CPU context switching and disk thrashing. The optimal connection pool size follows the standard formula: Connections = ((core_count * 2) + effective_spindle_count).',
          codeSnippet: {
            language: 'properties',
            code: `# application.properties Hikari Configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.pool-name=SpringBootHikariPool
spring.datasource.hikari.max-lifetime=2000000
spring.datasource.hikari.connection-timeout=20000`,
          },
        },
        {
          heading: '2. Eliminating the N+1 Query Problem with EntityGraphs',
          body: 'Lazy loading in JPA Hibernate frequently leads to N+1 sequential select queries. By utilizing @EntityGraph or explicit JOIN FETCH queries, related collections and child entities are fetched in a single optimized SQL join.',
          codeSnippet: {
            language: 'java',
            code: `@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    
    @EntityGraph(attributePaths = {"transactions", "user"})
    @Query("SELECT a FROM Account a WHERE a.accountNumber = :accountNumber")
    Optional<Account> findByAccountNumberWithDetails(@Param("accountNumber") String accountNumber);
}`,
          },
          callout:
            'Pro Tip: Always verify generated SQL queries using Hibernate logging with format_sql enabled in development before deploying to production.',
        },
        {
          heading: '3. Composite Indexing & Explain Analyze',
          body: 'PostgreSQL provides deep query plan introspection via EXPLAIN (ANALYZE, BUFFERS). Adding composite indexes on frequently filtered foreign keys and status columns reduces sequential table scans to ultra-fast B-Tree index scans.',
        },
      ],
      conclusion:
        'By combining tuned HikariCP connection pools, eager batch fetching, and precision PostgreSQL composite indexes, production Spring Boot backends can consistently sustain high queries-per-second with minimal latency.',
    },
  },
  {
    id: '2',
    slug: 'real-time-iss-tracking-leaflet-telemetry',
    title: 'Architecting Real-Time Satellite Tracking with Leaflet, WebSockets & REST Telemetry',
    excerpt:
      'How to build an interactive satellite dashboard tracking the International Space Station with orbital mechanics math, live geodetic projections, and sub-second stream updates.',
    coverImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    category: 'Space & APIs',
    readTime: '5 min read',
    publishDate: 'Sep 12, 2026',
    author: {
      name: 'Sachin Tiwari',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Next.js 15', 'Leaflet', 'APIs', 'Geospatial', 'Telemetry'],
    content: {
      introduction:
        'Tracking space assets like the International Space Station (NORAD #25544) traveling at 27,600 km/h requires smooth continuous coordinate interpolation, day/night solar terminator calculations, and resilient telemetry polling.',
      sections: [
        {
          heading: '1. Coordinate Polling & Smooth Icon Interpolation',
          body: 'Rather than jumping jarringly every polling cycle, we compute geodesic distance and linearly interpolate marker positions using requestAnimationFrame for butter-smooth movement across world map tiles.',
          codeSnippet: {
            language: 'typescript',
            code: `// Leaflet custom marker update with smooth bearing rotation
function updateISSPosition(lat: number, lng: number, heading: number) {
  const currentLatLng = issMarker.getLatLng();
  const targetLatLng = L.latLng(lat, lng);
  
  // Update marker position and dynamic orbit line trail
  issMarker.setLatLng(targetLatLng);
  orbitPolyline.addLatLng(targetLatLng);
  
  // Auto-center viewport if tracking lock is active
  if (isTrackingLocked) {
    map.panTo(targetLatLng, { animate: true, duration: 1.0 });
  }
}`,
          },
        },
        {
          heading: '2. Handling CORS & Resilient API Fallbacks',
          body: 'Third-party telemetry feeds can encounter rate limits. Implementing Next.js server route handlers as a proxy layer allows response caching and automatic fallback between multiple orbital data providers without exposing clients to downtime.',
          callout:
            'Architecture Tip: Use SWR or React Query with deduplicationInterval set to 1500ms to preserve rate limits while keeping telemetry fresh.',
        },
      ],
      conclusion:
        'Interactive geospatial dashboards open up powerful visual storytelling. With modern Next.js and Leaflet, building telemetry streams that feel alive is both efficient and delightful.',
    },
  },
  {
    id: '3',
    slug: '60fps-algorithm-visualizer-engine',
    title: 'Engineering 60 FPS Algorithm Visualizations with React 19, Framer Motion & Zustand',
    excerpt:
      'Designing a non-blocking step engine for Sorting and Searching visualizers that synchronizes animated DOM bar scaling with syntax-highlighted pseudocode execution.',
    coverImage:
      'https://images.unsplash.com/photo-1516116211227-bbc141e6c466?auto=format&fit=crop&w=1200&q=80',
    category: 'Algorithms',
    readTime: '7 min read',
    publishDate: 'Aug 29, 2026',
    author: {
      name: 'Sachin Tiwari',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['React 19', 'Zustand', 'Framer Motion', 'DSA', 'Animation'],
    content: {
      introduction:
        'Building an algorithm visualizer that feels responsive across varying array sizes requires decoupling the algorithm execution generator from UI rendering frames.',
      sections: [
        {
          heading: '1. Generator Functions for Granular Step Yielding',
          body: 'JavaScript generators (function*) allow algorithms like QuickSort or MergeSort to yield discrete visualization step objects (comparisons, swaps, highlights) without locking the main thread.',
          codeSnippet: {
            language: 'typescript',
            code: `export function* bubbleSortGenerator(arr: number[]): Generator<SortStep> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Yield comparison state
      yield { type: 'COMPARE', indices: [j, j + 1], line: 3 };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Yield swap state
        yield { type: 'SWAP', indices: [j, j + 1], line: 4, array: [...arr] };
      }
    }
  }
}`,
          },
        },
        {
          heading: '2. Zustand Store for Zero-Overhead Step Playback',
          body: 'Using Zustand state slices outside React render cycles prevents unnecessary component re-renders while allowing dynamic speed sliders from 0.5x up to 10x turbo playback.',
        },
      ],
      conclusion:
        'Decoupling execution steps via generators and managing playback in lightweight atomic stores delivers 60 FPS fluidity even under rapid sorting step mutations.',
    },
  },
  {
    id: '4',
    slug: 'modern-frontend-design-systems-tailwind',
    title: 'Designing Ultra-Polished Dark-Mode Interfaces with Glassmorphism & Micro-Interactions',
    excerpt:
      'Key design principles for building modern developer portfolios with curated color palettes, accessible contrasts, glassmorphic cards, and fluid interactive typography.',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'Next.js & React',
    readTime: '4 min read',
    publishDate: 'Aug 14, 2026',
    author: {
      name: 'Sachin Tiwari',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['UI/UX', 'Tailwind CSS', 'Glassmorphism', 'Design System'],
    content: {
      introduction:
        'A great portfolio or SaaS interface creates an immediate visual impact. Here is how to combine CSS backdrop filters, tailored HSL color tokens, and micro-animations for a first-class user experience.',
      sections: [
        {
          heading: '1. Curated Color Palettes Over Generic Primaries',
          body: 'Replace harsh primary blues and greens with refined indigo/cyan highlights, subtle border contrasts (border-border/50), and multi-layer backdrop blur panels.',
        },
        {
          heading: '2. Micro-Interactions That Delight',
          body: 'Subtle hover elevations, active tap scales (active:scale-95), and glowing badges give interfaces a tactile, native-app feel.',
        },
      ],
      conclusion:
        'Attention to micro-details, typographic hierarchy, and balanced whitespace turns standard websites into memorable interactive portfolios.',
    },
  },
];

const CATEGORIES = ['All', 'Spring Boot', 'Next.js & React', 'Algorithms', 'Space & APIs'] as const;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleShare = (post: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Universal Header */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* ── 1. HERO HEADER ── */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-card bg-gradient-to-br from-card/80 via-card/50 to-primary/5 border border-border/60 shadow-xl overflow-hidden">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Engineering & Tech Insights</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Articles, Architecture &amp; <span className="text-primary">Deep Dives</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Technical articles exploring modern Full-Stack engineering, Java Spring Boot backends, Next.js architecture, real-time telemetry systems, and interactive algorithm design.
            </p>

            {/* Search & Filter Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles by title, keyword, or tech stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/80 border border-border/60 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. CATEGORY PILLS ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm cursor-pointer',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-primary/25 scale-[1.02]'
                  : 'bg-card/70 hover:bg-card border border-border/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── 3. FEATURED POST (Shown when no active query & All selected) ── */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="w-4 h-4" />
              <span>Featured Article</span>
            </div>

            <div
              onClick={() => setSelectedPost(featuredPost)}
              className="group cursor-pointer rounded-3xl glass-card bg-card/60 border border-border/60 hover:border-primary/50 transition-all duration-300 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Picture / Cover Image */}
              <div className="lg:col-span-6 relative h-64 sm:h-72 lg:h-full min-h-[280px] overflow-hidden bg-muted">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-md">
                    Featured
                  </span>
                </div>
              </div>

              {/* Post Details */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishDate}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredPost.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/40"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      ST
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">{featuredPost.author.name}</div>
                      <div className="text-[10px] text-muted-foreground">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. ALL BLOG POSTS GRID ── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <span>All Articles</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {filteredPosts.length}
              </span>
            </h3>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl glass-card bg-card/40 border border-border/50 space-y-3">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
              <h4 className="text-base font-bold text-foreground">No articles found</h4>
              <p className="text-xs text-muted-foreground">
                No matching blog posts found for &quot;{searchQuery}&quot;. Try adjusting your search query or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col justify-between rounded-2xl glass-card bg-card/60 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden hover:-translate-y-1"
                >
                  {/* Picture / Header Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-card/90 backdrop-blur-md text-foreground border border-border/50 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer tags & trigger */}
                    <div className="space-y-3 pt-3 border-t border-border/40">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/30"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          By {post.author.name}
                        </span>
                        <span className="inline-flex items-center space-x-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── 5. FULL ARTICLE READER MODAL (Interactive Reading View) ── */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl my-8 bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-card/95 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedPost.readTime}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare(selectedPost)}
                  className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all text-xs font-semibold flex items-center gap-1"
                  title="Share Article Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-xl bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-colors text-foreground"
                  aria-label="Close Article"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Cover Picture */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-muted shadow-md">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>Published on {selectedPost.publishDate}</span>
                  <span>•</span>
                  <span>By {selectedPost.author.name}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Author Banner */}
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                    ST
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{selectedPost.author.name}</div>
                    <div className="text-[11px] text-muted-foreground">{selectedPost.author.role}</div>
                  </div>
                </div>

                <Link
                  href="/resume"
                  target="_blank"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>View Resume</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Introduction */}
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal italic border-l-2 border-primary pl-4">
                {selectedPost.content.introduction}
              </p>

              {/* Article Sections */}
              <div className="space-y-8 pt-2">
                {selectedPost.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <span>{sec.heading}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {sec.body}
                    </p>

                    {/* Code Snippet if present */}
                    {sec.codeSnippet && (
                      <div className="rounded-xl overflow-hidden border border-border/60 bg-slate-950 text-slate-100 shadow-md">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-primary" />
                            {sec.codeSnippet.language}
                          </span>
                        </div>
                        <pre className="p-4 text-xs font-mono overflow-x-auto text-slate-200 leading-relaxed">
                          <code>{sec.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Callout box if present */}
                    {sec.callout && (
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-xs font-semibold text-foreground flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{sec.callout}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Conclusion */}
                <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
                  <h4 className="text-sm font-bold text-foreground">Summary & Takeaways</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {selectedPost.content.conclusion}
                  </p>
                </div>
              </div>

              {/* Tags & Close Action */}
              <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/40"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

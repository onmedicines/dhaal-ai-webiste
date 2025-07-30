"use client";

import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import { Calendar, User, Tag, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import Header from "@/components/global/header";

interface Props {
  params: { slug: string };
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Calculate estimated read time (assuming 200 words per minute)
  const wordCount = article.content.split(" ").length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Header />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background relative">
        <div className="container mx-auto px-4 py-24 relative z-10">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowLeft size={16} />
              </motion.div>
              <span className="group-hover:text-blue-500 transition-colors duration-200">
                Back to Articles
              </span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm rounded-full border border-blue-500/20"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-background/80 to-secondary/20 border border-border/50 backdrop-blur-sm shadow-xl">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-blue-500 hover:prose-a:text-blue-400">
                {/* Split content into paragraphs and render without animations */}
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Related Articles / Navigation */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="p-8 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-border/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Continue Reading
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Previous Article */}
                {(() => {
                  const currentIndex = articles.findIndex(
                    (a) => a.slug === params.slug,
                  );
                  const prevArticle = articles[currentIndex - 1];
                  return prevArticle ? (
                    <Link
                      href={`/articles/${prevArticle.slug}`}
                      className="group p-4 rounded-lg border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/5"
                    >
                      <div className="text-sm text-muted-foreground mb-2">
                        ← Previous
                      </div>
                      <div className="font-semibold group-hover:text-blue-500 transition-colors duration-200">
                        {prevArticle.title}
                      </div>
                    </Link>
                  ) : (
                    <div />
                  );
                })()}

                {/* Next Article */}
                {(() => {
                  const currentIndex = articles.findIndex(
                    (a) => a.slug === params.slug,
                  );
                  const nextArticle = articles[currentIndex + 1];
                  return nextArticle ? (
                    <Link
                      href={`/articles/${nextArticle.slug}`}
                      className="group p-4 rounded-lg border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/5 text-right"
                    >
                      <div className="text-sm text-muted-foreground mb-2">
                        Next →
                      </div>
                      <div className="font-semibold group-hover:text-blue-500 transition-colors duration-200">
                        {nextArticle.title}
                      </div>
                    </Link>
                  ) : (
                    <div />
                  );
                })()}
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-16"
          >
            <div className="p-8 rounded-xl bg-gradient-to-r from-background/80 to-secondary/20 border border-border/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">
                Protect Your Business with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dhaal AI
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Ready to implement advanced deepfake detection? Get started with
                our AI-powered solution today.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                  Get Started
                </button>
                <Link
                  href="/about"
                  className="px-8 py-3 border border-border/50 hover:border-blue-500/50 rounded-lg font-medium transition-all duration-300 hover:bg-blue-500/5"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

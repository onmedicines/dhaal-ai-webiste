"use client";

import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import Header from "@/components/global/header";

export default function ArticlesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <Header />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background relative">
        <div className="container mx-auto px-4 py-24 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Articles
              </span>{" "}
              & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay informed about the latest developments in AI, deepfake
              detection, and digital security with expert insights from the
              Dhaal IO team.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article) => (
              <motion.article
                key={article.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className="group"
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="h-full p-6 rounded-xl bg-gradient-to-br from-background/80 to-secondary/20 border border-border/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:border-blue-500/30">
                    {/* Article Header */}
                    <div className="mb-4">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors duration-200">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded-full border border-blue-500/20"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Read More Indicator */}
                    <div className="mt-4 flex items-center text-blue-500 group-hover:text-blue-400 transition-colors duration-200">
                      <span className="text-sm font-medium">Read Article</span>
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {articles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-muted-foreground mb-4">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
              <p className="text-muted-foreground">
                We are working on creating valuable content for you. Check back
                soon!
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="p-8 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-border/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dhaal AI
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest insights on AI security, deepfake detection, and
                digital protection delivered straight to your inbox.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                  Subscribe to Newsletter
                </button>
                <Link
                  href="/about"
                  className="px-6 py-3 border border-border/50 hover:border-blue-500/50 rounded-lg font-medium transition-all duration-300 hover:bg-blue-500/5"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cases = [
  {
    img: "/fakeaudio.webp",
    isDeepfake: true,
    mediaType: "audio",
    audioSrc: "/fakevoice.wav",
  },
  {
    img: "/fakevideo.mp4",
    isDeepfake: false,
    mediaType: "video",
    videoSrc: "/fakevideo.mp4",
  },
  {
    img: "/unsplash.jpg",
    isDeepfake: false,
    mediaType: "image",
  },
];

// SVG Animation Components
function CheckmarkAnimation({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            className="drop-shadow-lg"
          >
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeDasharray="188"
              initial={{ strokeDashoffset: 188 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M20 34 L28 42 L44 26"
              fill="none"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CrossAnimation({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            className="drop-shadow-lg"
          >
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeDasharray="188"
              initial={{ strokeDashoffset: 188 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M22 22 L42 42"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M42 22 L22 42"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CaseItem({
  caseData,
  index,
  onInView,
  isActive,
  isPlaying,
  onPlay,
}: {
  caseData: (typeof cases)[0];
  index: number;
  onInView: (index: number) => void;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (index: number, playing: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selected, setSelected] = useState<"real" | "fake" | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const getMediaElement = useCallback(() => {
    if (caseData.mediaType === "audio") return audioRef.current;
    if (caseData.mediaType === "video") return videoRef.current;
    return null;
  }, [caseData.mediaType]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          onInView(index);
        }
      },
      {
        threshold: [0.4],
        rootMargin: "0px 0px -40% 0px",
      },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [index, onInView]);

  useEffect(() => {
    const media = getMediaElement();
    if (!media) return;

    const handleEnded = () => {
      onPlay(index, false);
    };

    media.addEventListener("ended", handleEnded);

    return () => {
      media.removeEventListener("ended", handleEnded);
    };
  }, [index, onPlay, getMediaElement]);

  useEffect(() => {
    const media = getMediaElement();
    if (!media) return;

    if (isPlaying) {
      media.play();
    } else {
      media.pause();
    }
  }, [isPlaying, getMediaElement]);

  const handlePlayPause = () => {
    onPlay(index, !isPlaying);
  };

  const handleAnswer = (answer: "real" | "fake") => {
    setSelected(answer);
    setShowAnimation(true);

    // Show animation for 2 seconds, then reset for next try
    setTimeout(() => {
      setShowAnimation(false);
      setSelected(null);
    }, 2000);
  };

  const isCorrect =
    selected &&
    ((selected === "fake" && caseData.isDeepfake) ||
      (selected === "real" && !caseData.isDeepfake));

  // Show play button ONLY on hover and when not animating
  const shouldShowPlayButton =
    (caseData.mediaType === "audio" || caseData.mediaType === "video") &&
    isHovering &&
    !showAnimation;

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center py-10 min-h-[70vh]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="relative h-[500px] w-[90vw] sm:w-[400px] lg:h-[500px] lg:w-[600px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background / Image preview */}
          <Image
            src={caseData.img}
            alt={`Case ${index + 1}`}
            fill
            className="object-cover"
            priority={isActive}
          />

          <div className="absolute top-4 left-4 z-10">
            <span className="bg-black/80 text-white px-3 py-2 rounded-full text-sm font-medium capitalize">
              {caseData.mediaType}
            </span>
          </div>

          {/* Play Button - Only shows on hover */}
          {(caseData.mediaType === "audio" ||
            caseData.mediaType === "video") && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="w-24 h-24 rounded-full flex items-center justify-center">
                <AnimatePresence>
                  {shouldShowPlayButton && (
                    <motion.button
                      onClick={handlePlayPause}
                      className="w-20 h-20 group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-full h-full bg-black/70 rounded-full flex items-center justify-center shadow-lg group-hover:bg-black/80 transition-colors">
                        <svg
                          className={`w-8 h-8 text-white ${!isPlaying && "-ml-2"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {isPlaying ? (
                            <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
                          ) : (
                            <path d="M8 5v10l8-5z" />
                          )}
                        </svg>
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Hidden Media */}
          {caseData.mediaType === "audio" && (
            <audio
              ref={audioRef}
              src={caseData.audioSrc}
              preload="auto"
              className="hidden"
            />
          )}
          {caseData.mediaType === "video" && (
            <video
              ref={videoRef}
              src={caseData.videoSrc}
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl z-0" />

          {/* SVG Animations */}
          {showAnimation && isCorrect && (
            <CheckmarkAnimation isVisible={true} />
          )}
          {showAnimation && !isCorrect && <CrossAnimation isVisible={true} />}

          {/* Answer Buttons - Hide during animation */}
          <AnimatePresence>
            {!showAnimation && (
              <motion.div
                className="absolute bottom-6 left-6 right-6 flex gap-4 z-50"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={() => handleAnswer("real")}
                  className={`flex-1 px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                    selected === "real"
                      ? "bg-green-600 text-white"
                      : "bg-white/90 text-black hover:bg-green-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  REAL
                </motion.button>
                <motion.button
                  onClick={() => handleAnswer("fake")}
                  className={`flex-1 px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                    selected === "fake"
                      ? "bg-red-600 text-white"
                      : "bg-white/90 text-black hover:bg-red-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  FAKE
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function RealCasesSection() {
  const [active, setActive] = useState(0);
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(
    null,
  );
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this line

  const handleInView = (index: number) => {
    if (index !== active) {
      setActive(index);
    }
  };

  const handlePlay = (index: number, playing: boolean) => {
    if (playing) {
      setActivePlayingIndex(index);
    } else {
      setActivePlayingIndex(null);
    }
  };

  const handleSubmitUrl = () => {
    if (submittedUrl.trim()) {
      // Disable the button and show loading state
      setIsSubmitting(true);

      // Add 1-second delay before submission
      setTimeout(() => {
        setSubmissionSuccess(submittedUrl);
        setShowSuccessMessage(true);
        setSubmittedUrl("");
        setIsSubmitting(false);

        // Hide success message after 1 second
        setTimeout(() => {
          setShowSuccessMessage(false);
          setSubmittedUrl("");
        }, 1000);
      }, 1000); // 1-second delay before submission
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitUrl();
    }
  };

  return (
    <section id="cases" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
          <div className="lg:sticky lg:top-24 self-start space-y-6 max-w-md pt-20">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center sm:text-left">
                Can you spot a{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Deepfake?
                </span>
              </h2>
              <p className="font-semibold text-muted-foreground">
                Turn on your audio, play the media, and decide whether it&apos;s
                real or fake.
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                <li>Turn up your volume</li>
                <li>Watch/listen closely</li>
                <li>Choose wisely</li>
              </ol>
            </div>

            <div className="p-6 border border-pink-300 rounded-lg bg-pink-50 dark:bg-pink-900/10 text-sm space-y-4 mt-24">
              <h3 className="text-lg font-semibold text-red-600">
                Share a deepfake you&apos;ve found
              </h3>
              <p>
                Help our community by submitting any suspicious audio/video
                URLs.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste deepfake URL"
                  value={submittedUrl}
                  onChange={(e) => setSubmittedUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  className={`px-4 py-2 rounded transition ${
                    isSubmitting
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                  onClick={handleSubmitUrl}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccessMessage && submissionSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-green-100 border border-green-300 rounded text-green-800 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">{submissionSuccess}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground">
                We won&apos;t store any personal data.{" "}
                <a href="/privacy_policy" className="underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          <div className="lg:block overflow-x-auto flex lg:flex-col gap-6 snap-x snap-mandatory scroll-smooth no-scrollbar px-4 -mx-4 touch-pan-x">
            {cases.map((caseData, idx) => (
              <div key={idx} className="snap-center shrink-0 w-full lg:w-auto">
                <CaseItem
                  caseData={caseData}
                  index={idx}
                  onInView={handleInView}
                  isActive={active === idx}
                  isPlaying={activePlayingIndex === idx}
                  onPlay={handlePlay}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

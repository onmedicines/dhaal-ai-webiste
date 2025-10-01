"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";

type BackendResponse = {
  requestId: string;
  status: string; // e.g., 'real' | 'authentic' | 'fake' | 'manipulated' | 'spoof' | etc.
  score: number; // 0..1 or 0..100 (we'll normalize to 0..100)
  models?: string[]; // optional list of model names used
};

// Accepted image MIME types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
  "image/tiff",
  "image/avif",
] as const;

const getEnvEndpoint = () => {
  // Replace with your actual env var name; ensure it's exposed to the client
  const url = `${process.env.NEXT_PUBLIC_API_URL}/detection/image`;
  return url || "";
};

const normalizeScoreToPercent = (score: number | undefined | null) => {
  if (score == null) return null;
  return score <= 1 ? Math.round(score * 100) : Math.round(score);
};

const isAuthenticStatus = (status: string) => {
  const s = status.toLowerCase();
  return s.includes("real") || s.includes("authentic") || s.includes("genuine");
};

const isManipulatedStatus = (status: string) => {
  const s = status.toLowerCase();
  return (
    s.includes("fake") ||
    s.includes("manipulated") ||
    s.includes("spoof") ||
    s.includes("tamper")
  );
};

const resultColor = (status: string) => {
  if (isAuthenticStatus(status)) return "text-green-600";
  if (isManipulatedStatus(status)) return "text-red-600";
  return "text-gray-700";
};

const barColor = (status: string) => {
  if (isAuthenticStatus(status)) return "bg-green-500";
  if (isManipulatedStatus(status)) return "bg-red-500";
  return "bg-gray-400";
};

const labelFromStatus = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("real") || s.includes("authentic") || s.includes("genuine"))
    return "Authentic";
  if (
    s.includes("fake") ||
    s.includes("manipulated") ||
    s.includes("spoof") ||
    s.includes("tamper")
  )
    return "Manipulated";
  return status; // fallback to raw status label
};

const validateImageType = (file: File): boolean => {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
};

const ImageDeepfakeChecker: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [resp, setResp] = useState<BackendResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleOpenFileDialog = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      // Validate file type
      if (!validateImageType(f)) {
        setError(
          `Invalid file type: ${
            f.type || "unknown"
          }. Please upload a valid image file (JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, or AVIF).`
        );
        setFile(null);
        setPreviewUrl(null);
        setResp(null);
        return;
      }

      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResp(null);
      setError("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      // Validate file type
      if (!validateImageType(f)) {
        setError(
          `Invalid file type: ${
            f.type || "unknown"
          }. Please upload a valid image file (JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, or AVIF).`
        );
        setFile(null);
        setPreviewUrl(null);
        setResp(null);
        return;
      }

      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResp(null);
      setError("");
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreviewUrl(null);
    setResp(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCheck = async () => {
    if (!file) return;

    // Validate file type before sending to API
    if (!validateImageType(file)) {
      setError(
        `Invalid file type: ${
          file.type || "unknown"
        }. Please upload a valid image file (JPEG, PNG, GIF, WebP, BMP, SVG, TIFF, or AVIF).`
      );
      return;
    }

    try {
      setIsChecking(true);
      setError("");
      setResp(null);

      const endpoint = getEnvEndpoint();
      if (!endpoint)
        throw new Error(
          "Backend endpoint is not configured. Set NEXT_PUBLIC_DEEPFAKE_API."
        );

      const form = new FormData();
      form.append("image", file); // MUST be "image"

      const res = await fetch(endpoint, { method: "POST", body: form });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as BackendResponse;
      setResp(data);
    } catch (e: unknown) {
      let errorMessage = "Failed to analyze. Please try again.";

      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === "string") {
        errorMessage = e;
      }

      setError(errorMessage);
    } finally {
      setIsChecking(false);
    }
  };

  const scorePercent = normalizeScoreToPercent(resp?.score ?? null);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-6xl p-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Try it yourself
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Upload an image to check its authenticity with our advanced deepfake
            detection model.
          </p>
        </div>

        {!previewUrl ? (
          <div
            className="h-[70vh] w-full border-2 border-dashed border-muted-foreground/40 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={handleOpenFileDialog}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Click anywhere or drag & drop to upload a photo
              </p>
              {error && (
                <p className="mt-3 text-sm text-red-600 max-w-md mx-auto">
                  {error}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: preview + actions */}
            <div>
              <div className="border rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
                <div className="relative w-full aspect-square">
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Uploaded image"
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  className="flex-1"
                  onClick={handleCheck}
                  disabled={isChecking}
                >
                  {isChecking ? "Analyzing…" : "Check for Deepfake"}
                </Button>
                <Button variant="outline" onClick={resetAll}>
                  Try Again
                </Button>
              </div>

              {error ? (
                <p className="mt-3 text-sm text-red-600">{error}</p>
              ) : null}
            </div>

            {/* Right: results */}
            <div className="border rounded-lg p-4 flex items-center justify-center min-h-[300px] max-h-full">
              {isChecking ? (
                <div className="flex flex-col items-center gap-3">
                  <Spinner height="h-full" />
                  <p className="text-sm text-muted-foreground">
                    Analyzing image…
                  </p>
                </div>
              ) : resp ? (
                <div className="w-full">
                  <h2
                    className={`text-xl font-semibold ${resultColor(
                      resp.status
                    )}`}
                  >
                    {labelFromStatus(resp.status)}
                  </h2>

                  <Separator className="my-4" />

                  {/* Score */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Degree of spoofing
                      </span>
                      <span
                        className={`text-sm font-medium ${resultColor(
                          resp.status
                        )}`}
                      >
                        {typeof scorePercent === "number"
                          ? `${scorePercent}%`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${barColor(resp.status)}`}
                        style={{
                          width: `${
                            typeof scorePercent === "number"
                              ? Math.min(Math.max(scorePercent, 0), 100)
                              : 0
                          }%`,
                          transition: "width 400ms ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Meta details */}
                  <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                    <p>Request ID: {resp.requestId || "N/A"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Upload an image and click &quot;Check for Deepfake&quot; to
                  see results here.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageDeepfakeChecker;

// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================

// "use client";

// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import Spinner from "@/components/ui/spinner";

// type BackendResponse = {
//   requestId: string;
//   status: string; // e.g., 'real' | 'authentic' | 'fake' | 'manipulated' | 'spoof' | etc.
//   score: number; // 0..1 or 0..100 (we’ll normalize to 0..100)
//   models?: string[]; // optional list of model names used
// };

// const getEnvEndpoint = () => {
//   // Replace with your actual env var name; ensure it’s exposed to the client
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/detection/image`;
//   return url || "";
// };

// const normalizeScoreToPercent = (score: number | undefined | null) => {
//   if (score == null) return null;
//   return score <= 1 ? Math.round(score * 100) : Math.round(score);
// };

// const isAuthenticStatus = (status: string) => {
//   const s = status.toLowerCase();
//   return s.includes("real") || s.includes("authentic") || s.includes("genuine");
// };

// const isManipulatedStatus = (status: string) => {
//   const s = status.toLowerCase();
//   return (
//     s.includes("fake") ||
//     s.includes("manipulated") ||
//     s.includes("spoof") ||
//     s.includes("tamper")
//   );
// };

// const resultColor = (status: string) => {
//   if (isAuthenticStatus(status)) return "text-green-600";
//   if (isManipulatedStatus(status)) return "text-red-600";
//   return "text-gray-700";
// };

// const barColor = (status: string) => {
//   if (isAuthenticStatus(status)) return "bg-green-500";
//   if (isManipulatedStatus(status)) return "bg-red-500";
//   return "bg-gray-400";
// };

// const labelFromStatus = (status: string) => {
//   const s = status.toLowerCase();
//   if (s.includes("real") || s.includes("authentic") || s.includes("genuine"))
//     return "Authentic";
//   if (
//     s.includes("fake") ||
//     s.includes("manipulated") ||
//     s.includes("spoof") ||
//     s.includes("tamper")
//   )
//     return "Manipulated";
//   return status; // fallback to raw status label
// };

// const ImageDeepfakeChecker: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [isChecking, setIsChecking] = useState(false);
//   const [resp, setResp] = useState<BackendResponse | null>(null);
//   const [error, setError] = useState<string>("");

//   const handleOpenFileDialog = () => fileInputRef.current?.click();

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const f = e.dataTransfer.files?.[0];
//     if (f) {
//       setFile(f);
//       setPreviewUrl(URL.createObjectURL(f));
//       setResp(null);
//       setError("");
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (f) {
//       setFile(f);
//       setPreviewUrl(URL.createObjectURL(f));
//       setResp(null);
//       setError("");
//     }
//   };

//   const resetAll = () => {
//     setFile(null);
//     setPreviewUrl(null);
//     setResp(null);
//     setError("");
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleCheck = async () => {
//     if (!file) return;
//     try {
//       setIsChecking(true);
//       setError("");
//       setResp(null);

//       const endpoint = getEnvEndpoint();
//       if (!endpoint)
//         throw new Error(
//           "Backend endpoint is not configured. Set NEXT_PUBLIC_DEEPFAKE_API.",
//         );

//       const form = new FormData();
//       form.append("image", file); // MUST be "image"

//       const res = await fetch(endpoint, { method: "POST", body: form });
//       if (!res.ok) {
//         const text = await res.text().catch(() => "");
//         throw new Error(text || `Request failed with status ${res.status}`);
//       }

//       const data = (await res.json()) as BackendResponse;
//       setResp(data);
//     } catch (e: unknown) {
//       let errorMessage = "Failed to analyze. Please try again.";

//       if (e instanceof Error) {
//         errorMessage = e.message;
//       } else if (typeof e === "string") {
//         errorMessage = e;
//       }

//       setError(errorMessage);
//     } finally {
//       setIsChecking(false);
//     }
//   };

//   const scorePercent = normalizeScoreToPercent(resp?.score ?? null);

//   return (
//     <section className="min-h-screen w-full flex items-center justify-center bg-background">
//       <div className="w-full max-w-6xl p-6">
//         {/* Heading */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//             Try it yourself
//           </h1>
//           <p className="text-muted-foreground max-w-xl mx-auto text-lg">
//             Upload an image to check its authenticity with our advanced deepfake
//             detection model.
//           </p>
//         </div>

//         {!previewUrl ? (
//           <div
//             className="h-[70vh] w-full border-2 border-dashed border-muted-foreground/40 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
//             onClick={handleOpenFileDialog}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//           >
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileChange}
//             />
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground">
//                 Click anywhere or drag & drop to upload a photo
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left: preview + actions */}
//             <div>
//               <div className="border rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
//                 <div className="relative w-full aspect-square">
//                   {previewUrl && (
//                     <Image
//                       src={previewUrl}
//                       alt="Uploaded image"
//                       fill
//                       className="object-contain"
//                       priority
//                     />
//                   )}
//                 </div>
//               </div>

//               <div className="mt-4 flex gap-3">
//                 <Button
//                   className="flex-1"
//                   onClick={handleCheck}
//                   disabled={isChecking}
//                 >
//                   {isChecking ? "Analyzing…" : "Check for Deepfake"}
//                 </Button>
//                 <Button variant="outline" onClick={resetAll}>
//                   Try Again
//                 </Button>
//               </div>

//               {error ? (
//                 <p className="mt-3 text-sm text-red-600">{error}</p>
//               ) : null}
//             </div>

//             {/* Right: results */}
//             <div className="border rounded-lg p-4 flex items-center justify-center min-h-[300px] max-h-full">
//               {isChecking ? (
//                 <div className="flex flex-col items-center gap-3">
//                   <Spinner height="h-full" />
//                   <p className="text-sm text-muted-foreground">
//                     Analyzing image…
//                   </p>
//                 </div>
//               ) : resp ? (
//                 <div className="w-full">
//                   <h2
//                     className={`text-xl font-semibold ${resultColor(resp.status)}`}
//                   >
//                     {labelFromStatus(resp.status)}
//                   </h2>

//                   <Separator className="my-4" />

//                   {/* Score */}
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-muted-foreground">
//                         Degree of spoofing
//                       </span>
//                       <span
//                         className={`text-sm font-medium ${resultColor(resp.status)}`}
//                       >
//                         {typeof scorePercent === "number"
//                           ? `${scorePercent}%`
//                           : "N/A"}
//                       </span>
//                     </div>
//                     <div className="w-full h-2 rounded-full bg-muted">
//                       <div
//                         className={`h-2 rounded-full ${barColor(resp.status)}`}
//                         style={{
//                           width: `${typeof scorePercent === "number" ? Math.min(Math.max(scorePercent, 0), 100) : 0}%`,
//                           transition: "width 400ms ease",
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Meta details */}
//                   <div className="mt-4 space-y-1 text-xs text-muted-foreground">
//                     <p>Request ID: {resp.requestId || "N/A"}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-sm text-muted-foreground">
//                   Upload an image and click “Check for Deepfake” to see results
//                   here.
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ImageDeepfakeChecker;

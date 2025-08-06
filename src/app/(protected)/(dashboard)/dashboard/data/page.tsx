"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Eye,
  Trash2,
  Search,
  Filter,
  FileText,
  ImageIcon,
  Video,
  Volume2,
  // Shield,
  // Clock,
  RefreshCw,
} from "lucide-react";
import MediaPreviewModal from "@/components/dashboard/MediaPreviewModal";
import { uploadedFiles, UploadedFile } from "./dummyFiles";
import { formatDistanceToNow } from "date-fns";

function FileCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FilesPage() {
  const [files, setFiles] = useState<UploadedFile[]>(uploadedFiles);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredFiles = files.filter((f) => {
    const bySearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const byStatus = filterStatus === "all" || f.status === filterStatus;
    const byType = filterType === "all" || f.type === filterType;
    return bySearch && byStatus && byType;
  });

  const handleView = (f: UploadedFile) => {
    setSelectedFile(f);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setIsLoading(false);
  };

  /* helpers */
  const fileIcon = (type: string, name: string) =>
    ({
      image: <ImageIcon className="h-6 w-6 text-blue-500" />,
      video: <Video className="h-6 w-6 text-purple-500" />,
      document: name.includes(".mp3") ? (
        <Volume2 className="h-6 w-6 text-green-500" />
      ) : (
        <FileText className="h-6 w-6 text-red-500" />
      ),
    })[type] ?? <FileText className="h-6 w-6 text-gray-500" />;

  // const authenticityStyle = (a: string) =>
  //   ({
  //     authentic: "bg-green-500/10 text-green-700 border-green-200",
  //     fake: "bg-red-500/10 text-red-700 border-red-200",
  //     suspicious: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  //   })[a] ?? "bg-gray-500/10 text-gray-700 border-gray-200";

  // const statusStyle = (s: string) =>
  //   ({
  //     completed: "bg-green-500/10 text-green-700 border-green-200",
  //     processing: "bg-blue-500/10 text-blue-700 border-blue-200 animate-pulse",
  //     failed: "bg-red-500/10 text-red-700 border-red-200",
  //   })[s] ?? "bg-gray-500/10 text-gray-700 border-gray-200";

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Your Files</h1>
          <p className="text-muted-foreground text-sm">
            Manage and view uploaded files for authenticity checks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            {filteredFiles.length} files
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="sm:w-[160px]">
            <Filter className="h-4 w-4 mr-1" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="sm:w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* list */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <FileCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">No files found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm || filterStatus !== "all" || filterType !== "all"
                ? "Try adjusting your search or filters"
                : "Upload your first file to get started"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((f) => (
            <Card key={f.id} className="hover:shadow-md transition-shadow">
              <CardContent className="">
                <div className="flex items-start gap-3">
                  {/* icon + meta */}
                  <div className="flex-shrink-0">
                    {fileIcon(f.type, f.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{f.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {f.size} •{" "}
                      {formatDistanceToNow(new Date(f.uploadedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                {/* status + actions */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  {/* <div className="flex flex-wrap items-center gap-1">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 ${statusStyle(f.status)}`}
                    >
                      {f.status}
                    </Badge>
                    {f.status === "completed" && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-2 ${authenticityStyle(
                          f.authenticity,
                        )}`}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {f.authenticity}
                      </Badge>
                    )}
                  </div> */}

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(f)}
                      className="gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete File</AlertDialogTitle>
                          <AlertDialogDescription>
                            Delete{" "}
                            <span className="font-semibold">{f.name}</span>?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(f.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <MediaPreviewModal
        file={selectedFile}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}


import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Download, Upload } from "lucide-react";

export function PublicImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);
      return () => clearInterval(interval);
    } else if (!isLoading && uploadProgress > 0) {
      setUploadProgress(100);
      const timeout = setTimeout(() => {
        setUploadProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, uploadProgress]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedImageUrl(null);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("يرجى اختيار صورة أولاً");
      return;
    }

    setIsLoading(true);
    setUploadProgress(10);
    setShowAnimation(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(
        "https://vbwdxdgdjvcaxzyzxaia.supabase.co/functions/v1/remove-bg",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "حدث خطأ أثناء معالجة الصورة");
      }

      // Create a blob from the response
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      // Small delay to ensure animation completes
      setTimeout(() => {
        setProcessedImageUrl(imageUrl);
        toast.success("تمت إزالة الخلفية بنجاح!");
        setShowAnimation(false);
      }, 500);
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error(error.message || "حدث خطأ أثناء إزالة الخلفية");
      setShowAnimation(false);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (processedImageUrl) {
      const link = document.createElement("a");
      link.href = processedImageUrl;
      link.download = "processed-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-right">
      <div className="text-center mb-8">
        <p className="text-muted-foreground dark:text-gray-400">قم بتحميل صورة وإزالة خلفيتها بنقرة واحدة</p>
      </div>

      <div 
        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary cursor-pointer transition-all bg-card/30 dark:bg-gray-800/20 backdrop-blur-sm" 
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {previewUrl ? (
          <div className="w-full">
            <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto object-contain rounded-md shadow-md transition-all duration-200 hover:scale-[1.02]" />
            <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">انقر لتغيير الصورة</p>
          </div>
        ) : (
          <div className="text-center p-8">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">انقر لاختيار صورة أو اسحبها وأفلتها هنا</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, JPEG</p>
          </div>
        )}
      </div>

      {uploadProgress > 0 && (
        <div className="w-full">
          <Progress value={uploadProgress} className="h-2 transition-all bg-gray-200 dark:bg-gray-700" />
          <p className="text-xs text-muted-foreground text-center mt-1">
            {uploadProgress < 100 ? "جاري المعالجة..." : "اكتملت المعالجة!"}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isLoading} 
          className="w-full max-w-xs bg-primary hover:bg-primary/90 transition-all"
        >
          {isLoading ? "جاري المعالجة..." : "إزالة الخلفية"}
        </Button>
      </div>

      {showAnimation && !processedImageUrl && (
        <div className="space-y-4 mt-8 animate-fade-in">
          <h3 className="text-xl font-bold text-center">جاري المعالجة</h3>
          <div className="border rounded-lg p-4 bg-checkered dark:bg-gray-800/30 relative overflow-hidden frosted-glass">
            <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-lg animate-pulse" />
            <Skeleton className="h-64 w-full rounded-md bg-gray-200/50 dark:bg-gray-700/50" />
          </div>
        </div>
      )}

      {processedImageUrl && (
        <div className="space-y-4 mt-8 animate-fade-in">
          <h3 className="text-xl font-bold text-center text-foreground dark:text-white">النتيجة</h3>
          <div className="border rounded-lg p-4 bg-checkered dark:bg-gray-800/30 shadow-xl backdrop-blur-sm transition-all">
            <img src={processedImageUrl} alt="Processed" className="max-h-64 mx-auto object-contain rounded-md transition-all duration-500 hover:scale-[1.02]" />
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={downloadImage} 
              variant="outline" 
              className="w-full max-w-xs gap-2 border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary dark:hover:bg-primary/10 transition-all"
            >
              <Download className="h-4 w-4" />
              تحميل الصورة
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

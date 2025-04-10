
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedImageUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("يرجى اختيار صورة أولاً");
      return;
    }

    setIsLoading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast.error("يجب تسجيل الدخول لاستخدام هذه الخدمة");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(
        "https://vbwdxdgdjvcaxzyzxaia.supabase.co/functions/v1/remove-bg",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
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
      setProcessedImageUrl(imageUrl);
      toast.success("تمت إزالة الخلفية بنجاح!");
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error(error.message || "حدث خطأ أثناء إزالة الخلفية");
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
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md text-right">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">أداة إزالة خلفية الصور</h2>
        <p className="text-muted-foreground">قم بتحميل صورة وإزالة خلفيتها بنقرة واحدة</p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-primary cursor-pointer" onClick={() => fileInputRef.current?.click()}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {previewUrl ? (
          <div className="w-full">
            <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto object-contain" />
            <p className="text-center mt-2 text-sm text-gray-500">انقر لتغيير الصورة</p>
          </div>
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">انقر لاختيار صورة أو اسحبها وأفلتها هنا</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleUpload} disabled={!selectedFile || isLoading} className="w-full max-w-xs">
          {isLoading ? "جاري المعالجة..." : "إزالة الخلفية"}
        </Button>
      </div>

      {processedImageUrl && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center">النتيجة</h3>
          <div className="border rounded-lg p-4 bg-gray-50">
            <img src={processedImageUrl} alt="Processed" className="max-h-64 mx-auto object-contain bg-checkered" />
          </div>
          <div className="flex justify-center">
            <Button onClick={downloadImage} variant="outline" className="w-full max-w-xs">
              تحميل الصورة
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

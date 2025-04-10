
import { PublicImageUploader } from "@/components/PublicImageUploader";

const BackgroundRemover = () => {
  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">أداة إزالة خلفية الصور</h1>
          <a href="/" className="text-primary hover:underline">
            الصفحة الرئيسية
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicImageUploader />
      </main>
    </div>
  );
};

export default BackgroundRemover;

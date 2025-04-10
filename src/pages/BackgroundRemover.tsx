
import { PublicImageUploader } from "@/components/PublicImageUploader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BackgroundRemover = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted transition-colors duration-300 dark:from-gray-900 dark:to-gray-800" dir="rtl">
      <header className="bg-background/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80 dark:border-b dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">أداة إزالة خلفية الصور</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="/" className="text-primary hover:text-primary/80 transition-colors">
              الصفحة الرئيسية
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm dark:bg-gray-900/50">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text inline-block">
              محرر الصور الذكي
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <PublicImageUploader />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BackgroundRemover;

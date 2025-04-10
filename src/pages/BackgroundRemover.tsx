
import { PublicImageUploader } from "@/components/PublicImageUploader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BackgroundRemover = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300" dir="rtl">
      <header className="bg-background/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90 dark:border-b dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground dark:text-white">أداة إزالة خلفية الصور</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="/" className="text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
              الصفحة الرئيسية
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-2xl font-bold text-center text-foreground dark:text-white inline-block">
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

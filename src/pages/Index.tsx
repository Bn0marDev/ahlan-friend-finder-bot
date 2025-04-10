
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted transition-colors duration-300 dark:from-gray-900 dark:to-gray-800 p-4" dir="rtl">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">أداة إزالة خلفية الصور بتقنية الذكاء الاصطناعي</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          قم بإزالة خلفية أي صورة بنقرة واحدة. أداة سهلة الاستخدام تعتمد على أحدث تقنيات الذكاء الاصطناعي.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/remove-bg")} 
            className="min-w-[150px] bg-gradient-to-r from-primary to-blue-600 dark:from-blue-500 dark:to-purple-600 hover:opacity-90 transition-all"
          >
            استخدم الأداة الآن
          </Button>
        </div>
      </div>

      <Card className="mt-16 max-w-3xl w-full border-none shadow-lg bg-card/50 backdrop-blur-sm dark:bg-gray-900/50">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">كيفية استخدام الأداة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center transition-transform hover:scale-105 duration-300">
              <div className="bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-blue-300 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-md">
                <span className="text-2xl font-bold">١</span>
              </div>
              <h3 className="font-bold mb-2 dark:text-gray-100">قم بتحميل الصورة</h3>
              <p className="text-gray-600 dark:text-gray-400">اختر أي صورة من جهازك بسهولة</p>
            </div>
            <div className="text-center transition-transform hover:scale-105 duration-300">
              <div className="bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-blue-300 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-md">
                <span className="text-2xl font-bold">٢</span>
              </div>
              <h3 className="font-bold mb-2 dark:text-gray-100">انقر على "إزالة الخلفية"</h3>
              <p className="text-gray-600 dark:text-gray-400">وانتظر بضع ثوان حتى تتم المعالجة</p>
            </div>
            <div className="text-center transition-transform hover:scale-105 duration-300">
              <div className="bg-primary/10 text-primary dark:bg-blue-500/20 dark:text-blue-300 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-md">
                <span className="text-2xl font-bold">٣</span>
              </div>
              <h3 className="font-bold mb-2 dark:text-gray-100">قم بتحميل الصورة النهائية</h3>
              <p className="text-gray-600 dark:text-gray-400">احفظ الصورة بعد إزالة الخلفية على جهازك</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

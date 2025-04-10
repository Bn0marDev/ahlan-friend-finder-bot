
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4" dir="rtl">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">أداة إزالة خلفية الصور بتقنية الذكاء الاصطناعي</h1>
        <p className="text-xl text-gray-600 mb-8">
          قم بإزالة خلفية أي صورة بنقرة واحدة. أداة سهلة الاستخدام تعتمد على أحدث تقنيات الذكاء الاصطناعي.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/remove-bg")} className="min-w-[150px]">
            استخدم الأداة الآن
          </Button>
        </div>
      </div>

      <div className="mt-16 bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">كيفية استخدام الأداة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 text-primary inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
              <span className="text-xl font-bold">١</span>
            </div>
            <h3 className="font-bold mb-2">قم بتحميل الصورة</h3>
            <p className="text-gray-600">اختر أي صورة من جهازك بسهولة</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 text-primary inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
              <span className="text-xl font-bold">٢</span>
            </div>
            <h3 className="font-bold mb-2">انقر على "إزالة الخلفية"</h3>
            <p className="text-gray-600">وانتظر بضع ثوان حتى تتم المعالجة</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 text-primary inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
              <span className="text-xl font-bold">٣</span>
            </div>
            <h3 className="font-bold mb-2">قم بتحميل الصورة النهائية</h3>
            <p className="text-gray-600">احفظ الصورة بعد إزالة الخلفية على جهازك</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

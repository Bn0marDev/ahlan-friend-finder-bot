
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        toast.success("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني للتأكيد.", {
          duration: 5000,
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        mode === "signin"
          ? "فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور."
          : "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h2>
        <p className="text-muted-foreground mt-2">
          {mode === "signin"
            ? "قم بتسجيل الدخول للوصول إلى أداة إزالة الخلفية"
            : "قم بإنشاء حساب جديد للوصول إلى أداة إزالة الخلفية"}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-right">
            البريد الإلكتروني
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            dir="ltr"
            placeholder="your@email.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-right">
            كلمة المرور
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            dir="ltr"
            placeholder="••••••••"
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span>جاري التحميل...</span>
          ) : mode === "signin" ? (
            "تسجيل الدخول"
          ) : (
            "إنشاء حساب"
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-sm text-primary hover:underline"
        >
          {mode === "signin"
            ? "ليس لديك حساب؟ قم بإنشاء حساب جديد"
            : "لديك حساب بالفعل؟ قم بتسجيل الدخول"}
        </button>
      </div>
    </div>
  );
}

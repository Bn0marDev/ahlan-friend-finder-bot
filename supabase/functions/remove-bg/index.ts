
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const REMOVE_BG_URL = "https://api.remove.bg/v1.0/removebg";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    // Get the API key from Supabase database
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: configData, error: configError } = await supabaseClient
      .from("config")
      .select("value")
      .eq("key", "REMOVE_BG_API_KEY")
      .single();

    if (configError || !configData) {
      console.error("Error fetching API key:", configError);
      throw new Error("Failed to fetch API key");
    }

    const REMOVE_BG_API_KEY = configData.value;

    // Parse the form data from the request
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      throw new Error("No image file provided");
    }

    // Create a new FormData object for the API request
    const removeBgFormData = new FormData();
    removeBgFormData.append("image_file", imageFile);
    removeBgFormData.append("size", "auto");

    // Send request to Remove.bg API
    const response = await fetch(REMOVE_BG_URL, {
      method: "POST",
      headers: {
        "X-Api-Key": REMOVE_BG_API_KEY,
      },
      body: removeBgFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Remove.bg API error: ${response.status} - ${errorText}`);
      throw new Error(`Remove.bg API error: ${response.status}`);
    }

    // Get the processed image as a blob
    const imageBlob = await response.blob();

    // Return the processed image
    return new Response(imageBlob, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

// Helper function to create Supabase client
function createClient(supabaseUrl, supabaseKey, options) {
  return {
    from: (table) => ({
      select: (columns) => ({
        eq: (column, value) => ({
          single: () => {
            return fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}`, {
              headers: {
                "apikey": supabaseKey,
                "Authorization": `Bearer ${supabaseKey}`,
              },
            })
            .then(response => {
              if (!response.ok) throw new Error('Failed to fetch data');
              return response.json();
            })
            .then(data => {
              if (data && data.length > 0) {
                return { data: data[0], error: null };
              }
              return { data: null, error: { message: "No data found" } };
            })
            .catch(error => {
              return { data: null, error: { message: error.message } };
            });
          }
        })
      })
    })
  };
}

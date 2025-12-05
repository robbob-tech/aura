// functions/api/think.js
// Cloudflare Pages Function - AURA relay

const AURA_ENDPOINT = "https://meshexec-production.sparsesupernova.workers.dev/meshexec/aura/think";

export async function onRequestPost(context) {
  const { request } = context;
  
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-user-id",
  };

  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { content, owner_id, thread_id, basis, tags } = body;

    if (!content?.text) {
      return new Response(
        JSON.stringify({ error: "Missing content.text" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const userId = request.headers.get("x-user-id") || owner_id || "aura-api-user";

    console.log("[aura-api] Proxying to AURA:", {
      userId,
      threadId: thread_id,
      textLength: content.text.length,
    });

    // Proxy to AURA
    const auraResponse = await fetch(AURA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify({
        content: { text: content.text },
        owner_id: owner_id || userId,
        thread_id: thread_id || `aura-api-${Date.now()}`,
        basis: basis || "qwen2.5-72b-instruct",
        tags: tags || [],
      }),
    });

    if (!auraResponse.ok) {
      const errorText = await auraResponse.text().catch(() => "Unknown error");
      console.error("[aura-api] AURA call failed:", auraResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: "AURA API call failed",
          status: auraResponse.status,
          details: errorText.slice(0, 200),
        }),
        {
          status: auraResponse.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const auraData = await auraResponse.json();
    return new Response(JSON.stringify(auraData), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("[aura-api] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-user-id",
    },
  });
}


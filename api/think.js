// api/think.js
// Vercel serverless function - proxies to AURA

const AURA_ENDPOINT = "https://meshexec-production.sparsesupernova.workers.dev/meshexec/aura/think";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-user-id");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { content, owner_id, thread_id, basis, tags } = req.body;

    if (!content?.text) {
      return res.status(400).json({ error: "Missing required field: content.text" });
    }

    const userId = req.headers["x-user-id"] || owner_id || "aura-api-user";

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
      return res.status(auraResponse.status).json({
        error: "AURA API call failed",
        status: auraResponse.status,
        details: errorText.slice(0, 200),
      });
    }

    const auraData = await auraResponse.json();
    return res.status(200).json(auraData);
  } catch (err) {
    console.error("[aura-api] Error:", err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
}


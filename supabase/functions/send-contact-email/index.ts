// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

interface ReqPayload {
  name: string;
  email: string;
  message: string;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.info("send-contact-email started");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name, email, message }: ReqPayload = await req.json();

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "junry.mingo17@gmail.com",
    subject: `New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { ...corsHeaders, "Content-Type": "application/json", "Connection": "keep-alive" },
  });
});

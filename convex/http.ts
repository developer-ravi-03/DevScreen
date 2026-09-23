import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svixId = request.headers.get("svix-id");
    const svixSignature = request.headers.get("svix-signature");
    const svixTimestamp = request.headers.get("svix-timestamp");

    if (!svixId || !svixSignature || !svixTimestamp) {
      return new Response("No svix headers found", { status: 400 });
    }

    const payload = await request.text();
    const webhook = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = webhook.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook:", error);
      return new Response("Invalid webhook", { status: 400 });
    }

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      const email = email_addresses[0]?.email_address || "";
      const name = [first_name, last_name].filter(Boolean).join(" ").trim();

      const publicMetadata =
        evt.data.public_metadata &&
        typeof evt.data.public_metadata === "object"
          ? evt.data.public_metadata
          : {};

      const metadataRole =
        "role" in publicMetadata ? publicMetadata.role : undefined;

      const role =
        metadataRole === "interviewer" || metadataRole === "candidate"
          ? metadataRole
          : "candidate";

      try {
        await ctx.runMutation(api.users.syncUser, {
          clerkId: id,
          email,
          name: name || email,
          image: image_url,
          role,
          roleSelected:
            metadataRole === "interviewer" || metadataRole === "candidate",
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
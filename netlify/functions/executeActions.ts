import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  try {
    if (!process.env.ACTIONS_PATH || !process.env.ACCESS_TOKEN)
      throw new Error("Environment value is not exist.");

    await fetch(process.env.ACTIONS_PATH, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ ref: "main" }),
    });

    return {
      statusCode: 200,
      body: "Succeed to deploy",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to deploy";
    return {
      statusCode: 500,
      body: message,
    };
  }
};

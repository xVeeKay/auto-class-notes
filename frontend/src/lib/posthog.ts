import posthog from "posthog-js";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  debug: true,
  loaded: (posthog) => {
    console.log("✅ PostHog loaded");
    console.log(posthog.get_distinct_id());
  },
});

export default posthog;

export default defineAppConfig({
  myLayer: {
    name: "Hello from Nuxt layer",
  },
});

declare module "@nuxt/schema" {
  type AppConfigInput = {
    myLayer?: {
      /** Project name */
      name?: string;
    };
  };
}

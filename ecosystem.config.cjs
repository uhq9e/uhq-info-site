module.exports = {
  apps: [
    {
      name: "UhqBlogFrontEnd",
      port: "4130",
      // exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      interpreter: "bun",
    },
  ],
};

module.exports = {
  apps: [
    {
      name: "NuxtAppName",
      port: "4130",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      interpreter: "~/.bun/bin/bun",
    },
  ],
};

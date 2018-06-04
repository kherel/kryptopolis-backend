module.exports = {
  apps: [
    {
      name: 'app',
      script: "npm",
      args: "run start",
      log: "./log/production.log",
      max_restarts: 10,
    },
    {
      name: "jobs",
      script: "npm",
      args: "run jobs",
      log: "./log/jobs.log",
      max_restarts: 10,
    },
    {
      name: "tickers",
      script: "npm",
      args: "run tickers",
      log: "./log/tickers.log",
      max_restarts: 10,
    },
  ],
}

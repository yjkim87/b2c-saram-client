module.exports = {
  apps: [{
    name:          "saram-client",
    script:        "node_modules/next/dist/bin/next",
    args:          "start",
    instances:     1,
    autorestart:   true,
    watch:         false,
    max_memory_restart: "500M",
    env: {
      NODE_ENV: "production",
      B2C_API_URL: "http://localhost:80",
      NEXT_PUBLIC_SITE_URL: "https://www.saram.me",
    }
  }]
}

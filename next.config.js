const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5555/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;

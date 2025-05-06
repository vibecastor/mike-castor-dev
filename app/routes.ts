import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/projects", "routes/projects/index.tsx"),
  route("/projects/:slug", "routes/projects/$slug.tsx"),
  route("/blog", "routes/blog/index.tsx"),
  route("/blog/:slug", "routes/blog/$slug.tsx"),
] satisfies RouteConfig;

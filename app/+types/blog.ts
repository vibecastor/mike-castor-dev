import type { LoaderFunction, MetaFunction } from "react-router";
import type { BlogPost } from "../utils/blog-utils";

export namespace Route {
  export type LoaderData = {
    posts: BlogPost[];
  };

  export type MetaArgs = Parameters<MetaFunction>[0];
  export type LoaderArgs = Parameters<LoaderFunction>[0];

  export type ComponentProps = {
    loaderData: LoaderData;
  };
}

export namespace PostRoute {
  export type LoaderData = {
    post: BlogPost;
  };

  export type MetaArgs = Parameters<MetaFunction>[0];
  export type LoaderArgs = Parameters<LoaderFunction>[0];

  export type ComponentProps = {
    loaderData: LoaderData;
  };
}

import type { LoaderFunction, MetaFunction } from "react-router";
import type { Project } from "../data/projects";

export namespace Route {
  export type LoaderData = {
    projects: Project[];
  };

  export type MetaArgs = Parameters<MetaFunction>[0];
  export type LoaderArgs = Parameters<LoaderFunction>[0];

  export type ComponentProps = {
    loaderData: LoaderData;
  };
}

export namespace ProjectRoute {
  export interface LoaderData {
    project: Project;
  }

  export interface LoaderArgs {
    params: {
      slug: string;
    };
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }
}

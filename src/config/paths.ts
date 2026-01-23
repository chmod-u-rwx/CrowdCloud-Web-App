export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    signup: {
      path: "/signup",
      getHref: () => "/signup"
    },
    login: {
      path: "/login",
      getHref: () => "/login"
    }
  },

  app: {
    dashboard: {
      path: "",
      getHref: () => "/dashboard"
    },
    jobs: {
      path: "/dashboard/jobs",
      getHref: () => "/dashboard/jobs"
    },
    analytics: {
      path: "/dashboard/analytics",
      getHref: () => "/dashboard/analytics"
    },
    settings: {
      path: "/dashboard/user-settings",
      getHref: () => "/dashboard/user-settings"
    },
    job: {
      path: "/dashboard/jobs/:jobId",
      getHref: (job_id: string) => `/dashboard/jobs/${job_id}`
    },
  }
};
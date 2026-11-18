export type AdminStudyOwner = {
  id: string | null;
  email: string | null;
  fullName: string | null;
};

export type AdminStudy = {
  studyId: string;
  name: string | null;
  description: string | null;
  applicationName: string | null;
  owner: AdminStudyOwner;
  createdAt: string | null;
  updatedAt: string | null;
  firstDeploymentAt: string | null;
  participantCount: number;
  deploymentCount: number;
  fileCount: number;
  isLive: boolean;
};

export type AdminResearcher = {
  id: string;
  username: string | null;
  email: string | null;
  fullName: string | null;
  enabled: boolean;
  emailVerified: boolean;
  createdAt: string | null;
  ownedStudyCount: number;
  liveStudyCount: number;
};

export type ServerInfo = {
  version: string;
  environment: string;
  hostname: string | null;
  startedAt: string;
  uptimeSeconds: number;
  jvm: {
    javaVersion: string;
    availableProcessors: number;
    heapUsedBytes: number;
    heapMaxBytes: number;
  };
  health: {
    // UP, DOWN, ...
    status: string;
    // Status per dependency: database, RabbitMQ, mail, disk space, Keycloak
    components: Record<string, string>;
  };
};

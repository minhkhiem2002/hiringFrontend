export interface TeamMember {
    firstName: string;
    lastName: string;
    joinDate: string;
    role: string;
}

export interface TeamRequest {
    content: string;
    customerId: string;
    name: string;
    avatar: string;
}

export interface Team {
    name: string;
    address: string;
    currentMember: number;
    limitMember: number;
    sport: string;
    endpoint: string;
    avatar: string;
}

export interface TeamParams {
    PageSize?: number;
    PageNumber?: number;
    Search: string | null;
}

export interface TeamDetailData {
    id: string;
    leaderId: string;
    sport: string;
    name: string;
    description: string;
    endpoint: string;
    address: string;
    note: string;
    currentMember: number;
    limitMember: number;
    avatar: string;
    members: TeamMember[];
    requests: TeamRequest[];
}

export interface JoinTeam {
    customerId: string;
    sportTeamId: string;
}

export interface HandleTeamRequest {
    customerId: string | null;
    sportTeamId: string;
    accept: boolean;
}

export interface DeleteTeamMemberRequest {
    sportTeamId: string | null;
    customerId: string | null;
    captainId: string | null;
}

export interface PostTeam {
    Name: string;
    Sport: string;
    Description: string;
    Address: string;
    Note: string;
    LimitMember: number;
    CustomerId: string;
    Avatar: string;
  }

  export interface UpdateTeam {
    sportTeamId: string;
    sport: string;
    name: string;
    description: string;
    address: string;
    note: string;
    limitMember: number;
  }
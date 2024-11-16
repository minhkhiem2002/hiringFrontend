export interface TeamMember {
    firstName: string;
    lastName: string;
    joinDate: string;
    role: string;
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
}

export interface JoinTeam {
    customerId: string;
    sportTeamId: string;
}
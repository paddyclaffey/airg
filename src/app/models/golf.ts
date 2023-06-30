export interface ICoursesResponse{
    data: ICourse[];
}

export interface ICourseResponse{
    data: ICourse;
}

export interface IEventResponse{
    data: IEvent[];
}

export interface ICourse{
    id: number;
    name: string;
    holes: IHole[]
}

export interface IHole {
    number: number;
    length: number;
    par: number;
}

export interface IPlayer {
    id: number;
    first_name: string;
    last_name: string;
    country_code: string;
}

export interface IEvent{
    id: number;
    title: string;
    course_id: number
    participants: IPlayer[]
}

export interface IParticipant{
    player_id: number;
    holes: IHole[]
}


export interface ILeaderboardResponse{
    data: ILeaderboard[];
}

export interface ILeaderboard{
    player_id: number;
    total: number;
    score: number;
    thru: number;
}


import {matchApi} from "../http/match";
import {MatchResponse} from "../models/response/MatchResponse";

export default class MatchService{
    static async getAllMatches() {
        // @ts-ignore
        return matchApi.get<MatchResponse[]>('/get_all/');
    }
    static async getMatchId(matchId: number) {
        // @ts-ignore
        return matchApi.get<MatchResponse>(`/${matchId}/`);
    }
    static async createMatch(team_home: string, team_away_name: string, team_away_logo_url: string, score_home: number, score_away: number, location: string, division: string, video_url: string, match_date: string, match_time: string) {
        return matchApi.post(`/create/`, {team_home, team_away_name, team_away_logo_url, score_home, score_away, location, division, video_url, match_date, match_time});
    }

    static async deleteMatch(matchId: number) {
        return matchApi.delete(`/${matchId}/delete/`);
    }
    static async updateFullMatch(matchId: number, team_home: string, team_away_name: string, team_away_logo_url: string, score_home: number, score_away: number, location: string, division: string, video_url: string, match_date: string, match_time: string) {
        return matchApi.put(`/${matchId}/update/`, {team_home, team_away_name, team_away_logo_url, score_home, score_away, location, division, video_url, match_date, match_time});
    }

    static async updatePartMatch(matchId: number, team_home: string, team_away_name: string, team_away_logo_url: string, score_home: number, score_away: number, location: string, division: string, video_url: string, match_date: string, match_time: string) {
        return matchApi.patch(`/${matchId}/update/`, {team_home, team_away_name, team_away_logo_url, score_home, score_away, location, division, video_url, match_date, match_time});
    }
}
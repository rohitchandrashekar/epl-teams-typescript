import { Request, Response } from 'express';
import footballTeams from '../stubs/football.json';
import TeamNotFoundException from '../exceptions/teamNotFoundException'
export class TeamsController {
    public addNewTeam(req: Request, res: Response) {
        const newTeam = {
            name: req.body.teamName,
            img: req.body.logo
        };
        footballTeams.push(newTeam);
        res.json(newTeam);
    }

    public getTeams(req: Request, res: Response) {
        res.json(footballTeams);
    }

    public getTeamByName(req: Request, res: Response) {
        const doesTeamExist = footballTeams.find(
            ({ name }) => name === req.params.teamName
        );
        if (!doesTeamExist) {
            throw new TeamNotFoundException(req.params.teamName)
        } else {
            res.status(200).json(doesTeamExist)
        }
    }

    public updateTeam(req: Request, res: Response) {
        const objIndex = footballTeams.findIndex(
            ({ name }) => name == req.params.teamName
        );
        if (objIndex === -1) {
            throw new TeamNotFoundException(req.params.teamName);
        } else {
            footballTeams[objIndex].img = req.body.logo;
            res.json(footballTeams[objIndex]);

        }
    }
}
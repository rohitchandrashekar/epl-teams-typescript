import { Request, Response, NextFunction } from "express";
import { TeamsController } from "../controllers/teamsController";

export class Routes {

    public teamsController: TeamsController = new TeamsController()

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request executed successfully!'
                })
            })

        // Contact 
        app.route('/teams')
            .get(this.teamsController.getTeams)
            // POST endpoint for teams to add new team
            .post(this.teamsController.addNewTeam);
        app
          .route('/teams/:teamName')
          // get specific team
          .get(this.teamsController.getTeamByName)
          //update specific team
          .put(this.teamsController.updateTeam);

    }
}
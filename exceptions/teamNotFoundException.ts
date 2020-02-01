import HttpException from './HttpException';

class TeamNotFoundException extends HttpException {
  constructor(name: string) {
    super(404, `Team with name ${name} not found`);
  }
}

export default TeamNotFoundException

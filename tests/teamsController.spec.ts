
import 'mocha';
import chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
import app from '../lib/app';
import footballTeams from '../stubs/football.json';
describe('/GET teams', () => {
    it('should get all the epl teams contained in the mock json', (done) => {
        chai.request(app).get('/teams')
            .then((res: any) => {
                expect(res.status).to.equal(200);
                const teams = res.body;
                expect(teams).to.be.an('array');
                expect(teams).to.eql(footballTeams);

                done();
            });
    }).timeout(8000);
});
describe('/POST teams', () => {
    it('should add a new team', (done) => {
        const NewTeamData = {
            teamName: "Leeds United",
            logo: "https://www.logofootball.net/wp-content/uploads/Leeds-United-FC-HD-Logo.png"
        }
        chai.request(app).post('/teams')
            .send(NewTeamData)
            .then((res: any) => {
                expect(res.status).to.equal(200);
                const team = res.body;
                expect(team).to.be.an('object');
                expect(team).to.have.property('name');
                expect(team).to.have.property('img');
                expect(team.name).to.equal(NewTeamData.teamName);
                expect(team.img).to.equal(NewTeamData.logo);
                done();
            });
    }).timeout(8000);
});
describe('/GET /teams/:teamName', () => {
    it('Should return the value of the team', (done) => {
        const teamName = 'Bournemouth'
        chai.request(app).get(`/teams/${teamName}`)
            .then((res: any) => {
                expect(res.status).to.equal(200);
                const team = res.body;
                expect(team).to.be.an('object');
                expect(team).to.have.property('name');
                expect(team).to.have.property('img');
                expect(team.name).to.equal(teamName);
                done();
            });
    }).timeout(8000);
});
describe('/GET /teams/:teamName', () => {
    it('Should return an error since the team does not exist', (done) => {
        const teamName = 'Granada'
        chai.request(app).get(`/teams/${teamName}`)
            .then((res: any) => {
                expect(res.status).to.equal(404);
                expect(res).to.have.property('error');
                expect(res.error).to.be.an('error');

                done();
            });
    }).timeout(8000);
});

describe('/PUT /teams/:teamName', () => {
    it('should update the teams logo', (done) => {
        const teamName = 'Burnley';
        const newLogo = {
            logo: "https://www.logofootball.net/wp-content/uploads/Leeds-United-FC-HD-Logo.png"
        }
        chai.request(app).put(`/teams/${teamName}`)
            .send(newLogo)
            .then((res: any) => {
                expect(res.status).to.equal(200);
                const team = res.body;
                expect(team).to.be.an('object');
                expect(team).to.have.property('name');
                expect(team).to.have.property('img');
                expect(team.name).to.equal(teamName);
                expect(team.img).to.equal(newLogo.logo);
                done();
            });
    }).timeout(8000);
});
describe('/PUT /teams/:teamName', () => {
    it('Should not update the teams logo and return an error', (done) => {
        const teamName = 'Napoli';
        const newLogo = {
            Logo: "https://www.logofootball.net/wp-content/uploads/Leeds-United-FC-HD-Logo.png"
        }
        chai.request(app).put(`/teams/${teamName}`)
            .send(newLogo)
            .then((res: any) => {
                expect(res.status).to.equal(404);
                expect(res).to.have.property('error');
                expect(res.error).to.be.an('error');
                done();
            });
    }).timeout(8000);
});
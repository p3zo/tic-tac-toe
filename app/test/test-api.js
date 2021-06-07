import "core-js/stable";
import "regenerator-runtime/runtime";

import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("/GET /", () => {
     it("should return an error when the board is < 9 characters", done => {
          chai.request(app)
               .get("/")
               .query({ board: "    " })
               .end((err, response) => {
                    response.should.have.status(400);

                    done();
               });
     });

     it("should return an error when the board is > 9 characters", done => {
          chai.request(app)
               .get("/")
               .query({ board: "          " })
               .end((err, response) => {
                    response.should.have.status(400);

                    done();
               });
     });

     it("should return a move when the board is valid", done => {
          const board = "         ";

          chai.request(app)
               .get("/")
               .query({ board })
               .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property("newBoard");
                    response.body.newBoard.length.should.be.eq(9);
                    response.body.newBoard.should.not.be.eq(board);

                    done();
               });
     });
});

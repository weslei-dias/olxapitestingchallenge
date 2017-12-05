let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Clients', () => {

    describe('/GET Clients', () => {

        it("Recuperando todos os clientes", (done) => {

            chai.request('http://localhost:3000')
                .get('/clients')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    });

    describe('/POST Clients', () => {


        let clients = [];
        for (let i = 0; i < 2; i++) {
            let newClient = {
                "name": "Weslei Dias" + i,
                "document_id": "1234567890" + i,
                "address": "Rua São Luiz, nº " + i,
                "user": "weslei-" + i,
                "password": "w35l3" + i,
            };
            clients.push(newClient);
        }

        clients.map((item, index) => {
            it("Verificando a Inserção de novos clientes", (done) => {

                chai.request('http://localhost:3000')
                    .post('/clients/')
                    .send(item)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.have.property('name').eql('Weslei Dias'+index);
                        done();
                    });
            })

        });

    });

    describe('/GET Clients', () => {

        it("Recuperando o cliente novo inserido - Nome: Weslei Dias0", (done) => {

            chai.request('http://localhost:3000')
                .get('/clients?name=Weslei Dias0')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    });

    describe('/PUT Clients', () => {

        it("Editando o cliente de ID=1", (done) => {

            let dadosAAlterar = {
                "address": "Avenida Amazonas nº 61",
                "user": "usuario-alterado",
                "password": "123456",
            };

            chai.request('http://localhost:3000')
                .put('/clients/1')
                .send(dadosAAlterar)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/DELETE Clients', () => {

        it("Deletando o cliente de ID=3", (done) => {

            chai.request('http://localhost:3000')
                .delete('/clients/3')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


});




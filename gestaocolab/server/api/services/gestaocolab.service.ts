// import { Container } from "@azure/cosmos";
// import cosmosDb from "../../common/cosmosdb";
// import { Gestaocolab } from "../entites/gestaocolab";

// class GestaocolabService{
//     private container:Container =
//         cosmosDb.container("gestaocolab");

//     async all(): Promise<Gestaocolab[]>{
//         const {resources: listaColab}
//              = await this.container.items.readAll<Gestaocolab>().fetchAll();
//              console.log(listaColab)
//         return Promise.resolve(listaColab);
//     }
// }

// export default new GestaocolabService();

import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Gestaocolab } from "../entites/gestaocolab";
import daprClient from "../../common/daprclient";

class GestaocolabService {
    private container: Container =
        cosmosDb.container("gestaocolab");

    async publishEvent(gestaocolab: Gestaocolab): Promise<Gestaocolab> {
        daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string, process.env.APPCOMPONENTTOPICGESTAOCOLAB as string, gestaocolab);
        return Promise.resolve(gestaocolab);
    }

    async all(): Promise<Gestaocolab[]> {
        const { resources: listaGestaocolab }
            = await this.container.items.readAll<Gestaocolab>().fetchAll();

        return Promise.resolve(listaGestaocolab);
    }
    async getById(id: string): Promise<Gestaocolab> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Gestaocolab c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const { resources: listaGestaocolab }
            = await this.container.items.query(querySpec).fetchAll();

        return Promise.resolve(listaGestaocolab[0]);
    }
    async saveNew(gestaocolab: Gestaocolab): Promise<Gestaocolab> {
        gestaocolab.id = "";
        await this.container.items.create(gestaocolab);
        await this.publishEvent(gestaocolab);
        return Promise.resolve(gestaocolab);
    }
    async update(id: string, gestaocolab: Gestaocolab): Promise<Gestaocolab> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Gestaocolab c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const { resources: listaGestaocolab }
            = await this.container.items.query(querySpec).fetchAll();
        const nomeAluno = listaGestaocolab[0];
        if (gestaocolab == undefined) {
            return Promise.reject();
        }
        //Atualizar os campos
        gestaocolab.nome = gestaocolab.nome;

        await this.container.items.upsert(gestaocolab.nome)

        return Promise.resolve(nomeAluno);
    }
    async delete(id: string): Promise<string> {

        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Gestaocolab c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const { resources: listaGestaocolab }
            = await this.container.items.query(querySpec).fetchAll();
        for (const aluno of listaGestaocolab) {
            await this.container.item(aluno.id).delete();
        }

        return Promise.resolve(id);
    }
}

export default new GestaocolabService();
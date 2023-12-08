import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Contrato } from "../entites/contrato";
// import daprClient from "../../common/daprclient";

class ContratoService {
    private container: Container =
        cosmosDb.container("contrato");

    async publishEvent(contrato: Contrato): Promise<Contrato> {
        // daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string, process.env.APPCOMPONENTTOPICCONTRATO as string, contrato);
        return Promise.resolve(contrato);
    }

    async all(): Promise<Contrato[]> {
        const { resources: listaContrato }
            = await this.container.items.readAll<Contrato>().fetchAll();

        return Promise.resolve(listaContrato);
    }
    async getById(id: string): Promise<Contrato> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Contrato c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const { resources: listaContrato }
            = await this.container.items.query(querySpec).fetchAll();

        return Promise.resolve(listaContrato[0]);
    }
    async saveNew(contrato: Contrato): Promise<Contrato> {
        contrato.id = "";
        await this.container.items.create(contrato);
        await this.publishEvent(contrato);
        return Promise.resolve(contrato);
    }
    async update(id: string, contrato: Contrato): Promise<Contrato> {
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Contrato c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const { resources: listaContrato }
            = await this.container.items.query(querySpec).fetchAll();
    
        if (listaContrato.length === 0) {
            return Promise.reject("Contrato não encontrado");
        }
    
        const Nomecontrato = listaContrato[0];
    
        // Atualizar os campos
        Nomecontrato.nome = contrato.nome;
    
        await this.container.items.upsert(Nomecontrato);
    
        return Promise.resolve(Nomecontrato);
    }
    async delete(id: string): Promise<string> {

        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Contrato c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const { resources: listaContrato }
            = await this.container.items.query(querySpec).fetchAll();
        for (const contrato of listaContrato) {
            await this.container.item(contrato.id).delete();
        }

        return Promise.resolve(id);
    }
}

export default new ContratoService();
import { Container } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Gestaocolab } from "../entites/gestaocolab";

class GestaocolabService{
    private container:Container =
        cosmosDb.container("gestaocolab");

    async all(): Promise<Gestaocolab[]>{
        const {resources: listaColab}
             = await this.container.items.readAll<Gestaocolab>().fetchAll();

        return Promise.resolve(listaColab);
    }
}

export default new GestaocolabService();
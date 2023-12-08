import {Request, Response} from 'express';
import ContratoService from '../../services/contrato.service';
import { Gestaocolab } from 'server/api/entites/gestaocolab';
import daprClient from 'server/common/daprcliente';

class ContratoController{

    async publishEvent(carro:Gestaocolab): Promise<Gestaocolab>{
        daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string,process.env.APPCOMPONENTTOPICGESTAOCOLAB as string,carro);
        return Promise.resolve(carro);

    }
    all(_:Request, res:Response): void{
        ContratoService.all().then((r) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        ContratoService.getById(req.params['id']).then((r) => res.json(r));
    }
    post(req:Request, res:Response): void{
        console.log("aqui");
        if(req.body == undefined)
            res.status(400).end();
        console.log(req.body)
        ContratoService.saveNew(req.body).then((r) => res.json(r));
    }
    update(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "" || req.body == undefined)
            res.status(400).end();
        ContratoService.update(req.params['id'],req.body).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
    delete(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        ContratoService.delete(req.params['id']).then((r) => res.json(r));
    }
}
export default new ContratoController();
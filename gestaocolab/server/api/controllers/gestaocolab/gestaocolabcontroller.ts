import {Request, Response} from 'express';
import GestaocolabService from '../../services/gestaocolab.service';

export class GestaoColabController{
    all(_:Request, res:Response): void{
        GestaocolabService.all().then((r) => res.json(r));
    }
}
export default new GestaoColabController();
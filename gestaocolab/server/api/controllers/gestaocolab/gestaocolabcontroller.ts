// import {Request, Response} from 'express';
// import GestaocolabService from '../../services/gestaocolab.service';

// export class GestaoColabController{
//     all(_:Request, res:Response): void{
//         GestaocolabService.all().then((r) => res.json(r));
//     }
// }
// export default new GestaoColabController();

import {Request, Response} from 'express';
import GestaocolabService from '../../services/gestaocolab.service';

class GestaocolabController{
    all(_:Request, res:Response): void{
        GestaocolabService.all().then((r) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        GestaocolabService.getById(req.params['id']).then((r) => res.json(r));
    }
    post(req:Request, res:Response): void{
        console.log("aqui");
        if(req.body == undefined)
            res.status(400).end();
        console.log(req.body)
        GestaocolabService.saveNew(req.body).then((r) => res.json(r));
    }
    update(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "" || req.body == undefined)
            res.status(400).end();
        GestaocolabService.update(req.params['id'],req.body).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
    delete(req:Request, res:Response): void{
        if(req.params['id'] == undefined || req.params['id'] == "")
            res.status(400).end();
        GestaocolabService.delete(req.params['id']).then((r) => res.json(r));
    }
}
export default new GestaocolabController();
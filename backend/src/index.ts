import express, { Request, Response } from 'express';
import * as CatService from './libs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get(`/list`, async (req: Request, res: Response) => {
    const cats = await CatService.getCats();

    res.json(cats);
});

app.get(`/:id`, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const cat = await CatService.getCat(Number(id));

    res.json(cat);
});

app.post(`/add`, async (req: Request, res: Response) => {
    const body: CatService.ICatDTO = req.body;

    await CatService.createCat({
        age: Number(body.age),
        name: body.name,
        breed_id: Number(body.breed_id),
        sex_id: Number(body.sex_id),
        fur_color: body.fur_color,
    });

    res.send(`Cat added`);
});

app.put(`/:id`, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: CatService.IUpdateCatDTO = req.body;

    await CatService.updateCat({
        id,
        age: Number(body.age),
        name: body.name,
        breed_id: Number(body.breed_id),
        sex_id: Number(body.sex_id),
        fur_color: body.fur_color,
    });

    res.send(`Cat updated`);
});

app.delete(`/:id`, async (req: Request, res: Response) => {
    const { id } = req.params;

    await CatService.deleteCat(Number(id));

    res.send(`Cat deleted`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
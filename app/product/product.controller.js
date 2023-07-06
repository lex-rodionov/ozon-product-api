import { Router } from 'express';

import productService from './product.service.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = await productService.create(req.body);

    res.send(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await productService.fetchAll();

    res.send(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getOne(id);

    res.send(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productService.update(id, req.body);

    res.send(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.delete(id);

    res.send({deleted: result});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default router;
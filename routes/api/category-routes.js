const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    let data = await Category.findAll({
      include: [{ model: Product }]
    }); 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error)
  };
});

router.get('/:id', async (req, res) => {
  try { 
    let data = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
  if (!data) {
    res.status(400).json({ message: 'ID not found.'});
  } res.status(200).json(data);
} catch (error) {
    res.status(500).json(error)
}});

router.post('/', (req, res) => {
  try {
    let data = Category.create(req.body);
    res.status(200).json({ message: 'new category created.' })
  } catch (error) {
    res.status(500).json(error);
  };
});

router.put('/:id', (req, res) => {
  try {
    let data = Category.update({ where: { id: req.params.id }});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  };
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await Category.destroy({ where: { id: req.params.id }});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(err);
  };
});

module.exports = router;

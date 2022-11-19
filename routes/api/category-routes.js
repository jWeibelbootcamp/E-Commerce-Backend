const router = require('express').Router();
const { Category, Product } = require('../../models');

// localhost:3001/api/categories

//  get all categories
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

// get one category
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

// create a category
router.post('/', (req, res) => {
  try {
    let data = Category.create(req.body);
    res.status(200).json({ message: 'New category created.' })
  } catch (error) {
    res.status(500).json(error);
  };
});

// update a category
router.put('/:id', async (req, res) => {
  try {
    let data = await Category.update(
      { category_name: req.body.category_name},
      { where: { id: req.params.id }}
    );
    res.status(200).json({ message: 'Category updated.' });
  } catch (error) {
    res.status(500).json(error);
  };
});

// delete a category
router.delete('/:id', async (req, res) => {
  try {
    let data = await Category.destroy({ where: { id: req.params.id }});
    res.status(200).json({ message: 'Category deleted.' });
  } catch (error) {
    res.status(500).json(err);
  };
});

module.exports = router;

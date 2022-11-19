const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// localhost:3001/api/tags

//  get all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let data = await Tag.findAll({ 
      include: [{ model: Product }]
    })
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  };
});

// get one tag
router.get('/:id', async (req, res) => {
  try { 
    let data = await Tag.findOne(req.params.id, {
    include: [{ model: Product, 
      attributes: ['id', 'product_name', 'price', 'stock','category_id'],
    }],
  })
  if (!data) {
    res.status(400).json({ message: 'ID not found.'});
  } res.status(200).json(data);
} catch (error) {
    res.status(500).json(error)
}});

// create a new tag
router.post('/', (req, res) => {
  try {
    let data = Tag.create(req.body);
    if (req.body.productIds.length) {
      let newTag = req.body.productIds.map(product_id => {
        return {
          product_id,
          tag_id: data.id
        };
      });
      let newData = ProductTag.bulkCreate(newTag);
      res.status(200).json({ message: 'New tag created.' });
    };
  } catch (error) {
    res.status(500).json(error);
  };
});

// update a tag
router.put('/:id', async (req, res) => {
  try {
    let data = await Tag.update(
      { tag_name: req.body.tag_name},
      { where: {id: req.params.id }}
    );
    res.status(200).json({ message: 'Tag updated.' });
  } catch (error) {
    res.status(500).json(error);
  };
});

// delete a tag
router.delete('/:id', (req, res) => {
  try {
    let data = Tag.destroy({ where: {id: req.params.id }});
    res.status(200).json({ message: 'Tag deleted.' });
  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;
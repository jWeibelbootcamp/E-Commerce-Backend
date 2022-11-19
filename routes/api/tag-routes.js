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
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let data = await Tag.findOne({ 
      include: [{ model: Product }]
    })
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  };
});

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

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    let data = await Tag.destroy({ where: {id: req.params.id }});
    let newTag = req.body.tag_id;
    Tag.bulkCreate(newTag);
    res.status(200).json({ message: 'Tag updated.' });
  } catch (error) {
    res.status(500).json(error);
  };
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    let data = Tag.destroy({ where: {id: req.params.id }});
    res.status(200).json({ message: 'Tag deleted.' });
  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;
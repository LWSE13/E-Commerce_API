const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const CategoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json({ message: 'Data successfully written', CategoryData, });
  }catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!CategoryData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Data successfully updated', CategoryData, });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Data successfully deleted', CategoryData, });
  } catch (err) {
    res.status(500).json({message: 'the data could not be deleted', error: err,});
  }
});

module.exports = router;

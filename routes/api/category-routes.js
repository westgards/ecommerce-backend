const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category by it's id
router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new category
router.post("/", (req, res) => {
  // create a new category
  /*
  {
    category_name: "leggings",
  }
  */
  Category.create(req.body)
    .then((categoryCreate) => res.status(200).json(categoryCreate))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categoryUpdate) => res.status(200).json(categoryUpdate))
    .catch((err) => {
      // bad request for body
      res.status(400).json(err);
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCategorybyId) => {
      res.json(deleteCategorybyId);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

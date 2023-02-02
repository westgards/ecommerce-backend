const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint
// find all tags and its associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Tag, model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id` and associated Tag data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", (req, res) => {
  /* 
    {
      tag_name: "punk music",
    }
  */
  Tag.create(req.body)
    .then((tagCreate) => res.status(200).json(tagCreate))
    .catch((err) => {
      // bad request for body
      res.status(400).json(err);
    });
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tagUpdate) => res.status(200).json(tagUpdate))
    .catch((err) => {
      // bad request for body
      res.status(400).json(err);
    });
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteTagbyId) => {
      res.json(deleteTagbyId);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

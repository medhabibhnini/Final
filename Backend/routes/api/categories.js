const router = require('express').Router();
const Categories = require('../../models/Categories');



router.route('/getCat').get((req, res) => {
    Categories.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/addCat').post((req, res) => {
    const name = req.body.name;

    const newCategories = new Categories({
        name,

    });

    newCategories.save()
        .then(() => res.json('Category added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/find/:id').get((req, res) => {
    Categories.findOne(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/delete/:id').delete((req, res) => {
    Categories.findByIdAndDelete(req.params.id)
        .then(products => res.json('Category removed'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req, res) => {
    Categories.findById(req.params.id)
        .then(categories => {
            categories.name = req.body.name;
            categories.save()
                .then(() => res.json('Category updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
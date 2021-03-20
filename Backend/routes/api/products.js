const router = require('express').Router();
const Products = require('../../models/Products');



router.route('/getprod').get((req, res) => {
    Products.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/addprod').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const barcode = Number(req.body.barcode);
    const price = Number(req.body.price);
    const category_name = req.body.category_name;
    const image = req.body.image;
    const quantity = Number(req.body.quantity);
    const newProduct = new Products({
        name,
        description,
        price,
        barcode,
        category_name,
        image,
        quantity,
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    Products.findById(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/delete/:id').delete((req, res) => {
    Products.findByIdAndDelete(req.params.id)
        .then(products => res.json('Product removed'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req, res) => {
    Products.findById(req.params.id)
        .then(products => {
            products.name = req.body.name;
            products.description = req.body.description;
            products.price = Number(req.body.price);
            products.barcode = Number(req.body.barcode);
            products.image = req.body.image;
            products.category_name = req.body.category_name;
            products.quantity = Number(req.body.quantity);

            products.save()
                .then(() => res.json('Product updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/getCount').get((req,res) => {
        Products.find()
        
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
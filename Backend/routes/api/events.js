const router = require('express').Router();
const Events = require('../../models/Events');



router.route('/getEvent').get((req, res) => {
    Events.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/addEvent').post((req, res) => {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const prize = Number(req.body.prize);
    const image = req.body.image;
    const newEvent = new Events({
        name,
        startDate,
        endDate,
        prize,
        image,  

    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/find/:id').get((req, res) => {
    Events.findById(req.params.id)
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/delete/:id').delete((req, res) => {
    Events.findByIdAndDelete(req.params.id)
        .then(events => res.json('Event removed'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req, res) => {
    Events.findById(req.params.id)
        .then(events => {
            events.name = req.body.name;
            events.startDate = req.body.startDate;
            events.endDate = req.body.endDate;
            events.prize = Number(req.body.prize);
            events.image = req.body.image;
            events.save()
                .then(() => res.json('Event updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
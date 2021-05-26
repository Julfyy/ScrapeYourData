const { Router } = require('express');
const router = Router();
const User = require('../models/User.js');

router.post('/getSelectors', (req, res) => {
    const userId = req.body.userId;
    const query = User.where({ id: userId });
    query.findOne().then((result, err) => {
        if (err) {
            console.error(err);
            return;
        }

        if (result !== null) {
            res.status(200).json({
                selectors: result.selectors === null ? [] : result.selectors.map(item => {
                    return {
                        tag: item.tag,
                        title: item.title
                    }
                })
            });
        } else {
            const newUser = new User({
                id: req.body.userId
            })

            newUser.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        selectors: []
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({
                        status: 400,
                        message: "Registration conflict."
                    });
                })
        }
    })
});


module.exports = router;
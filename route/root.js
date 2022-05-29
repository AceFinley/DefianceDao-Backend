var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var subscribe = require('../models/subscribe');
var project = require('../models/project');
const multer = require('multer');
var moment = require('moment');

console.log('Request accepted');

router.get('/', function (req, res) {
    res.send('hello world');
});

router.post('/addUser', function (req, res) {

    var email = req.body.email;
    var subData = req.body.subData;

    subscribe.find({ email })
        .then(data => {
            if (data.length) {
                res.send({ err: 'user already exists' });
                return;
            }
            var newSubscribe = new subscribe({ email: email, subData: subData });
            newSubscribe.save()
                .then(err => {
                    res.json({ err: 'success' });
                    return;
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/getAllUser', function (req, res) {

    subscribe.find({}).then(err => {
        res.send(err);
    }).catch(err => {
        res.send(err);
    })
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../zenlaunch/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 10000 * 1000;


// router.post("/uploadImage", function(req, res) {

//     let upload = multer({ storage: storage, fileFilter: imageFilter }).array('files', 10);

//     upload(req, res, function(err) {
//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else {

//         } // The same as when uploading single images

//         let result = "You have uploaded these images: <hr />";
//         const files = req.files;
//         let index, len;

//         // Loop through all the uploaded images and display them on frontend
//         for (index = 0, len = files.length; index < len; ++index) {
//             result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
//         }
//         result += '<hr/><a href="./">Upload more images</a>';
//         res.send(result);
//     });

//  });

router.post("/uploadImage", multer({ storage: storage, fileFilter: imageFilter }).array('files', 10), function (req, res) {

    return res.send('wonderful');

});

router.post('/addProject', function (req, res) {

    var name = req.body.name;
    var symbol = req.body.symbol;
    var description = req.body.description;
    var tokenPrice = req.body.tokenPrice;
    var totalSupply = req.body.totalSupply;
    var totalRaised = req.body.totalRaised;
    var tokenImage = req.body.tokenImage;
    var tokenAddress = req.body.tokenAddress;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var twitter = req.body.twitter;
    var medium = req.body.medium;
    var facebook = req.body.facebook;
    var discord = req.body.discord;

    project.find({ name })
        .then(data => {
            if (data.length) {
                res.send({ err: 'project already exists' });
                return;
            }
            var newProject = new project({
                name: name,
                symbol: symbol,
                description: description,
                tokenPrice: tokenPrice,
                totalSupply: totalSupply,
                totalRaised: totalRaised,
                tokenImage: tokenImage,
                tokenAddress: tokenAddress,
                startDate: startDate,
                endDate: endDate,
                twitter: twitter,
                medium: medium,
                facebook: facebook,
                discord: discord,
            });
            newProject.save()
                .then(err => {
                    res.json({ err: 'success' });
                    return;
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/getAllProjects', function (req, res) {

    project.find({}).then(err => {
        res.send(err);
    }).catch(err => {
        res.send(err);
    })
});

router.get('/getUpcomingProjects', function (req, res) {

    var sortBy = req.query.sortBy;
    var currentDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    console.log(currentDate);

    if(sortBy == 0) {
        project.find({
            startDate: {
                $gte: currentDate,
            }
        }).sort({startDate: 1}).then(err => {
            console.log(err);
            res.send(err);
        }).catch(err => {
            res.send(err);
        })
    }
});

router.get('/getActiveProjects', function (req, res) {

    var sortBy = req.query.sortBy;
    var currentDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    if(sortBy == 0) {
        project.find({
            startDate: {
                $lt: currentDate,
            },
            endDate: {
                $gt: currentDate,
            },
        }).sort({endDate: 1}).then(err => {
            console.log(err);
            res.send(err);
        }).catch(err => {
            res.send(err);
        })
    }
});

router.get('/getClosedProjects', function (req, res) {

    var sortBy = req.query.sortBy;
    var currentDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    if(sortBy == 0) {
        project.find({
            endDate: {
                $lt: currentDate,
            },
        }).sort({endDate: 1}).then(err => {
            console.log(err);
            res.send(err);
        }).catch(err => {
            res.send(err);
        })
    }
});

router.get('/getProjectById', function (req, res) {
    var id = req.query.id;

    project.find({ _id: id })
        .then(response => {
            return res.send(response);
        })
        .catch(err => {
            return res.send(err);
        })
});


router.post('/addpretoken', function (req, res) {

    var projectId = req.body.projectId;
    var description = req.body.description;
    var amount = req.body.amount;
    var buyDate = req.body.buyDate;
    var user = req.body.user;

    pretokens.findById({ id })
        .then(data => {
            if (data.length) {
                res.send({ err: 'buy transaction0 already exists' });
                return;
            }
            var newPreToken = new pretokens({
                projectId : projectId,
                description: description,
                amount: amount,
                buyDate: buyDate,
                user: user
            });
            newPreToken.save()
                .then(err => {
                    res.json({ err: 'success' });
                    return;
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/getAllPretokens', function (req, res) {

    preTokens.find({}).then(err => {
        res.send(err);
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;
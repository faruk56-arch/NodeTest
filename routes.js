const express = require('express')
const router = express.Router();

const { justifyValidator } = require('./justifyValidator');

const { addJustify, getJustify } = require('./justifyController');

router.get("/api/justify", getJustify)

router.post("/api/justify", justifyValidator, addJustify)

router.all("*", (req, res) => {
    res.status(404).json({
        message: "Request not found"
    })
})

module.exports = router;
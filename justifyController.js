const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');  // to process error results

const justifyModel = require('./justifyModel');

let returnedTextID = "";
let returnedText = "";
let addedText = "";
let totalWords = 0;

const getJustify = (async (req, res) => {

    const justifytext = req.body.justifytext

    try {

        // find all records in justifyText collection

        const userjustifytext = await justifyModel.find().select(
            {
                _id: 0,
                justifytext: 1
            })

        // console.log(userjustifytext)
        returnedText = (userjustifytext[0].justifytext);
        // console.log(`returenedtex ${returnedText}`)
        // totalWords = (userjustifytext[0].justifytext).match(/(\w+)/g).length;
        // console.log(totalWords);

        res.json({
            message: "List of justify text",
            userjustifytext
        })

    }
    catch (error) {
        res.status(400).json({
            message: "Error while getting text list",
            error
        })
    }
})

const addJustify = (async (req, res) => {

    currentText = req.body.justifytext;
    console.log(currentText);

    try {

        // get previous data stored in justifyText collection

        const userjustifytext = await justifyModel.find().select(
            {
                _id: 1,
                justifytext: 1
            }).lean()

        returnedTextID = (userjustifytext[0]._id);
        returnedText = (userjustifytext[0].justifytext);
        // console.log(returnedText)
        totalWords = returnedText.match(/(\w+)/g).length;
        console.log(totalWords);


        const deletejustifydocument = await justifyModel.remove({})


        res.json({
            message: "List of justify text",
            userjustifytext
        })

    }
    catch (error) {
        // const addjustifytext = await justifyModel.create({ justifytext: addedText })
        res.status(400).json({
            message: "Error while getting text list",
            error
        })
    }

    const errorVal = validationResult(req);

    // take words from collection and check how many words are there

    try {

        // add records in justifyText collection

        addedText = `${returnedText} ${currentText}`;
        console.log(`retturnedTextID ${returnedTextID}`)
        console.log(`returnedText ${returnedText}, total words: ${totalWords}`)
        console.log(`addedText ${addedText}, total words: ${addedText.match(/(\w+)/g).length}`)

        // check is the words are less than 80,000

        if (totalWords < 100) {

            console.log("less than 80000");

            if (errorVal.isEmpty()) {

                console.log("in erroval.empty")

                const addjustifytext = await justifyModel.create({ justifytext: addedText })

                console.log(`return from collection ${addjustifytext}`);
                
                const token = jwt.sign(
                    {
                        email: "faruk373@gmail.com"
                    },
                    {
                        expiresIn: "24"
                    })
                console.log("token", token)


                res.json({
                    message: 'Text added successfully',
                    addjustifytext
                })
            } else {

                res.status(400).json({
                    message: `Error while processing your ${addedText} as new text`,
                    addedText,
                    errorVal
                })
            }

        } else {

            // send information that words exceeded 80000 per day
            console.log("you have exceeded 80000 words per day limit, ")

            res.status(402).json({
                message: `Payment Required. You exceed ${totalWords}`,
                text,
                errorVal
            })
        }

    }
    catch (error) {
        res.status(400).json({
            message: "Error while getting text list",
            error
        })
    }
})


module.exports = { getJustify, addJustify }
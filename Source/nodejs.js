var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var cors = require('cors');
var app = express();
var result={'body': []};
var url = 'mongodb://gayathree:123@ds051873.mlab.com:51873/demo';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {  res.write("Connecting to Database Failed");
            res.end();  }
        insertDocument(db, req.body, function() {
            res.write("Successfully Registered");
            res.end();       });    });
    var insertDocument = function(db, data, callback) {
        db.collection('Hackathon').insertOne( data, function(err, result) {
            if(err)           {
                res.write("Registration Failed");
                res.end();           }
            console.log("Registration Successful");

            callback();        });    };})
app.post('/get-data',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUser(db, function() {
            db.close();        });    });
    var findUser = function(db, callback) {
        var cursor =db.collection('Hackathon').find();
        cursor.toArray(function(err, doc) {
            assert.equal(err, null);
            j=doc;
            JSON.stringify(j);
            doc1=j;
            for (var i=0;i<doc.length;i++) {
                result.body.push({"Team ID":doc[i]._id,"Team Name": doc[i].tname,"User Experience": doc[i].qty1,"Innovation": doc[i].qty2,"Collaboration": doc[i].qty3,"Originality": doc[i].qty4,"Code Quality": doc[i].qty5,"Design": doc[i].qty6,"Functionality": doc[i].qty7,"Integration Of Technology": doc[i].qty8,"Total Score": doc[i].total1,"comment": doc[i].comment});
            }console.log(result);
            res.contentType('application/json');
            res.write(JSON.stringify(j));
            res.end();        });    };})
app.post('/update',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Connecting to Database Failed");
            res.end();        }
        updateDocument(db, req.body, function() {
            res.write("Successful");
            res.end();        });    });
    var id=req.body.id2;
    var item={Team_Name:req.body.tname,User_Experience:req.body.qty1,Innovation:req.body.qty2,Collaboration:req.body.qty3,Originality:req.body.qty4,Code_Quality:req.body.qty5,Design:req.body.qty6,Functionality:req.body.qty7,Integration_of_Technology:req.body.qty8,Total_Score:req.body.total1,comment:req.body.comment};
    var updateDocument = function(db, data, callback) {
        db.collection('Hackathon').updateOne({"_id":ObjectId(id)},{$set:item}, function(err, result) {
            if(err)            {
                res.write("Registration Failed");
                res.end();            }
            console.log("Updated Record");
            callback();        });    };})
app.post('/delete', function(req, res) {
    var id = req.body.id1;
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Registration Failed");
            res.end();        }
        db.collection('Hackathon').deleteOne({"_id": ObjectId(id)}, function(err, result) {
            res.write("Successfully Deleted");
            res.end();
            console.log('Item deleted');        });});});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Running at http://%s:%s", host, port) })
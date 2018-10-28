//Twój kod

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const fs = require('fs');

app.use(express.static('./public/zadanieDnia/'));   // to bylo wczesniej


var taskList = [
    {
        id: 1,
        name: 'laptop'
    }
];

const DB_FILE = './data/przykladOdczytZapis/db2.json';
var currentId = 2;

//WCZYTANIE LISTY ZADAN Z PLIKU
fs.readFile(DB_FILE, (err, data) => {
    if (!err){
        taskList = JSON.parse(data);
    } else {
        console.log('Błąd odczytu pliku', err);
        res.send('Wystąpił błąd odczytu.');
    }
});

//POBRANIE WSZYSTKICH ZADAN
app.get('/task', function(req, res) {
    res.send({ tasks: taskList });
});

// DODANIE NOWEGO ZADANIA
app.post('/task', function(req, res) {
    var productName = req.body.name;
    currentId++;

    fs.readFile(DB_FILE, (err, data) => {//Odczytaj plik
        if (!err){
            //Jeżeli jest ok, to wczytaj dane z JSONa do tablicy:
            taskList = JSON.parse(data);
            //Dodaj nowy element:
            taskList.push({
                id: currentId,
                name: productName,
                isDon: false
            });
            //Zamień zaktualizowaną tablicę znów na JSON:
            const jsonToWrite = JSON.stringify(taskList);

            fs.writeFile(DB_FILE, jsonToWrite, (err, data) => {//Zapisz plik
                if (!err) {
                    res.send('Dodano.');
                } else {
                    console.log('Błąd zapisu pliku', err);
                    res.send('Wystąpił błąd zapisu.');
                }
            });
        } else {
            console.log('Błąd odczytu pliku', err);
            res.send('Wystąpił błąd odczytu.');
        }
    });
});

//DELETE
app.delete('/task/:id', function(req, res) {
    var id = req.params.id;

    var found = false;


    fs.readFile(DB_FILE, (err, data) => {//Odczytaj plik
        if (!err){
            //Jeżeli jest ok, to wczytaj dane z JSONa do tablicy:
            taskList = JSON.parse(data);
            //USUN  ELEMENT:
            taskList.forEach(function(task, index) {
                if (!found && task.id === Number(id)) {
                    taskList.splice(index, 1);
                }
            });
            //Zamień zaktualizowaną tablicę znów na JSON:
            const jsonToWrite = JSON.stringify(taskList);

            fs.writeFile(DB_FILE, jsonToWrite, (err, data) => {//Zapisz plik
                if (!err) {
                    res.send('USUNIETO!');
                } else {
                    console.log('Błąd zapisu pliku', err);
                    res.send('Wystąpił błąd zapisu.');
                }
            });
        } else {
            console.log('Błąd odczytu pliku', err);
            res.send('Wystąpił błąd odczytu.');
        }
    });
});

//UPDATE NAME
app.put('/task/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    fs.readFile(DB_FILE, (err, data) => {//Odczytaj plik
        if (!err){
            //Jeżeli jest ok, to wczytaj dane z JSONa do tablicy:
            taskList = JSON.parse(data);
            //UPDATE  ELEMENT:
            taskList.forEach(function(task, index) {
                if (!found && task.id === Number(id)) {
                    task.name = newName;
                }
            });
            //Zamień zaktualizowaną tablicę znów na JSON:
            const jsonToWrite = JSON.stringify(taskList);

            fs.writeFile(DB_FILE, jsonToWrite, (err, data) => {//Zapisz plik
                if (!err) {
                    res.send('ZAKTUALIZOWANO NAZWE!');
                } else {
                    console.log('Błąd zapisu pliku', err);
                    res.send('Wystąpił błąd zapisu.');
                }
            });
        } else {
            console.log('Błąd odczytu pliku', err);
            res.send('Wystąpił błąd odczytu.');
        }
    });
});

//UPDATE CHECKED
app.put('/taskChecked/:id', function(req, res) {
    var id = req.params.id;
    var newIsDon = req.body.newIsDon;

    var found = false;
    fs.readFile(DB_FILE, (err, data) => {//Odczytaj plik
        if (!err){
            //Jeżeli jest ok, to wczytaj dane z JSONa do tablicy:
            taskList = JSON.parse(data);
            //UPDATE  ELEMENT:
            taskList.forEach(function(task, index) {
                if (!found && task.id === Number(id)) {
                    task.isDon = newIsDon;
                }
            });
            //Zamień zaktualizowaną tablicę znów na JSON:
            const jsonToWrite = JSON.stringify(taskList);

            fs.writeFile(DB_FILE, jsonToWrite, (err, data) => {//Zapisz plik
                if (!err) {
                    res.send('ZAKTUALIZOWANO STAN ZADANIA!');
                } else {
                    console.log('Błąd zapisu pliku', err);
                    res.send('Wystąpił błąd zapisu.');
                }
            });
        } else {
            console.log('Błąd odczytu pliku', err);
            res.send('Wystąpił błąd odczytu.');
        }
    });
});






app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
#!/usr/bin/env node

var pn532 = require('pn532');
var SerialPort = require('serialport').SerialPort;

var serialPort = new SerialPort('/dev/cu.usbmodemfd121', { baudrate: 115200 });
var rfid = new pn532.PN532(serialPort);

rfid.on('ready', function() {
    console.log('Listening for a card scan...');
    rfid.on('card', function(data) {
        console.log('card data:', data);

        if(data.uid == '04:90:4b:aa:f5:26:80'){
        	console.log('klaver 9');
        }

        if(data.uid == '04:af:a2:aa:f5:26:80'){
        	console.log('pieken aas');
        }

        if(data.uid == '04:ae:10:aa:f5:26:80'){
            console.log('koeke 4');
        }

        if(data.uid == '04:aa:b6:aa:f5:26:80'){
            console.log('koeke koning');
        }

        if(data.uid == '04:b1:a7:aa:f5:26:80'){
            console.log('pieke 9');
        }

        if(data.uid == '04:83:a7:aa:f5:26:80'){
            console.log('klaver aas');
        }

        if(data.uid == '04:a1:3f:aa:f5:26:80'){
            console.log('koeke dame');
        }

        if(data.uid == '04:0f:8d:7a:83:1e:80'){
            console.log('klaver 8');
        }

        if(data.uid == '04:b5:18:aa:f5:26:84'){
            console.log('harte 8');
        }

    });
});

process.on('SIGINT', function() {
    serialPort.close(function (err) {
    	console.log('');
    	console.log('serialport closed');
    	process.exit();
    });
});
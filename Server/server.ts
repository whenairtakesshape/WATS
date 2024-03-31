import { Request, Response } from "express";
import 'dotenv/config';
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const noble = require('@abandonware/noble');
const DEVICE_INFORMATION_SERVICE_UUID = '181A';
const DEVICE_RX_CHARACTERISTIC_UUID = '6e400002b5a3f393e0a9e50e24dcca9e';

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`WATS listening at http://localhost:${port}`);
}
);


noble.on('stateChange', (state: string) => {
    if (state === 'poweredOn') {
        noble.startScanning();
    }
});

noble.on('discover', (peripheral: any) => {
    if (peripheral.advertisement.localName === 'WATS') {
        console.log('Found WATS device');
        noble.stopScanning();
        
        peripheral.on('connect', () => { console.log('Connected'); console.log(peripheral) })
        peripheral.on('disconnect', () => { console.log('Disconnected');   peripheral.connect();});

        peripheral.connect((error: any) => {
            peripheral.discoverServices([], (error: any, services: any) => {
                services.forEach((service: any) => {
                    console.log('Found service: ', service.uuid);
                    service.discoverCharacteristics(null, (error: any, characteristics: any) => {
                        characteristics.forEach((characteristic: any) => {
                            console.log('Found characteristic: ', characteristic.uuid);
                            if (characteristic.uuid === DEVICE_RX_CHARACTERISTIC_UUID) {
                                noble.writeCommand = (command: string) => {
                                    characteristic.write(Buffer.from(command), false, (error: any) => {
                                        if (error) {
                                            console.error('Error writing: ', error);
                                        } else {
                                            console.log('Command written: ', command);
                                        }
                                    });
                                }
                            }
                        });
                    });
                });
            });
        });
    }
});

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.post("/command", (req: any, res: any) => {
    const command = req.query.command;
    console.log("command", command);
    noble.writeCommand(command);
    res.end();
});

app.post("/aqi", (req: any, res: any) => {
    const aqi = parseInt(req.query.value);
    console.log("aqi", aqi);

    if (aqi < 51) {
        noble.writeCommand("0");
    } else if (aqi < 101) {
        noble.writeCommand("1");
    } else if (aqi < 151) {
        noble.writeCommand("2");
    } else if (aqi < 201) {
        noble.writeCommand("3");
    } else if (aqi < 301) {
        noble.writeCommand("4");
    } else {
        noble.writeCommand("5");
    }
    res.end();
});


/**
 * route used to authenticate admin for client user
 */
app.post("/admin", (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username == "Admin" && password == process.env.ADMIN_PASSWORD) {
        res.send(true);
        res.end();
    } else {
        res.send(false);
        res.end();
    }
});

export { };
import dotenv from 'dotenv';
import { ClientEG, ClientRSA } from './client';

dotenv.config();

const clientRSA = new ClientRSA();

const encodedMessageRSA = clientRSA.encode('1 189 000 031');
const decodedMessageRSA = clientRSA.decode(encodedMessageRSA);
console.log(decodedMessageRSA);

const clientEG = new ClientEG();

const { C1, message } = clientEG.encode('a');
console.log({message});
const decodedMessageEG = clientEG.decode(C1, message);
console.log(decodedMessageEG);



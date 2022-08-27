import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline';

import http from 'http';
const myApiKey = process.env.myApiKey;
const url = process.env.url;
const urlReady = url + '?'+ 'access_key=' + myApiKey + '&query=';
console.log(urlReady)


const rl = readline.createInterface({ input, output });

const recurAsking = function () {
	rl.question('Введите название города на английском!\n', (answer) => {
		if(answer === 'exit') {
		  return rl.close();
		} else {
			const finalUrl = urlReady + answer;
			console.log(finalUrl);
			http.get(finalUrl, (res) => {
				const {statusCode} = res;
				if(statusCode !== 200) {
					console.log(`statusCode: ${statusCode}`);
					recurAsking();
				}

				res.setEncoding('utf8');
				let data = '';
				res.on('data', (chunk) => data += chunk);
				res.on('end', () => {
					const parseData = JSON.parse(data);
					console.log(parseData);
					recurAsking();
				})
			}).on('error', (err) => {
				console.error(err)
				recurAsking();
			})
		}
        
    })
};

recurAsking();
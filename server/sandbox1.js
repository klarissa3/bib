/* eslint-disable no-console, no-process-exit */
const maitre = require('./maitre.js');
var fs = require('fs');
async function sandbox () {
  try {
    //console.log(`🕵️‍♀️  browsing ${searchLink} source`);
    const restaurants = await maitre.get();
    console.log(restaurants);
    //let data = JSON.stringify(restaurants,null,'\t');
    //fs.writeFileSync('maitre.json', data);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } 
}
sandbox();


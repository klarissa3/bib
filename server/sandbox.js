/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin.js')
const maitre = require('./maitre.js');
var fs = require('fs')
async function sandbox () {
  try {
    //Scrap bib michelin restaurants
    const restaurants = await michelin.get() 
    let data = JSON.stringify(restaurants,null,'\t')
    fs.writeFileSync('bibmichelin.json', data)

    //Scrap maitres restaurateurs 
    const restaurants_maitres = await maitre.get();
    let data = JSON.stringify(restaurants_maitres,null,'\t');
    fs.writeFileSync('maitre.json', data);
    
    console.log('done')
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } 
}
sandbox()


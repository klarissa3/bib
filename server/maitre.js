const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


/**
 * Get all France located Maître restaurateur restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
  const restaurants = [];
  //const end=[];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.maitresrestaurateurs.fr/annuaire/recherche');
  await page.click(
    '#zoneAnnuaire_layout > div > form > div.row.annuaire_row.bts > div.col-sm-offset-3.col-xs-6.text-center > input',
  )
  await page.waitFor(1000);
  
  const result = await page.evaluate(() => {
    var list =[]
    var names =[]
    var adresses =[]
    var numbers =[]

    let named = document.querySelectorAll('div.annuaire_single div.single_desc div.single_libel a')
    //let num = document.querySelector('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.global-pagination > a.end');
    //end = parseInt(num.getAttribute('data-page'));
    //res.push(end);
    named.forEach(e => { 
      let full_name =e.innerText
      let name = full_name.split('(')
      names.push(name[0]);
    })

    let adresse = document.querySelectorAll('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.annuaire_single > div.single_desc > div.single_details > div > div:nth-child(2) > div')
    adresse.forEach(e => { 
      let ad =e.innerText
      let a =ad.replace('\n',' ')
      let b = a.replace("\n\n","")
      adresses.push(b)
    })
    
    let numbere = document.querySelectorAll('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.annuaire_single > div.single_desc > div.single_details > div > div:nth-child(3) > div')
    numbere.forEach(e => { 
      let num =e.innerText
      let n = num.replace("\n","")
      
      numbers.push(n)
    })

    for(var idx =0 ; idx <names.length;idx++){
      restaurant = {
        name : names[idx],
        adress : adresses[idx],
        number : numbers[idx]
      }
      list.push(restaurant)  
    }
    return list 
  })
  restaurants.push(result)
 
  //console.log(restaurants[0])
  for(var i =1;i<50;i++){
    await page.click(
    '#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.global-pagination > a.next',
    )
    await page.waitFor(2000);
    const resultat = await page.evaluate(() => {
      var li =[]
      var nam=[]
      var adr =[]
      var numb =[]

      let name = document.querySelectorAll('div.annuaire_single div.single_desc div.single_libel a')
      name.forEach(e => { 
        let full_name =e.innerText
        let name = full_name.split('(')
        nam.push(name[0]);
      })

      let adress = document.querySelectorAll('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.annuaire_single > div.single_desc > div.single_details > div > div:nth-child(2) > div')
      adress.forEach(e => { 
        let ad =e.innerText
        let a =ad.replace('\n',' ')
        let b = a.replace("\n\n","")
      adr.push(b)
      })
    
      let numbere = document.querySelectorAll('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.annuaire_single > div.single_desc > div.single_details > div > div:nth-child(3) > div')
      numbere.forEach(e => { 
        let num =e.innerText
        let n = num.replace("\n","")
        numb.push(n)
      })

      for(var idx =0 ; idx <nam.length;idx++){
        restaurant = {
          name : nam[idx],
          adress : adr[idx],
          number : numb[idx]
        }
        li.push(restaurant)  
      }
      return li
    });
    restaurants.push(resultat);
     
  }
  
  await browser.close()
  return restaurants
}

  
 
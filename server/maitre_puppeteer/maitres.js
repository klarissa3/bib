const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
    const $ = cheerio.load(data);
    const list =[];
    const restaurant = {
        name : $('div.annuaire_single div.single_desc div.single_libel a').text(),
        adress : $('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.annuaire_single > div.single_desc > div.single_details > div > div:nth-child(2) > div').text(),
        number : $('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.annuaire_single > div.single_desc > div.single_details > div > div:nth-child(3) > div').text()
       
    }
    list.push(restaurant);
    return list;
  };

/**
 * Scrape a restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
const scrapeRestaurant = async (link) => {
    const response = await axios(link);
    const {data, status} = response;
    if (status >= 200 && status < 300) {
      return parse(data);
    }
    console.error(status);
  
    return null;
  };

  const getAllUrls = async (links, nbPages) => {
    let postRequests = [];
    for (let i = 1; i <= nbPages; i++) {
      postRequests.push({
        method: 'post',
        url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: `page=${i}&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard`
      })
    }

    let restaurants =[]
    for (let i = 0; i < postRequests.length; i ++) {
        for (array of restaurants) {
            await Promise.all(array.map(async request => {
              const response = await axios(request);
              const { data, status } = response;
        
              if (status >= 200 && status < 300) {
                const $ = cheerio.load(data);
                $('.single_libel a').each((index, value) => {
                  let link = $(value).attr('href');
                  links.push(`https://www.maitresrestaurateurs.fr${link}`);
                });
              }
              else console.error(status);
            }));
        }
      }
    
}

module.exports.get = async () => {
    let restaurants = [];
    const response = await axios({
        method: 'post',
        url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: 'page=1&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard'
      });
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      const $ = cheerio.load(data);
      //let num = $('#zoneAnnuaire_layout > div.row.annuaire_result > div.col-md-9 > div.annuaire_result_list > div.global-pagination > a.end');
      //const nbPages = parseInt(num.getAttribute('data-page'));
      let links = [];
      await getAllUrls(links, 2);
      let arrayOfArrays = [];
      for (let i = 0; i < links.length; i ++) {
        for (array of arrayOfArrays) {
            await Promise.all(array.map(link => scrapeRestaurant(link, restaurants)));
          }
      }
      return restaurants;
    }
    else {
      console.error(status);
      return restaurants;
    }
  };  
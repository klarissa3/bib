const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse link restaurant
 * @param  {String} data - html response
 * @return {Object} link to restaurant
 */
const parse_link = data => {
  const $ = cheerio.load(data);
  const test = [];
  $('a.link').each( function(){
    var link = $(this).attr('href');
    test.push(link);
  
  } );
  return test;
};

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const list =[];
  const restaurant = {
    name: " ",
    adress: " ",
    price: " ",
    type: " ",
    number: " "
  };
  restaurant.name = $('.restaurant-details__heading.d-lg-none h2.restaurant-details__heading--title').text();
  const str = $('.restaurant-details__heading.d-lg-none ul.restaurant-details__heading--list li').text();
  const tab = str.split('\n');
  restaurant.adress = tab[0];
  restaurant.price = tab[2].trim() +' '+ tab[4].trim() +' '+ tab[5].trim() +' '+ tab[7].trim();
  restaurant.type = tab[9];
  restaurant.number = $('.d-flex span.flex-fill').text().substring(0,17);
  list.push(restaurant);
  return list;
};
/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
const scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }
  console.error(status);

  return null;
};
/**
 * Scrape a given restaurant link
 * @param  {String}  url
 * @return {Object} links
 */
const scrapeLink = async url => {
  const response = await axios(url);
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse_link(data);
  }
  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async() => {
  const links = [];
  const restaurants = [];
  let i=1;
  var result = [];
  var results =[];

  do{
    let link = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i;
    result = await scrapeLink(link);
    result.forEach(function(i){
    links.push(i);   
    });
    i+=1;
  }while(Array.isArray(result) && result.length ); 
  
  for(let j=0;j<links.length;j++){
    let link = "https://guide.michelin.com"+links[j];
    results = await scrapeRestaurant(link);
    restaurants.push(results);
  };
  /*links.forEach(async l  => {
    console.log(l);
    let link = "https://guide.michelin.com"+l;
    const results = await scrapeRestaurant(link);
    //console.log(results);
    restaurants.push(results);
  }); */
  
  return restaurants;
};


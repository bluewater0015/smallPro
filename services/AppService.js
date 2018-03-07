import Promise from '../vendor/bluebird.min.js';

import BaseService from './BaseService.js';

function searchSuggest(value, latitude, longitude){
    return BaseService.get('https://w.mapbar.com/search2015/search/suggest',{
        keywords: value,
        city: '110000',
        location: latitude + ',' + longitude
    })
}


//search相关\

function commonSearch(keywords, location, city, page_num) {
    return BaseService.get(
        `https://w.mapbar.com/search2015/search`,
        {
            keywords,
            location,
            city,
            page_num
        }
    )
}
module.exports = {
    searchSuggest: searchSuggest,
    commonSearch
}
import Promise from '../vendor/bluebird.min.js';

import BaseService from './BaseService.js';

function searchSuggest(value, latitude, longitude){
    return BaseService.get('https://w.mapbar.com/search2015/search/suggest',{
        keywords: value,
        city: '110000',
        location: latitude + ',' + longitude
    })
}

function login(code, userimg,username){
    return BaseService.get('https://wireless.mapbar.com/api/3n1-wxgroup/wxGroup/login.json',{
        code,
        userimg,
        username
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
    commonSearch,
    login
}
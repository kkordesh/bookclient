let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' : '127.0.0.1'

    APIURL = 'http://localhost:3000';

    break;

    case 'bookshelfclient.herokuapp.com':

    APIURL = 'https://bookshelfclient.herokuapp.com'


}

export default APIURL;
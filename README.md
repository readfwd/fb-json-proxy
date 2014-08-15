This is a proxy web service for Facebook pages JSON.
It was created because:

* Facebook does not allow cross domain JSON browser requests
* Facebook does not allow OpenGraph API without login
* Facebook does not allow wget / curl direct requests

**Sample use**

Get: http://localhost:8080/v1.0/macovei-fb-proxy.json

**Config**

* REFRESH_INTERVAL defaults to 120 (2 minutes);
* FB_PAGE_ID defaults to '1444537399159513' (MacoveiPresedinte page on Facebook)
* USER_AGENT defaults to 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36';

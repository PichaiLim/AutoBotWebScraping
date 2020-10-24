// TODO include plugin
const request = require("request");
const cheerio = require("cheerio");

// TODO Default link website
const defWebSite = "URL Address";
const defWebSiteMain = defWebSite + "main";
const defWebLogin = defWebSite + "login";
const defWebsecurity = defWebSite + "security"; // input name sccode
const defWebCheckSecurity = defWebSite + "chkSecurity";

// TODO User name & Password for Login website
const defUser = "UserName";
const defPwd = "Password";
const defScode = "ReCaptcha";

const main = request.get(defWebSiteMain, (error, res, body) => {
    if (error) {
        return console.error("upload failed:", error);
    }

    console.log(!!!body, res.statusCode);
    if (res.statusCode === 200 && !!!body === false) {
        console.log("Index website");
        console.log("status", res.statusCode, res.statusMessage);
    } else {
        console.log("Go To page login");
        autoLogin();
    }
}).on('error', (error) => {
    return console.error('error', error);
});


const autoLogin = () => {
    console.clear()
    console.log('get function auto login');

    const getDomPageLogin = () => {
        const j = request.jar();
        request.get({defWebLogin, jar:j}, (error, res, body) => {
            /* const cookies = j.getCookie(defWebLogin);
            console.log(cookies);
            return false; */

            // if (error) throw new Error('error', error);

            if (res.statusCode === 200) {
                // console.log('Dom Page Login Status : ', res.statusCode, res.statusMessage);

                const $ = cheerio.load(body);
                let uri = defWebSite + $('form').attr('action');
                let captchaCode = $('.input-group-addon').text().trim();
                let _token_all = res.headers['set-cookie'][0];
                let _token = _token_all.split(';')[0].split('=');


                /* let data = {
                    'usr':defUser,
                    'pwd':defPwd,
                    'CaptchaCode':captchaCode,
                    '__cfduid':_token_all[1]
                } */

                let data = {
                    'url': uri,
                    'headers': {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        // 'access-control-allow-origin': '*',
                        'Cookie': res.headers['set-cookie'],
                    },
                    formData: {
                        'usr': defUser,
                        'pwd': defPwd,
                        'CaptchaCode': captchaCode,
                        // '__cfduid': _tokenValue
                    }
                };
                console.log(data)

                // TODO send value to login
                request.post(data/* {
                    url: uri,
                    form: data /* , headers:headers 
                } */, function (error, res, body) {
                    // console.log('send value : ' + body);
                    // TODO get page \/security
                    request.get(defWebsecurity, function (error, res, body) {
                        if(body == ""){
                            console.log('error');
                            return false;
                        }
                        console.log('security ' + body);
                    });
                }).on('error', function (error) {
                    console.log(error);
                    return false;
                });

                return false;
            } else {
                console.clear();
                console.log('Get Dom page login fail : ', res.statusCode, res.statusMessage);
                return false;
            }

        }).on('error', (error) => {
            return console.log('error', error);
        });
    }

    console.log(getDomPageLogin());

};

main;
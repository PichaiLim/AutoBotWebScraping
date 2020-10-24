// TODO include plugin
const request = require('request');
const cheerio = require('cheerio');

request = request.defaults({
    jar: true
});

// TODO Default link website
const defWebSite = "URL Address";
const defWebSiteMain = defWebSite + 'main';
const defWebLogin = defWebSite + "login";
const defWebsecurity = defWebSite + 'security'; // input name sccode
const defWebCheckSecurity = defWebSite + 'chkSecurity';

// TODO User name & Password for Login website
const defUser = "UserName";
const defPwd = "Password";
const defScode = "ReCaptcha";



// TODO Main function --> Get start open website `index or login`
request.get(defWebSite, (error, response, html) => {
    // console.log(response);
    // const $ = cheerio.load(html);
    // console.log($.html());
    // return;
    const item = new Array();
    let _token = response.headers['set-cookie'];

    let _token__cfduid = _token[0].split(';')[0].split('=');
    item.push({
        '_token_all': _token[0],
        '_token_name': _token__cfduid[0],
        '_token_value': _token__cfduid[1]
    })

    if (!error && response.statusCode == 200) {
        // console.log(html);
        const $ = cheerio.load(html);
        let getForm = $('form').attr('action');
        let scode = $('.input-group-addon').text().trim();

        item.push({
            'getFormAction': getForm,
            'scode': scode
        })

        $('form div input').each((i, el) => {
            let item_el = $(el).attr('name');
            item.push(item_el);
        });

        console.info('>>>>>>>>> Get website success <<<<<<< \r\n');
        // console.log(item[0]._tokenValue);
        $("input[name='usr']").val(defUser);
        $("input[name='pwd']").val(defPwd);
        $("input[name='CaptchaCode']").val(item[0]._tokenValue);
        
        // $("button[type='submit']").click(function(){
        //     console('click submit form login');
        // });
        getWevPageSecurity();

        // TODO request function autoLogin(Param Object)
        // autoLogin(item);

    } else {
        console.error('>>>>>>> Error is : ', error);
        return;
    }
    // console.log('item', JSON.stringify(item));

});


function autoLogin(_input) {
    console.clear();

    console.info('value request is: ', _input, '\r\n');

    const _token = _input[0];
    let _tokenValue = _token._token_value;
    let uri = defWebSite + _input[1].getFormAction;
    let CaptchaCode = _input[1].scode
    // console.log(_token);

    var options = {
        'method': 'POST',
        'url': uri,
        /* 'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'access-control-allow-origin': '*',
            'set-cookie': [
                `${_token._token_all}`,
                `captcha=${CaptchaCode}`
            ],
        }, */
        formData: {
            'usr': defUser,
            'pwd': defPwd,
            'CaptchaCode': CaptchaCode,
            // '__cfduid': _tokenValue
        }
    };

    // console.log('\r\n options data : ', options, '\r\n');

    // TODO Send data to `Auto Login`
    request(options, function (error, response, html) {
        if (error) throw new Error(error);        

        console.log('>>>>> LOGIN : Response status :>_ ', response.statusCode, '\r\n');

        if (response.statusCode == 200) {
            console.info('>>>> Login Success \r\n');
            getWevPageSecurity()
        } else {
            console.error('<<<<<< Login Fail \r\n');
            return
        }

        // const $ = cheerio.load(html);
        // console.log($.html())
    });
}

function getWevPageSecurity() {
    request.get(defWebsecurity, (error, response, html) => {
        console.clear();
        console.log(error, response);
        // const $ = cheerio.load(html);
        // console.log(!!!html);

    });
}
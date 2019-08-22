const eng = require('./langs/eng.json');

const data = {
    cn: require('./langs/cn.json'),
    fra: require('./langs/fra.json'),
    ger: require('./langs/ger.json'),
    kor: require('./langs/kor.json'),
    rus: require('./langs/rus.json'),
    spa: require('./langs/spa.json')
}

// COMPARE EVERYTHING
function check(lang) {

    // COMPARE TO ENG
    Object.keys(eng).forEach(key => {
        if (data[lang][key] === undefined) {
            console.log(key + ' missing in ' + lang)
        }
    })

    // COMPARE WITH LANG
    Object.keys(data[lang]).forEach(key => {
        if (eng[key] === undefined) {
            console.log(key + ' missing in ENG')
        }
    })
}

// LOOP THROUGH LANGS
Object.keys(data).forEach(lang => {
    check(lang);
})
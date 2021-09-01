// 格式化语言代号
export const formatLangId = (langId) => {
    let netLang = langId.toLowerCase().replace('_', '-')
    switch (netLang) {
        case 'zh':
            netLang = 'zh-cn'
            break;
        case 'en':
            netLang = 'en-us'
            break;
        case 'ja':
            netLang = 'ja-jp';
            break;
        case 'ru':
            netLang = 'ru-ru';
            break;
        case 'ko':
            netLang = 'ko-kr';
            break;
        case 'es':
            netLang = 'es-es';
            break;
        case 'de':
            netLang = 'de-de';
            break;
        default:
            break;
    }

    return netLang

}
var LOC = (function() {

    var constants = {
        LOC_CSV: '\u015ci\u0105gnij w formacie CSV',
        LOC_XLS: '\u015aaci\u0105gnij w formacie XLS',
        LOC_CLOSE: 'Zamknij',
        LOC_EXPORT_IMAGES: 'Rezultaty tej ankiety zawieraj\u0105 zdj\u0119cia. Czy do\u0142\u0105czyc je do wyników?',
        LOC_EXPORT_FORMAT: 'Wybierz format pliku z wynikami',
        LOC_YES: 'Tak',
        LOC_NO: 'Nie',
        LOC_RESULTID: 'ID Rezultatu',
        LOC_RESULTTITLE: 'Tytu\u0142',
        LOC_DATESENT: 'Data wys\u0142ania',
        LOC_USER: 'U\u017cytkownik',
        LOC_LOCATION: 'Lokalizacja',
        LOC_BACK_TO_SURVEY_LIST: 'Wróc do list ankiet',
        LOC_EXPORT_RESULTS: 'Exportuj rezultaty',
        LOC_EXPORT_ALL_RESULTS: 'Exportuj wszytkie rezultaty',
        LOC_DOWNLOAD: '\u015aci\u0105gnij',
        LOC_UPLOAD: 'Za\u0142aduj',
        LOC_EDIT: 'Edytuj',
        LOC_DUPLICATE: 'Duplikuj',
        LOC_DELETE: 'Skasuj',
        LOC_SEND: 'Wy\u015blij',
        LOC_SURVEY_NAME: 'Nazwa ankiety',
        LOC_DATE_PUBLISHED: 'Data',
        LOC_PUBLISHER: 'Autor',
        LOC_RESULTS: 'Rezultaty',
        LOC_SURVEYID: 'ID ankiety',
        LOC_NEW_SURVEY: 'Nowa ankieta',
        LOC_CHECK: 'Zaznacz',
        LOC_NAME: 'IMI\u0118',
        LOC_PHONE: 'TEL. NUMER',
        LOC_EMAIL: 'E-MAIL',
        LOC_PERMISSION: 'UPRAWNIENIA',
        LOC_ALL: 'Widoczne',
        LOC_ALL_PAGES: 'Wszystkie',
        LOC_NONE: 'Odznacz',
        LOC_SURVEY_DELETE_CONFIRM: 'Czy napewno chcech usun\u0105\u0107 ankiet\u0119?',
        LOC_CHOOSE_SURVEY_UPLOAD: 'Wybierz plik ankiety do za\u0142adowania',
        LOC_SURVEY_UPLOAD: '\u0141aduj ankiet\u0119',
        LOC_SEND_FILE: 'Wy\u015blij',
        LOC_SEND_SURVEY: 'Wy\u015blij ankiet\u0119',
        LOC_DONE: 'Wy\u015blij',
        LOC_SEARCH: 'Szukaj...',
        LOC_USERNAME: 'Nazwa U\u017cytkownika',
        LOC_CONFIRM_DELETE: 'Kliknij tutaj aby potwierdzi\u0107 kasowanie',
        LOC_NEW_USER: 'Nowy U\u017cytkownik',
        LOC_GROUP: 'Grupy',
        LOC_USERS: 'U\u017cytkowników',
        LOC_NEW_GROUP: 'Nowa Grupa',
        LOC_FIRST_NAME: 'Imi\u0119',
        LOC_LAST_NAME: 'Nazwisko',
        LOC_PASSWORD: 'Has\u0142o',
        LOC_RETYPE_PASSWORD: 'Powtórz has\u0142o',
        LOC_PHONE_NUMBER_LONG: 'Numer telefonu',
        LOC_ADMIN: 'Administrator',
        LOC_FIELD_WORKER: 'Ankieter',
        LOC_OPERATOR: 'Koordynator',
        string: 'Tekstowe',
        'int': 'Liczba ca\u0142kowita',
        decimal: 'Liczba u\u0142amkowa',
        date: 'Data',
        'binary#image': 'Obraz',
        select: 'Wielokrotny wybów',
        select1: 'Jedna opcja',
        time: 'Czas',
        LOC_SAVESURVEY:'Zapisz ankiet\u0119',
        LOC_CANCEL: 'Anuluj',
        LOC_RESULT_LIST: 'Rezultaty',
        LOC_MAP_VIEW: 'Mapa',
        LOC_GRAPH_VIEW: 'Wykres',
        LOC_EXPORT_TO: 'Eksportuj',
        LOC_SEND_SMS: 'Wy\u015blij wiadomo\u015b\u0107',
        LOC_TO: 'Do',
        LOC_PHONE_NUMBER: 'Numer tel.',
        LOC_EXTERNAL_SERVICE: 'Serwis zew.',
        LOC_CANNOT_EDIT_SURVEY: 'Nie mo\u017cna edytować ankiety w trybie dostępności. Zduplikuj ankiete, żeby edytować.',
        LOC_SURVEY_LIST: 'Lista ankiet',
        LOC_USER_ADMIN: 'Narz\u0119dzia administracyjne',
        LOC_NEW_CATEGORY: 'Nowa categoria',
        LOC_NEW_QUESTION: 'Nowe pytanie',
        LOC_NEW_OPTION: 'Nowa opcja',
        LOC_SAVE_SURVEY : 'Czy chcesz zapisa\u0107 ankietę?',
        LOC_LENGTH : 'D\u0142ugość',
        LOC_MIN_RANGE: 'MIN. ZAKRES',
        LOC_MAX_RANGE: 'MAX. ZAKRES',
        LOC_DRAG_NEW_CATEGORY: 'Przeci\u0105gnij element aby doda\u0107 now\u0105 kategori\u0119',
        LOC_DRAG_NEW_QUESTION : 'Przeci\u0105gnij element aby doda\u0107 nowe pytanie',
        LOC_DROP_CATEGORY: 'UPU\u015a\u0106 TUTAJ ABY DODA\u0106 NOW\u0104 KATEGORI\u0118',
        LOC_DROP_QUESTION: 'UPU\u015a\u0106 TUTAJ ABY DODA\u0106 NOWE PYTANIE',
        LOC_WARN_DELETE_OPTION : 'Pytanie musi mie\u0107 przynajmniej jedn\u0105 opcj\u0119',
        LOC_RESULT_DELETE_CONFIRM: 'Czy napewno chcesz usun\u0105\u0107 rezultat?',
        LOC_MSG_PASSWORD_NOT_MATCH: 'Podane has\u0142a nie pasuj\u0105 do siebie',
        LOC_MSG_SHORT_NUMBER: 'Numer telefonu jest zbyt krótki'
    };

    return {
        get: function(name) {
            return constants[name];
        }
    };
})();


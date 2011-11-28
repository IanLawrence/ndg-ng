var LOC = (function() {

    var constants = {
        LOC_CSV: 'Download in CSV format',
        LOC_XLS: 'Download in XLS format',
        LOC_CLOSE: 'Close',
        LOC_EXPORT_IMAGES: 'The survey you want to export has images in its results. Do you want to export the images as well?',
        LOC_EXPORT_FORMAT: 'Please, select below the file format to export results.',
        LOC_YES: 'Yes',
        LOC_NO: 'No',
        LOC_RESULTID: 'Result Id',
        LOC_RESULTTITLE: 'Result Title',
        LOC_DATESENT: 'Date Sent',
        LOC_USER: 'User',
        LOC_LOCATION: 'Location',
        LOC_BACK_TO_SURVEY_LIST: 'Back To SurveyList',
        LOC_EXPORT_RESULTS: 'Export Results',
        LOC_EXPORT_ALL_RESULTS: 'Export All Results',
        LOC_DOWNLOAD: 'Download',
        LOC_UPLOAD: 'Upload',
        LOC_EDIT: 'Edit',
        LOC_DUPLICATE: 'Duplicate',
        LOC_DELETE: 'Delete',
        LOC_SEND: 'Send',
        LOC_SURVEY_NAME: 'Survey Name',
        LOC_DATE_PUBLISHED: 'Date',
        LOC_PUBLISHER: 'Publisher',
        LOC_RESULTS: 'Results',
        LOC_SURVEYID: 'SurveyId',
        LOC_NEW_SURVEY: 'New Survey',
        LOC_CHECK: 'Check',
        LOC_NAME: 'Name',
        LOC_PHONE: 'Phone',
        LOC_EMAIL: 'E-mail',
        LOC_PERMISSION: 'Permission',
        LOC_ALL: 'All',
        LOC_ALL_PAGES: 'All Pages',
        LOC_NONE: 'None',
        LOC_SURVEY_DELETE_CONFIRM: 'Are you sure you want to delete survey?',
        LOC_CHOOSE_SURVEY_UPLOAD: 'Choose a survey to upload',
        LOC_SURVEY_UPLOAD: 'Survey upload',
        LOC_SEND_FILE: 'Send File',
        LOC_SEND_SURVEY: 'Send Survey',
        LOC_DONE: 'Done',
        LOC_SEARCH: 'Search...',
        LOC_USERNAME: 'Username',
        LOC_CONFIRM_DELETE: 'Deleting user will remove all related surveys and results ! Click to continue',
        LOC_NEW_USER: 'New User',
        LOC_GROUP: 'Group',
        LOC_USERS: 'User(s)',
        LOC_NEW_GROUP: 'New Group',
        string: 'Descriptive',
        'int': 'Integer',
        decimal: 'Decimal',
        date: 'Date',
        'binary#image': 'Image',
        select: 'Multiple Choice',
        select1: 'Exclusive Choice',
        time: 'Time',
        LOC_SAVESURVEY:'Save survey',
        LOC_CANCEL: 'Cancel',
        LOC_RESULT_LIST: 'Result List',
        LOC_MAP_VIEW: 'Map View',
        LOC_EXPORT_TO: 'Export To',
        LOC_SEND_SMS: 'Send SMS',
        LOC_TO: 'To',
        LOC_PHONE_NUMBER: 'Phone no.',
        LOC_EXTERNAL_SERVICE: 'External Service',
        LOC_CANNOT_EDIT_SURVEY: 'Can not edit survey. Survey is now available. Duplicate and then edit.',
        LOC_SURVEY_LIST: 'Survey List',
        LOC_USER_ADMIN: 'User Admin',
        LOC_NEW_CATEGORY: 'New category',
        LOC_NEW_QUESTION: 'New question',
        LOC_NEW_OPTION: 'New option',
        LOC_SAVE_SURVEY : 'Do you want to save survey?',
        LOC_LENGTH : 'LENGTH',
        LOC_MIN_RANGE: 'MIN.RANGE',
        LOC_MAX_RANGE: 'MAX.RANGE'

    };

    return {
        get: function(name) {
            return constants[name];
        }
    };
})();


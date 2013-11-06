/*
 * File encapsulates action related to Export Results
 *
 **/


var ExportResults = function() {

    var isAllResults;
    var surveyId;
    var resultList;
    var fileType;
    var searchedFor;
    var searchBy;



    function exportAllResults(currentSurveyId, fileType) {
        isAllResults = true;
        surveyId = currentSurveyId;
        drawDialog(fileType);
    }

     function exportAllSearchResults(currentSurveyId, fileType, searchedFor, searchBy) {
        isAllResults = true;
        surveyId = currentSurveyId;
        searchedFor = searchedFor;
        searchBy = searchBy;
        drawDialog(fileType,searchedFor,searchBy);
    }

    function exportResults(currentSurveyId, selectedResults, fileType, searchedFor, searchBy) {
        surveyId = currentSurveyId
        resultList = selectedResults;
        isAllResults = false;
        drawDialog(fileType);
    }

    function exportAllToKML(currentSurveyId) {
        surveyId = currentSurveyId;

        exportDialog.dialog( "open" );
        $('#exportResults-step_1').empty();
        $('#exportResults-step_2').empty();
        $('#exportResults-step_3').empty();

        $('#exportResults-step_2').empty();
        $('#exportResults-step_3').append( '<img src="images/POPUP_ICON_LOADING.gif" />');
        $('#exportResults-step_3').append( '<b>Exporting survey results to' + ' KML' + ' file...</>' );

        window.location.href = "service/allToKML?surveyId=" + surveyId;
        exportDialog.dialog("close");
    }

    function exportToKML(currentSurveyId, selectedResults) {
        surveyId = currentSurveyId;
        resultList = selectedResults;

        exportDialog.dialog( "open" );
        $('#exportResults-step_1').empty();
        $('#exportResults-step_2').empty();
        $('#exportResults-step_3').empty();

        $('#exportResults-step_2').empty();
        $('#exportResults-step_3').append( '<img src="images/POPUP_ICON_LOADING.gif" />');
        $('#exportResults-step_3').append( '<b>Exporting survey results to' + ' KML' + ' file...</>' );

        window.location.href = 'service/selectedToKML?surveyId=' + surveyId + '&resultIDs=' + resultList.join(',');
        exportDialog.dialog("close");
    }


    function drawDialog(fileType,searchedFor,searchBy) {
        
        exportDialog.dialog({title: LOC.get('LOC_EXPORT_RESULTS'),
                              open: function(){
                              $('.ui-widget-overlay').hide().fadeIn();},
                              show: 'fade',
                              hide: 'fade'});
        exportDialog.dialog( "open" );
        $('#exportResults-step_1').empty();
        $('#exportResults-step_2').empty();
        $('#exportResults-step_3').empty();

        if (fileType == "xls"){
                    exportXLSResults(searchedFor,searchBy);
                              }
        else if (fileType == "csv"){
                    exportCSVResults(searchedFor,searchBy);  
                                  }
        else{
                                alert("file type not supported");
            }
                   
                            }

    function exportCSVResults(searchedFor,searchBy) {
        var getJSONQueryCSV =$.getJSON( 'service/surveyHasImages',
                   { 'surveyId': surveyId },
                   function(result) { proceedExportResults( ".CSV", result.hasImages,searchedFor,searchBy); } );
        getJSONQueryCSV.error(Utils.redirectIfUnauthorized);
    }

    function exportXLSResults(searchedFor,searchBy) {
        var getJSONQuery = $.getJSON( 'service/surveyHasImages',
                   { 'surveyId': surveyId },
                   function(result) { proceedExportResults( ".XLS", result.hasImages, searchedFor,searchBy); } );
        getJSONQuery.error(Utils.redirectIfUnauthorized);
    }

    function proceedExportResults(fileFormat, hasImages, searchedFor, searchBy) {
        $('#exportResults-step_1').empty();
        if ( hasImages ) {
            $('#exportResults-step_2').append( '<div class="exportImagesQuery">'
                                             + '<span>'
                                             + LOC.get('LOC_EXPORT_IMAGES')
                                             + '</span>'
                                             + '</div>' );
            $('#exportResults-step_2').append( '<div class=".exportResultsButtons">'
                                             + '<span id="buttonYES" class="large button blue"></span>'
                                             + '<span id="buttonNO" class="large button blue"></span>'
                                             + '</div>' );

            $('#buttonYES').text( LOC.get('LOC_YES') );
            $('#buttonNO').text( LOC.get('LOC_NO') );
            $('#buttonYES').click( function(i) { includeImages( fileFormat,i, searchedFor, searchBy ) } );
            $('#buttonNO').click( function(i) { includeImages( fileFormat, i, searchedFor, searchBy ) } );
        } else {
            getFile( fileFormat, false, searchedFor, searchBy );
        }
    }

    function includeImages(fileFormat,i, searchedFor, searchBy) {
        getFile( fileFormat, (i.currentTarget.id == "buttonYES"), searchedFor, searchBy );
    }

    function getFile( fileFormat ,isWithImages, searchedFor,searchBy ) {
        $('#exportResults-step_2').empty();
        $('#exportResults-step_3').append( '<img src="images/POPUP_ICON_LOADING.gif" />');
        $('#exportResults-step_3').append( '<b>Exporting survey results to' + fileFormat + ' file...</>' );

        if( isAllResults && searchedFor ) {
            window.location.href = "service/prepare?surveyId=" + surveyId + "&fileFormat=" + fileFormat + "&searchField=" + searchBy + "&searchText=" + searchedFor + "&exportWithImages=" + isWithImages;//'exportWithImages': false//TODO handle additional question
        }else if( isAllResults ) {
            window.location.href = "service/prepare?surveyId=" + surveyId + "&fileFormat=" + fileFormat + "&exportWithImages=" + isWithImages;
        }else if( !isAllResults && searchedFor ) {
            window.location.href = "service/prepareselected?ids=" + resultList.join(',') + "&fileFormat=" + fileFormat + "&exportWithImages=" + isWithImages;    
        } else {
            window.location.href = "service/prepareselected?ids=" + resultList.join(',') + "&fileFormat=" + fileFormat + "&exportWithImages=" + isWithImages;//'exportWithImages': false//TODO handle additional question
        }
        exportDialog.dialog("close");
    }

    return { exportAllResults : function(surveyId, fileType) {exportAllResults(surveyId, fileType);},
             exportAllSearchResults : function(surveyId, fileType, searchedFor, searchBy) {exportAllSearchResults(surveyId, fileType, searchedFor, searchBy);},
             exportResults : function( surveyId, selectedResults, fileType, searchedFor, searchBy ) {exportResults(surveyId,selectedResults,fileType, searchedFor, searchBy);},
             exportToKML : function(surveyId, selectedResults) {exportToKML(surveyId,selectedResults);},
             exportAllToKML : function(surveyId) {exportAllToKML(surveyId);}
    };
}();

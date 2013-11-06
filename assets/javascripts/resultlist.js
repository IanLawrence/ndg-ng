/*
* File encapsulates action related to Result List view
 *
 **/

var ResultList = function() {

    var currentSurveyId;
    var allResultSelected = false;
    var selectedUser = false;
    var resultTitle = false;
    var selectedResults = new Array();
    var searchLabels;
    var searchIds;
    var searchDbFields = ["title", "latitude", "dateSent", "ndgUser.username"];
    var searchBy = "title";

    return {showResultList : function(i) {showResultList(i);},
            selectAllResults : function(){selectAllResults();},
            selectAllVisibleResults : function() {selectAllVisibleResults();},
            unselectAllResults : function(){unselectAllResults();},
            fillWithData: function(i, item) {fillWithData(i, item);},
            loadingFinished: function() {loadingFinished();},
            searchFieldChange: function(event){searchFieldChange(event);},
            getSearchBy: function() {return searchBy;},
            prepareLayout: function(tableHtml){prepareLayout(tableHtml);},
            exportResults: function(){exportResults();},
            exportToCSV: function(){exportToCSV();},
            exportToKML: function(){exportToKML();},
            additionalAjaxParams: function() {return additionalAjaxParams();},
            showGraphing: function(){showGraphing();},
            showMap: function(){showMap();},
            showPreview: function(){showPreview();}
    };

    function backToSurveyList() {
        SurveyList.showSurveyList();
    }

    function showGraphing() {
        if( allResultSelected ) {
            Graphing.graphAllResults( currentSurveyId );
        } else if(selectedResults.length) {
            Graphing.graphResults( currentSurveyId, selectedResults );
        } else {
            alert("No results selected");
        }
    }

    function showMap() {
        if( allResultSelected ) {
            Mapping.mapAllResults( currentSurveyId );
        } else if(selectedResults.length) {
            Mapping.mapResults( currentSurveyId, selectedResults );
        } else {
            alert("No results selected");
        }
    }

    function is_int(value){ 
            if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
               return true;
            } else { 
              return false;
            } 
                         }

    function showResultList(i) {
        selectedResults = new Array();

        if (is_int(i)){
            currentSurveyId = i
        } else {
           currentSurveyId = i.data;
        }

        var columnIds = ["checkboxColumnId", "executeSortByResultTitle", "executeSortByDateSent", "executeSortByUser", "executeSortByLocation", null];
        var columnTexts = [null, "LOC_RESULTTITLE", "LOC_DATESENT", "LOC_USER", "LOC_LOCATION"];
        var columnDbFields = [null, "title", "dateSent", "ndgUser.username", "latitude"];

        $('#container').height('715px');
        setupLeftColumn();      
        DynamicTable.showList(columnIds, columnTexts, columnDbFields, "results", ResultList);

                     
        var selectAllCheckbox = '<input type="checkbox" class="resultCheckboxClass" id="selectAllResults" />';
        $('#checkboxColumnId').append(selectAllCheckbox);
        $('#selectAllResults').bind( 'check uncheck', $(this), function(data){selectAllResultsClicked(data);} )

        $('#sectionTitle').text(LOC.get('LOC_RESULT_LIST'));
        $('#userManagement').text('');

        $('#searchComboBox').click( function(event) {createSearchList(event);});
        $('#searchComboText').text(LOC.get("LOC_RESULTTITLE"));

    }

    function additionalAjaxParams() {
        return { surveyId: currentSurveyId };
    }

    function prepareLayout(tableHtml) {
        $('#minimalist').empty();
        $('#searchComboBox').unbind('click');
        $('#minimalist').append(tableHtml);
        $('#minimalist').addClass('resultListTable');
        $('#content').addClass('resultListTable');
        $('#contentToolbar').addClass('resultListTable');
    }

    function setupLeftColumn() {
        $('#leftColumn').empty('resultListTable');
        $('#leftColumn').addClass('resultListTable');
        var columnContent = '<div class="resultListLeftMenu">';
        columnContent += '<span id ="backResults" class="buttonBack"></span>';
        columnContent += '<span id="mapView" class="buttonMapView resultListButton">';
        columnContent += LOC.get('LOC_MAP_VIEW');
        columnContent +=  '</span>';
        columnContent += '<span id="graphView" class="buttonGraphView resultListButton">';
        columnContent += LOC.get('LOC_GRAPH_VIEW');
        columnContent +=  '</span>';
        columnContent += '<span id="scheduledExport" class="buttonGraphView resultListButton">';
        columnContent += LOC.get('LOC_SCHEDULE_EXPORT');
        columnContent +=  '</span>';
        columnContent += '<div id="exportContextMenu" class="buttonExport resultListButton"><span>';
        columnContent += LOC.get('LOC_EXPORT_TO');
        columnContent +=  '</span></div>';
        columnContent +=  '</div>';

        $('#leftColumn').append( columnContent );
        $('#backResults').click( function(){backToSurveyList()} );
        $('#graphView').click( function(){ showGraphing()} );
        $('#mapView').click( function(){ showMap() } );
        $('#scheduledExport').click(function(){scheduleExport()});
        $('#exportContextMenu').click(function(event){ContextComboBox.showExportResultsMenu(event);});
    }

    function createSearchList(event) {
       searchLabels = [LOC.get("LOC_RESULTTITLE"), LOC.get("LOC_LOCATION"), LOC.get("LOC_DATESENT"), LOC.get("LOC_USER")];
       searchIds = [ "searchByTitle", "searchByLocation", "searchByDate", "searchByUser"];
       ContextComboBox.showSearchMenu(event, searchLabels, searchIds, ResultList);
    }

    function fillWithData(i, item) {
        var date = new Date(item.dateSent).toString("dd/MM/yyyy");

        if(item.dateSent == null) {
            date = "-";
        }

        $('#dynamicListTable').append( '<tr class="itemTextColor" id="dynamicRow' + i + '">'
                                    + '<td class="resultCheckboxPaddingClass"><input type="checkbox" class="resultCheckboxClass" id="resultCheckbox' + item.id + '"/></td>'
                                    + '<td>' + item.title + '</td>'
                                    + '<td>' + date + '</td>'
                                    + '<td>' + item.ndgUser.username + '</td>'
                                    + '<td>' + ( item.latitude!= null ? 'OK': 'NO GPS' ) + '</td>'
                                    + '<td class="resultListTable menubar" id="menu' + i + '" >'
                                    + '<span title="' + LOC.get('LOC_PREVIEW') + '"class="buttonPreview" id="buttonPreview" unselectable="on"></span>'
                                    + '<span title="' + LOC.get('LOC_DELETE') + '"class="buttonDelete" id="buttonDelete" unselectable="on"></span>'
                                    + '</td>'
                                    + '</tr>' );

        $( '#resultCheckbox' + item.id ).bind( 'check uncheck', item.id, function(i){resultCheckboxClicked(i);} )
        $( '#menu' + i +' #buttonDelete' ).click( item.id, function(i){onDeleteResultClicked(i);} );
        $( '#menu' + i +' #buttonPreview' ).click( item.id, function(i){getPreview(item.id);i.preventDefault();} );
    }
    
    function getPreview(id) {
          var contentUrl = 'service/toPreview?surveyId=' + currentSurveyId + '&resultIDs=' + id;
          var getJSONQuery = $.getJSON( contentUrl, function(data) { showPreview(data); });
          getJSONQuery.error(Utils.redirectIfUnauthorized);  
               }
               
               
    function rowBuilder(question, answer) {
      return '<tr>'
            + '<td style="overflow:hidden; width:400px;">'
                  + question
            + '</td>'
            + '<td style="overflow:hidden; width:400px;">'
                  + answer
            + '</td>'
            + '</tr>';
                           }
                           

    function showPreview(data){
          previewDialog.dialog( {title: LOC.get('LOC_PREVIEW')} );
          $('#buttonPreviewDone').text( LOC.get('LOC_DONE') );
          previewDialog.dialog({close: function(){$.unblockUI();$('#previewLayout').empty();}} )
          previewDialog.dialog("open");
          $.blockUI( {message: null} );
          $('#previewLayout').append('<table style="table-layout:fixed; width:800px"><tr><th>Question</th><th>Answer</th></tr>');
                                               
          
          for (i = 0; i < data.preview.length; i += 2) {  
            var question = data.preview[i]; 
            var answer = data.preview[i+1];
            if (typeof answer == 'object') {
                      answer = '<img src="'+ $('#previewLayout').data('url') + '/' + answer.file.name +'" width="300" height="200">';
                               }  
            $('#previewLayout').append(rowBuilder( question, answer));  
                                                       }                                     
                                                                                                                                   
          $('#previewLayout').append('</table>');

          $('#previewLayout').show();
          $('#buttonPreviewDone').click( function(){previewFinished();} );
                          }

    function previewFinished() {
          $('#previewLayout').empty();
          $('#previewLayout').hide();
          $('#buttonPreviewDone').unbind('click'); 
          previewDialog.dialog("close");
                              }

    function onDeleteResultClicked(event) {
        confirmDeleteDialog.dialog( {title: LOC.get('LOC_DELETE')} );
        $('#buttonDeleteYes').text( LOC.get('LOC_YES') );
        $('#buttonDeleteNo').text( LOC.get('LOC_NO') );
        $('#dialog-confirmDelete-query').text( LOC.get('LOC_RESULT_DELETE_CONFIRM') );
        confirmDeleteDialog.dialog("open");
        $("#buttonDeleteYes").click( event.data, function(event) {
             $.ajax({url: 'postResults/deleteResult',
                         data: {id: event.data},
                         error: function(data, textStatus, jqXHR){
                                 confirmDeleteDialog.dialog("close");
                                 if(!Utils.redirectIfUnauthorized(data, textStatus, jqXHR)){
                                     alert("error");
                         }},
                         success: function(data, textStatus, jqXHR){
                             confirmDeleteDialog.dialog("close");
                             DynamicTable.checkIfDeletingLast();
                             DynamicTable.refresh();
                         }
            });
            $("#buttonDeleteYes").unbind("click");
            $("#buttonDeleteNo").unbind("click");
        });
        $("#buttonDeleteNo").click( function() {
            $("#buttonDeleteYes").unbind("click");
            $("#buttonDeleteNo").unbind("click");
            confirmDeleteDialog.dialog("close");
        });
    }

    function resultCheckboxClicked(i) {
        if( i.currentTarget.checked ) {
            if ( -1 == jQuery.inArray( i.data, selectedResults ) ) {
                selectedResults.push( i.data );
            }
        } else {
            if ( -1 != jQuery.inArray( i.data, selectedResults ) ) {
                selectedResults.splice(jQuery.inArray( i.data, selectedResults ), 1 );
                if(allResultSelected) {
                    allResultSelected = false;
                    var checkboxSelectAllResults = $('#selectAllResults')[0];
                    checkboxSelectAllResults.checked = false;
                }
            }
        }
    }

    function selectAllResultsClicked(data) {
        if(data.currentTarget.checked) {
            selectAllResults();
        } else if(allResultSelected) {
            unselectAllResults();
        }
    }
    
     function scheduleExport() {
        if(hasAdminPermission == true){
          schedulerDialog.dialog( {title: LOC.get('LOC_SCHEDULE_EXPORT')} );
          $('#buttonschedulerDone').text( LOC.get('LOC_DONE') );
          schedulerDialog.dialog({close: function(){$.unblockUI();$('#schedulerLayout').empty();} })
          schedulerDialog.dialog("open");
          var elem = $('<div>' + LOC.get('LOC_SCHEDULE_DESC')
                        + '<table><tbody><tr><td>' + LOC.get('LOC_SCHEDULE_DATEFROM') + '</td>'
                        + '<td><input class="schedulerFrom" type="text" name="schedulerFrom" required />'
                        + '</td></tr>'
                        + '<tr><td>' + LOC.get('LOC_SCHEDULE_DATETO') + '</td>'
                        + '<td><input class="schedulerTo" type="text" name="schedulerTo" required />'
                        + '</td></tr></tbody></table>'
                        + '<table><tbody><tr><td>' + LOC.get('LOC_SCHEDULE_EMAILTO') + '</td>'
                        + '<td>&nbsp;&nbsp;&nbsp;&nbsp;<input class="email" type="text" name="email" placeholder="your@email.com" required />'
                        + '</td></tr></tbody></table>'
                        + '</div>'
                        );
          $( '#schedulerLayout' ).append( elem );
          
          
          $('.schedulerFrom').datepicker({
                        showOn: "button",
                        buttonImage: "images/Calendar-icon.png",
                        buttonImageOnly: true,
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'yy-mm-dd',
                        onClose: function(dateText, inst) {}
                                        }).dateEntry( {dateFormat: 'ymd-', spinnerImage: ''} );
                                        
          $('.schedulerTo').datepicker({
                        showOn: "button",
                        buttonImage: "images/Calendar-icon.png",
                        buttonImageOnly: true,
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'yy-mm-dd',
                        onClose: function(dateText, inst) {}
                                        }).dateEntry( {dateFormat: 'ymd-', spinnerImage: ''} );


        
          $('#schedulerLayout').show();
          
          
          $('#buttonschedulerDone').click( function(){      
                   var dateFrom = $('.schedulerFrom').val( );
                   var dateTo = $('.schedulerTo').val( );
                   var email = $('.email').val( );  
                   filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                   if (filter.test(email)) {
                        scheduleExporter(email, dateFrom, dateTo);
                        schedulerFinished();
                    }else{
                        return false;
                                           }

                                                     } );
        }else{
          alert("Admin permissions are needed to access this functionality")
        }
    }
    
    function schedulerFinished() {
          $('#schedulerLayout').empty();
          $('#schedulerLayout').hide();
          $('#buttonschedulerDone').unbind('click'); 
          schedulerDialog.dialog("close");
                              }
                              
    function scheduleExporter(email, dateFrom, dateTo){
               var contentUrl = 'service/toSchedule?surveyId=' + currentSurveyId +'&email=' + email + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&complete=false';
               var getJSONQuery = $.getJSON( contentUrl, function() {} );
               getJSONQuery.error(Utils.redirectIfUnauthorized);
                             }


    function exportResults() {
        var fileType = "xls";
        if ( allResultSelected && resultTitle ) {
            var searchedFor = $('#searchTextField').val();
            ExportResults.exportAllSearchResults( currentSurveyId, fileType, searchedFor, searchBy )
        }else if( allResultSelected && selectedUser) {
            var searchedFor = $('#searchTextField').val();
            ExportResults.exportAllSearchResults( currentSurveyId, fileType, searchedFor, searchBy );
        } else if ( allResultSelected   ) { 
            ExportResults.exportAllResults( currentSurveyId, fileType);
        }else if(selectedResults.length) {
            ExportResults.exportResults( currentSurveyId, selectedResults, fileType, searchedFor, searchBy );
        } else {
            alert("no results selected");
        }
    }

    function exportToCSV() {
        var fileType = "csv";
        if( allResultSelected ) {
            ExportResults.exportAllResults( currentSurveyId, fileType );
        } else if(selectedResults.length) {
            ExportResults.exportResults( currentSurveyId, selectedResults, fileType );
        } else {
            alert("no results selected");
        }
    }

    function exportToKML() {
        if( allResultSelected ) {
            ExportResults.exportAllToKML( currentSurveyId );
        } else if(selectedResults.length) {
            ExportResults.exportToKML( currentSurveyId, selectedResults );
        } else {
            alert("no results selected");
        }
    }

    function onButtonMouseDownHandler(source) {
        source.addClass('pushed');
        $(document).bind('mouseup.resultBar', function() {
            $('.pushed').removeClass('pushed');
            $('body').unbind('mouseup.resultBar');
            return false;});
        return false;
    }

    function selectAllVisibleResults() {
        var checkboxes = $(".resultCheckboxClass");

        $.each( checkboxes ,function( i, item ) {
            item.checked = true;
        });
    }

    function selectAllVisibleResults() {
        doSelectAllVisibleResults();
        allResultSelected = false;
    }

    function doSelectAllVisibleResults() {
        var checkboxes = $(".resultCheckboxClass");

        $.each( checkboxes ,function( i, item ) {
            item.checked = true;
        });
    }

    function selectAllResults() {
        selectAllVisibleResults();
        allResultSelected = true;
    }

    function unselectAllResults() {
        var checkboxes = $(".resultCheckboxClass");

        $.each( checkboxes ,function( i, item ) {
            item.checked = false;
        });
        allResultSelected = false;
    }

    function loadingFinished() {
         $('input:checkbox:not([safari])').checkbox({cls:'customCheckbox', empty:'images/empty.png'});
         if( allResultSelected ) {
            doSelectAllVisibleResults();
         }
    }

    function searchFieldChange(event) {
        selectedUser = false;
        resultTitle = false;
        var fieldId = event.currentTarget.id;
        var nameIndex = jQuery.inArray( fieldId, searchIds );
        $('#searchComboText').text(searchLabels[nameIndex]);
        searchBy = searchDbFields[nameIndex];
        if (searchBy == 'ndgUser.username'){
            selectedUser = true;
                                           }
         if (searchBy == 'title'){
            resultTitle  = true;
                                           }
                                           
        $('#searchTextField').val("");
    }
}();

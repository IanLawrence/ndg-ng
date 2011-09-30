
var Editor = function() {

    var surveyId;
    var surveyModel;

    var currentSelectionId;
    var questionPanel;

    return {
        newSurvey : function() {newSurvey();},
        createEditor : function(id) {createEditor(id);},
        addCategory : function(id) {addCategory(id);},
        addQuestion : function(id) {addQuestion(id);}
    };

    function newSurvey(){
        $.getJSON('/application/createSurvey', {'surveyName': 'New survey'},// TODO localize
                                                    function(data){
                                                        surveyId = data.survey.id;
                                                        createEditor(surveyId);
                                                        addCategory();
                                                    } );
    }

    function createEditor(id){
        surveyId = id;

        $('#sectionTitle').text('Survey Editor'); //TODO localize
        $('#userManagement').remove();

        $('#content').empty();

        $('#leftColumnContent' ).empty();
        $('#leftColumnContent' ).append(
             '<div class="leftMenuButtonBlock">'
            + '<span id="executeBackButton" class="leftMenuButton" />'
            + '</div>'
            + '<div class="leftMenuButtonBlock">'
            + '<span id="executeSave" class="leftMenuButton" />'
            + '</div>'
        );

        $('#content').append(
            '<div id="editor">'
            + '<h3 id="surveyHeader"><span id="surveyTitle"></span><span class="edit">Edit</span></h3>'
            + '<div id="editorMain">'
            + '<ul id="sortableList">'
            + '<div id="categories"></div>'
            + '</ul>'
            + '</div>'
            + '<div id="editorRight">'
            + '</div>'
            +'<div style="clear:both;"></div>'
            + '</div>'
            );

        fillEditor(surveyId);


        $( "#plusButton").unbind('mouseover');
        $( "#plusButton").mouseover( function(event) {SurveyListCombo.showEditorMenu(event);});
        $( "#executeBackButton" ).click( function(){onBackClicked();} );
        $( "#executeSave" ).click( function(){onSaveClicked();} );

        questionPanel = new QuestionPanel( function(label){ refreshCurrentQuestionLabel(label); });
        questionPanel.createQuestionPanel();

        $( "#categories" ).sortable( {delay: 50} ).disableSelection();
        $( "#surveyHeader span.edit" ).bind( 'click.edit', function(){onEditTitleClick();} );
    }

    function onEditTitleClick(){
        var oldTitle = $( "#surveyTitle" ).text();

        $( "#surveyTitle" ).replaceWith( '<input id="titleEdit" type="text"/>' );
        $( "#titleEdit" ).val( oldTitle );

        $( "#surveyHeader span.edit" ).text( "Save" );
        $( "#surveyHeader span.edit" ).unbind( 'click.edit' );
        $( "#surveyHeader span.edit" ).bind( 'click.save', function(e){onTitleSaveClicked(e);} );
    }

    function onTitleSaveClicked(){
        var editedVal = $( "#titleEdit" ).val();

        $( "#titleEdit" ).replaceWith( '<span id="surveyTitle">' + editedVal + '</span>' );
        $( "#surveyHeader span.edit" ).text( "Edit" ); //TODO localize
        $( "#surveyHeader span.edit" ).unbind( 'click.save' );

        $( "#surveyHeader span.edit" ).bind( 'click.edit', function(){onEditTitleClick();} );
        surveyModel.updateSurveyTitle( editedVal );

    }

    function onSaveClicked(){
        $.ajax(
        {
            type: "POST",
            url: "/saveSurvey",
            data: {surveyData : prepereSurveyJSON(), id : surveyId},
            success: function(msg){
               alert( "Success");
            },
            error: function(request,error) {
                alert("Failure" + error);
            }
        });
    }

    function prepereSurveyJSON(){
        var categoryList = [];
        var catElemList = $( "#categories" ).find(".listCategory");

        $.each(catElemList, function(i, item){
            var catName = $( '#' + item.id ).find('.categoryName');
            categoryList[i] = new Category(catName[0].text, i);
            categoryList[i].questionCollection = prepereQuestions(item);
        });

        return JSON.stringify(categoryList);
    }

    function prepereQuestions(catItem){
        var questionElemList = $( '#' + catItem.id ).find(".listItemQuestion");
        var questionList = [];
        $.each( questionElemList, function( i, item ){
            var questionLabel = $( '#' + item.id ).find('.questionText');
            questionList[i] = new Question(questionLabel[0].innerText, item.id);
        } );
        return questionList;
    }

    function onBackClicked(){
         $('#content').empty();
         SurveyList.showSurveyList();
    }

    function addCategory(){
        var numRand = Math.floor( Math.random() * 10000 ); //TODO maybe exist better way to get rundom id
        appendCategoryElement( parseInt( numRand ), 'New Category' ); //TODO localize
    }

    function addQuestion(){
        var children = $( "#categories" ).find(".listCategory");
        $( "#combobox" ).empty();

        $.each(children, function(i, item){
            var catName = $( '#' + item.id ).find('.categoryName');
            var listId = $( '#' + item.id ).find('.listQuestion');
            $( "#combobox" ).append('<option value="'+ listId[0].id +'">' + catName[0].text + '</option>'); //TODO label
        });

        $( '#confirmCategoryButton' ).empty();
        $( '#confirmCategoryButton' ).append( '<button id="confirmCategory">Confirm</button>' );
        $( '#confirmCategory').click( function(){onConfirmCategory();} );
        switchCategoryDialog.dialog( "open" );
    }

    function onConfirmCategory(){
        var selectElem = $( "#combobox" ).val();
        var numRand = Math.floor(Math.random()*10000); //TODO maybe exist better way to get rundom id
        appendQuestionElement(numRand, "New question", selectElem); //TODO localize

        switchCategoryDialog.dialog("close");
    }

    function fillEditor(id){
        $.getJSON('/application/getSurvey', {'surveyId': parseInt(id)},
                                                    function(data){
                                                        surveyModel = new SurveyModel(data.survey);
                                                        fillCategoryList();
                                                    } );
    }

    function fillCategoryList(){
        $( '#surveyTitle' ).text( surveyModel.getSurvey().title );
        $.each( surveyModel.getSurvey().categoryCollection, function( i, item) {
            appendCategoryElement( item.id, item.label );
            fillQuestions( item.questionCollection, item.id );
        });
    }

    function appendCategoryElement(id, value){
        var categoryId = "category" + id;
        var deleteId = "executeDeleteCategory" + id;
        var listId = 'questions' + id;

        //TODO localize
        $("#categories").append(
             '<li id="'+ categoryId + '" class="ui-state-default listCategory">'
            + '<h3>'
            + '<span class="expandIcon"></span>'
            + '<span class="categoryName">' + value + '</span><span class="edit">Edit</span>'
            + '<span id="'+ deleteId +'" class="deleteElement" title="' + LOC.get('LOC_DELETE') + '"/>'
            + '<div style="clear:both;"></div>'
            + '</h3>'
            + '<ul id="' + listId +'" class="listQuestion"></ul>'
            + '</li>');

        $( '#' + deleteId).click( categoryId, function(i){onDeleteElementClicked(i);} );

        setListParams(categoryId);
        $( '#' + categoryId + ' .listQuestion' ).hide();
    }

    function setListParams(categoryId){
        var listRef = '#' + categoryId + ' .listQuestion';
        var catHeaderRef = "#" + categoryId + " h3";
        var expandIconElem = "#" + categoryId + ' span.expandIcon';

        $( "#" + categoryId + " span.edit" ).bind('click.edit',categoryId, function(e){onCategoryEditClicked(e);});

        //allows sort question
        $( listRef ).sortable({
            connectWith: " .listQuestion",
            delay: 50
        }).disableSelection();

        //hide and show questions in category
        $( catHeaderRef ).bind('click', function(){
            $( listRef ).toggle('fast');

            if($(expandIconElem).hasClass('expanded')){
                $(expandIconElem).removeClass('expanded');
            }else{
                $(expandIconElem).addClass('expanded');
            }
            return false;
        });

        //allows droping question on category
        $( catHeaderRef).droppable({
            accept: ".listQuestion li",
            drop: function( event, ui ) {
                var $item = $( this ).parent();
                var $list = $item.find( ".listQuestion" );

                ui.draggable.hide( "slow", function() {
                    $( this ).appendTo( $list ).show( "fast" );
                });
            }
        });
    }

    function onCategoryEditClicked(event){
        var categoryId = event.data;
        var catLabel = $("#" + categoryId + " span.categoryName").text();

        $( "#" + categoryId + " span.categoryName" ).replaceWith( '<input class="labelEdit" type="text"/>' );
        $( "#" + categoryId + " input.labelEdit" ).val( catLabel );

        $( "#" + categoryId + " span.edit" ).text( "Save" );
        $( "#" + categoryId + " span.edit" ).unbind('click.edit');
        $( "#" + categoryId + " span.edit" ).bind('click.save',categoryId, function(e){onCategorySaveClicked(e);});

        $( "#" + categoryId + " h3").unbind('click');
    }

    function fillQuestions(data, categoryId ){
        var listId = 'questions' + categoryId;
        $.each(data, function(i,item) {
            appendQuestionElement(item.id, item.label, listId);
        });
    }

    function appendQuestionElement(id, value, listId){
        var deleteId = 'executeDeleteQuestion' + id;
        var questionId = 'question' + id;
        $("#" + listId).append(
                      '<li id="' + questionId +'"class="ui-state-default listItemQuestion"><div>'
                    + '<div class="questionText"> <span> ' + value + '</span></div>'
                    + '<div class="deleteElement">'
                    + '<span id="'+ deleteId +'" class="deleteElement" title="' + LOC.get('LOC_DELETE') + '"/>'
                    + '</div>'
                    + '<div style="clear:both;"></div>'
                    + '</li>');

        $('#'+ deleteId).click( questionId, function(i){onDeleteElementClicked(i);} );
        $('#'+ questionId).click( questionId, function(i){onQuestionClicked(i);} );
    }

    function onCategorySaveClicked(event){
        var categoryId = event.data;
        var editedVal = $("#" + categoryId + " input.labelEdit").val();

        $( "#" + categoryId + " input.labelEdit").replaceWith( '<span class="categoryName">' + editedVal + '</span>' );
        $( "#" + categoryId + " span.edit" ).text( "Edit" ); //TODO localize
        $( "#" + categoryId + " span.edit" ).unbind('click.save');

        surveyModel.updateCategory( categoryId.replace( "category", "" ), editedVal );

        setListParams(categoryId);
        event.stopPropagation();
    }

    function removePreviousSelction(){
        $( '#' + currentSelectionId ).removeClass( 'elementSelected' );
    }

    function onDeleteElementClicked(itemId){
        $('#' + itemId.data).empty().remove();
    }

    function onQuestionClicked(questionId){
        removePreviousSelction();
        currentSelectionId = questionId.data;

        var categoryElemId = $( '#' +  currentSelectionId ).parents( '.listCategory' )[0].id;
        $( '#' + currentSelectionId ).addClass( 'elementSelected' );

        var qId = questionId.data.replace( "question", "");
        var cId = categoryElemId.replace( "category", "");
        var currenQuestion = surveyModel.getQuestion(cId, qId);

        questionPanel.fillRightPanel( currenQuestion );
    }

    function refreshCurrentQuestionLabel( label ){
        $( '#' + currentSelectionId + ' .questionText span' ).text( label );
    }

}();

/**
 * Created by veronique.gendner on 10/05/2019
 * https://www.e-tissage.net
 * project initialy developped for the http://www.constances.fr infrastructure
 */

/***
 * Form Automatisms And Controls (FAC)
 * stemValue class controls display and required,in element with correspondind data-StemValueId
 * a scope element can be controled by several stemValues separated a space in the data-StemValueId attribute
 * form needs to have an id
 * example : http://v2belleville.eu/formTestFAC.php
 * documentation : https://github.com/v2belleville/fac/blob/master/README.md
 */

if (window.verbose === undefined) window.verbose =true ;
if (window.lang === undefined) window.lang="fr" ;

var requiredColor = "rgba(175, 55, 250,0.6)";

function trad(msg) {
    var res = msg;
    switch (window.lang) {
        case "fr":
            switch (msg) {
                case "Please fill in at least one element" : res="Merci de renseigner au moins un élément";break;
                case "Please fill in (unconditionally required) " : res="Merci de renseigner (obligatoire sans condition) ";break;
                case "Please fill in " : res="Merci de renseigner ";break;
            }
    }
    return res
}

function updateVerticalScroll(element) {
    if ( window.verticalScroll === undefined) window.verticalScroll = element.offset().top;
    if (element.offset().top < window.verticalScroll) window.verticalScroll = element.offset().top;
}

/*** for formAutomatism and formControl debug

 use insertsToggleDebugDisplayCheckboxes(vertical,verticalValue,horiz,horizValue ) to insert required html that inserts checkboses to activate debug display

 can be dynamically added if url contains "&debug=" with the following line after dormAutoAndControl.js insertion :
     <script>if ("<?= isset($_GET['debug']) ?>") insertsToggleDebugDisplayCheckboxes("top","165px","right","480px"); </script>

 requires all (input, select, textarea) fields to be inside label tag
 */

/***
 * inserts toggle debug display block
 * param set debug bloc position :
 * @param vertical top / bottom
 * @param verticalValue
 * @param horiz right / left
 * @param horizValue
 */
function insertsToggleDebugDisplayCheckboxes(vertical,verticalValue,horiz,horizValue ) {

    $( "form" ).append( "<div id='fac-debug-bloc'></div>" );
    $("#fac-debug-bloc").css(vertical,verticalValue);
    $("#fac-debug-bloc").css(horiz,horizValue);
    $("#fac-debug-bloc").addClass("padding-tiny");
    $("#fac-debug-bloc").css("background-color","#fcf5e5");
    $("#fac-debug-bloc" ).append( "<label id='fac-debug'><input type='checkbox' /> debug display </label>" );
    $("#fac-debug-bloc").css("position","fixed");
    $("#fac-debug-bloc").css("max-width","20em");
    $("#fac-debug-bloc" ).append( "<div id='fac-required-bloc' style='margin-left:30px'></div>" );
    $("#fac-required-bloc" ).append( "<div id='fac-required' style='margin-top:10px'><span style='color:rgb(175, 55, 250)'>required</span> <span class='padding-tiny' style='background-color:"+requiredColor+"'>inconditionnel</span></div>" );
    $("#fac-required-bloc" ).append( "<div id='fac-required-conditionned'><span class='padding-tiny' style='background-color:rgba(175, 55, 250,0.2)'>conditionné</span> par <span class='text-red'>stemValue</span></div>" );
    $("#fac-required-bloc" ).append( "<div id='fac-required-in-element'><span class='padding-tiny' style='border:solid 2px "+requiredColor+"'>in element</span></span></div>" );
    $("#fac-required-conditionned, #fac-required-in-element").css("margin-left","4em");
    $("#fac-required-conditionned, #fac-required-in-element").css("margin-top","10px");
    $("#fac-debug-bloc").append( "<label id='fac-names' style='margin-top:10px'><input type='checkbox' /> display names </label>" );

    console.log("debug block displayed");
}

/***
 * displays formControl and formAutomatisms visualisations : stemValues, scopes, fac-required-in-element
 */
function showFacDebugDisplay() {
    if (window.verbose) console.log("debug display on");
    $(" td , .row").css("position","relative");

    $("label").each(function () {

        var id = $(this).find(".stemValue").attr("id");
        if (id !== undefined) {
            $(this).addClass("showStemValueId");
            $(this).attr('data-before', id);
        }
        $(".stemValue").css("color","red");
        $(".jq-default-value").css("color","blue");
        $("[data-stemValueId]").css("border","solid 2px green");
        $(".fac-required-in-element").css("border","solid 2px "+requiredColor);
        $("[required], [required] + span").css("background-color",requiredColor);
        $("[data-stemValueId] [required] , [data-stemValueId] [required] + span").css("background-color","rgba(175, 55, 250,0.2)");
    });
}
/***
 hides formControl and formAutomatisms visualisations : stemValues, scopes, fac-required-in-element
 */
function hideFacDebugDisplay() {

    $(".showStemValueId").each(function () {
        $(this).removeClass("showStemValueId");
        $(this).removeAttr("data-before")
    });
    $(".stemValue").css("color","inherit");
    $(".jq-default-value").css("color","inherit");
    $(".fac-required-in-element").css("border","none");
    $("[data-stemValueId]").css("border","none");
    $("[required], [required] + span").css("background-color","inherit");
    $("[data-stemValueId] [required] , [data-stemValueId] [required] + span").css("background-color","inherit");

    if (window.verbose) console.log("debug display off");
}
/***
displays field names (input,textarea,select)
 */
function showNames() {
    $(" td , .row").css("position","relative");
    $("label").each(function () {
        var name = $(this).find("input,textarea,select").attr("name");
        $(this).addClass("showNames");
        $(this).attr('data-before', name);
    });
    if (window.verbose) console.log("names display on");
}
/***
 hides field names (input,textarea,select)
 */
function hideNames() {
    $(".showNames").each(function () {
        $(this).removeClass("showNames");
        $(this).removeAttr("data-before");
    });
    if (window.verbose) console.log("names display off");
}

/***
 * display initialisation according to state of form content : displays or hides scopes if stemValue checked / selected or unchecked not selected
 * loads form Automatism
 */
function formControlsPageInit() {
    window.indentation ="";

    /* hides scopes of NON checked / NON selected stemValues when not disabled by no-hide class
       cache les scopes des stemValue NON cochée / NON selectionnées lorsqu'ils n'ont pas la class .no-hide */
    $("input.stemValue:not(:checked), select option.stemValue:not(:selected)").each(function() {
        var stemValueId=$(this).attr("id");
        $("[data-stemValueId~= "+stemValueId+" ]:not(.no-hide)").each(function () {
            if (noCommandingStemValueCheckedOrSelected($(this)))
                $(this).addClass("hidden");
            if ($(this).attr("id") !== undefined)
                var scopeLabel = $(this).attr("id");
            else
                var scopeLabel = "scope containing "+$(this).find("input").attr("name")+" (...)";
            if (window.verbose) console.log(stemValueId+" unchecked/non selected -> hidding "+scopeLabel)
        })
    });
    /* shows scopes of checked / selected stemValues
       affiche les scopes des stemValue cochées / selectionnées */
    $("input.stemValue:checked, select option.stemValue:selected").each(function() {
        var stemValueId=$(this).attr("id");
        $("[data-stemValueId~= "+stemValueId+" ]:not(.force-hide)").removeClass("hidden");
        if ($(this).attr("id") !== undefined)
            var scopeLabel = $(this).attr("id");
        else
            var scopeLabel = "scope containing "+$(this).find("input").attr("name")+" (...)";
        if (window.verbose) console.log(stemValueId+" checked / selected -> showing "+scopeLabel)
    });

    /* hides scopes with no stemValueId*/
    $("[data-stemValueId]:not(.no-hide)").each(function () {
        if ($(this).attr("data-stemValueId").match(/^[ ]*$/))
            $(this).addClass("hidden");
    })
    formAutomatisms();

    console.log("pageInit done");
}

/***
 *  returns true if NO stemValue commanding scope is checked / selected
 * @param scope
 * @returns {boolean}
 */
function noCommandingStemValueCheckedOrSelected(scope) { // vérifie qu'aucune stemValue commandant le scope n'est clickée / selectionnée
    var res = true;

    var dataStemValueIdArray = scope.attr("data-stemValueId").trim().split(' ');
    //console.log("dataStemValueIdArray "+ scope.attr("data-stemValueId")+dataStemValueIdArray.length);
    dataStemValueIdArray.forEach(function(stemValueIdToCheck) {
        if ($("#"+stemValueIdToCheck).is(":checked") || $("#"+stemValueIdToCheck).is(":selected")) {res = false;}
        if (window.verbose) console.log(window.indentation+stemValueIdToCheck+" checked/selected : "+$("#"+stemValueIdToCheck).is(":checked") || $("#"+stemValueIdToCheck).is(":selected"));
    });

    if (window.verbose) console.log(window.indentation+"= noCommandingStemValueCheckedOrSelected : "+ res)
    return res;
}
/***
 * initialize scope, due to triggerElement : supress values and hide (if no no-hide class and no other commanding stemValue checked / selected)
 * used by formAutomatism
 * recursively applied onto unchecked options (on checkbox stemValue uncheck, on radio and select other options)
 * @param triggerElement
 * @param scope
 */
function rinseScopes(triggerElement,scopes) {
    scopes.each(function() {
        var scope = $(this);
        if (scope.attr("id") !== undefined)
            var scopeLabel = scope.attr("id");
        else
            var scopeLabel = "scope containing " + scope.find("input").attr("name") + " (...)";
        if (window.verbose) console.log(window.indentation + "rinsing scope of " + triggerElement.attr("id") + " : " + scopeLabel);

        window.indentation += "    "; // for indented console log according to level of recursion

        var noCommandingStemValueCheckedOrSelectedVar = noCommandingStemValueCheckedOrSelected(scope);

        if (!scope.hasClass("noRinseScope") && noCommandingStemValueCheckedOrSelectedVar) {
            // radio and checkbox input -> uncheck
            scope.find("input:radio:checked, input:checkbox:checked").each(function () {
                // if ( $(this).closest("[data-stemValueId~= "+triggerElement.attr("id")+" ]").length ==0 && !$(this).is(triggerElement)) {
                // to deal with recursion and combination with upWardChecking, do not initialise input if in
                // nor when input is triggerElement
                if (window.verbose) console.log(window.indentation + "-> unchecking " + $(this).attr("name") + " " + $(this).attr("value"));

                $(this).prop('checked', false);
                // if unchecked option is stemValue, recursively rinse its scopes
                if ($(this).hasClass("stemValue")) {
                    var stemValueIdInterne = $(this).attr("id");
                    var scopesInterne = $("[data-stemValueId~= " + stemValueIdInterne + " ]");
                    var recursiveTriggerElement = $(this);
                    rinseScopes(recursiveTriggerElement, scopesInterne)
                }
                // }
            });

            // non button input and textarea -> suppresses value
            scope.find("input:not([type=radio], [type=checkbox]), textarea").each(function () {
                // if ($(this).parents(".noRinseScope").length == 0) {  && $(this).closest("[data-stemValueId~= "+triggerElement.attr("id")+" ]").length ==0
                if ($(this).val() !== "") {
                    if (window.verbose) console.log(window.indentation + "-> empting " + $(this).attr("name") + " " + $(this).val());
                    $(this).val("");
                }
                // }
            });
            // selects default option identified with jq-default-value class fixme only works the first time after page load
            scope.find("select option.jq-default-value").each(function () {
                //if ( $(this).closest("[data-stemValueId~= "+triggerElement.attr("id")+" ]").length ==0) {  // n'initialise pas les input qui sont dans le même scope que celui qui a été cliqué
                if (window.verbose) console.log(window.indentation + "-> selecting default value (.jq-default-value) " + $(this).closest("select").attr("name") + " " + $(this).attr("value"));
                $(this).attr('selected', 'selected');
            });
            // rinse scopes of select other stemValue options
            scope.find("select option.stemValue:not(:selected)").each(function () {
                var otherSelectOptionId = $(this).attr("id");
                var otherSelectOptionScopes = $("[data-stemValueId~= " + otherSelectOptionId + " ]");
                rinseScopes($(this),otherSelectOptionScopes)
            });
        }

        // hides scope if no no-hide class , no other commanding stemValue checked / selected , scope not already hidden
        // and clicked input is not inside scope (to deal with combination of automatic upWardChecking and downward recursion )
        if (triggerElement.attr("name") !== undefined)
            var triggerName = triggerElement.attr("name").replace("[", "\\[").replace("]", "\\]"); // unspecifies [] for arrays
        else
            var triggerName = triggerElement.closest("select").attr("name").replace("[", "\\[").replace("]", "\\]"); // unspecifies [] for arrays;

        if (noCommandingStemValueCheckedOrSelectedVar && !scope.hasClass("no-hide") && !scope.hasClass("hidden")
            && scope.find("[name=" + triggerName + "][value=" + triggerElement.attr("value") + "]").length == 0) {
            if (window.verbose) console.log(window.indentation + "-> hiding");
            scope.addClass("hidden");
        }

        window.indentation = window.indentation.substring(4);
    })
}
/***
 * returns true and displays an alert if no information is in the scope, returns false otherwise
 * checks radio and checkboxes, NON radio or checkboxes inputs, textareas todo select
 * if window.verbose label is displayed in console log
 * @param scope
 * @param label
 * @returns {boolean}
 */
function alertIfIsEmpty(scope,label) {

    var result = true;

    // if input radio or checkbox exists and at least one is checked -> not empty
    if (scope.find("*:not(.hidden) input[type=radio][name], *:not(.hidden) input[type=checkbox][name]").length != 0 && scope.find("input:checked").length != 0 ) { // pas dans le scope
        result = false
    }
    if (window.verbose) console.log("alertIfIsEmpty check "+result);

    // if NON radio or NON checkbox input exists and is not empty -> not empty
    if (scope.find("*:not(.hidden) input[type=text][name], *:not(.hidden) input[type=number][name]").length != 0 && scope.find('*:not(.hidden) input[type=text][name],*:not(.hidden) input[type=number][name]').filter(function() { return this.value != ""; }).length != 0 ) {
        result = false
    }
    if (window.verbose) console.log("alertIfIsEmpty input "+result);

    // if textarea exist and is not empty -> not empty
    if (scope.find("*:not(.hidden) textarea").length != 0 && scope.find('*:not(.hidden) textarea').filter(function() { return this.value != "" && this.value != "<br>"; }).length != 0 ) {
        result = false
    }
    if (window.verbose) console.log("alertIfIsEmpty textarea "+result);

    /* select @@
     if (scope.find("select") && $(this).find("select:has(option:selected)").length == 0)  {var hasSelectAllEmpty=true} else {hasSelectAllEmpty =false} */

    if (result) {
        updateVerticalScroll(scope);
        var alert = trad("Please fill in at least one element")
        scope.notify(alert, {className: "error", position: "top middle"});
        if (window.verbose) console.log(label+": *** vide ***");
        scope.addClass("isNotValid")
    } else {
        if (window.verbose) console.log(label+": ok");
    }
    return result;
}
/***
 * upward checking : if field is in a scope that only has one stemValue -> checks stemValue
 * upwardChecking can be blocked by no-upwardChecking class on the field or on the scope it's in
 * @param field
 */
function upwardChecking(field) {
    if (!field.hasClass("no-upwardChecking")) { // upwardChecking can be blocked by no-upwardChecking class on the field
        var fieldDataStemValue = field.closest("[data-stemValueId]").attr("data-stemValueId");
        if (fieldDataStemValue !== undefined) {
            fieldDataStemValue = fieldDataStemValue.trim();
            if (fieldDataStemValue.search(" ") == -1 && !field.closest("[data-stemValueId]").hasClass("no-upwardChecking") ) { // upwardChecking can be blocked by the class no-upwardChecking on the scope the field is in
                if (!$("#" + fieldDataStemValue).is(":checked")) {
                    if (window.verbose) {
                        console.log(window.indentation + "   -> upward checking : " + fieldDataStemValue)
                    }
                    if ($("#" + fieldDataStemValue).attr("type") == "radio") $("#" + fieldDataStemValue).prop('checked', true); // sinon mauvaise propagation descendante (cf financement grilleUMS)
                    $("#" + fieldDataStemValue).trigger("click");
                }
            }
        }
    }
}
/***
 * displays scopes, because of triggerElement, if scope exists, is hidden and have no no-hide class
 * @param triggerElement
 * @param scopes
 */
function displayScopes(triggerElement,scopes) {
    scopes.each(function() {
        $(this).removeClass("force-hide");
        if (!$(this).hasClass("no-hide") && $(this).hasClass("hidden")) {
            if ($(this).attr("id") !== undefined)
                var scopeLabel = $(this).attr("id");
            else
                var scopeLabel = "scope containing "+$(this).find("input").attr("name")+" (...)";
            if (window.verbose) {window.indentation+console.log("-> showing scope of " + triggerElement.attr("id") + " : "+scopeLabel)};
            $(this).removeClass("hidden");
        }
    });
}
/***
 * automatisms for forms
 */
function formAutomatisms() {

    /* when input:radio or input:checkbox clicked */
    $("input:radio[name], input:checkbox[name]").click(function (e) {
        var clickedInputScopes = $("[data-stemValueId~= "+$(this).attr("id")+" ]"); // defined only if triggerElement has an id and this id is in data-stemValueId attribute
        if ($(this).is(":checked")) { // pour exclure click de checkbox uncheck
            if (e.hasOwnProperty('originalEvent')) {
                window.indentation="";
                //window.userTriggeredElement = $(this);
                var clickType=" by user"
            } else {
                window.indentation+="    ";
                var clickType=" (auto)"
            }
            if (window.verbose) {console.log(window.indentation+"name:"+$(this).attr("name")+" value:"+ $(this).attr("value") +" (id: "+$(this).attr("id")+ ") clicked"+clickType)};
            triggerName = $(this).attr("name").replace("[","\\[").replace("]","\\]"); // unspecifies [] for arrays

            upwardChecking($(this));

            // if other(s) value(s) of triggerElement is a stemValue -> rinse scope of those stemValue
            //if ($("input.stemValue[name="+triggerName+"]:not(:checked)").length !== 0 && window.verbose) console.log(window.indentation+"-> rinsing scope(s) of "+$(this).attr("name")+" other stemValue(s)");
            $("input.stemValue[name="+triggerName+"]:not(:checked)").each(function() {
                var idAutreStemValue=$(this).attr("id");
                var scopeAutreStemValue = $("[data-stemValueId~= "+idAutreStemValue+" ]");
                rinseScopes($(this),scopeAutreStemValue)
            });

            displayScopes($(this),clickedInputScopes);

        } else {
            rinseScopes($(this),clickedInputScopes)
        }
        console.log(window.indentation+"--- end click"+clickType+" on "+$(this).attr("id"));
        window.indentation=window.indentation.substring(4);
    });

    /* when typing non check input or textarea */
    $("input:not([type=radio], [type=checkbox]), textarea").on("keypress",function (e) {
        if (window.verbose) {console.log(window.indentation+"name:"+$(this).attr("name")+" typed by user")};

        upwardChecking($(this));

    });

    /* when option with stemValue class is selected */
    $("select").change(function () {
        rawTriggerName = $(this).closest("select").attr("name");
        triggerName = rawTriggerName.replace("[","\\[").replace("]","\\]"); // unspecifies [] for arrays

        if ($(this).find("option:selected").hasClass("stemValue")) {
            window.indentation="";
            if (window.verbose) {console.log(window.indentation+"name:"+rawTriggerName+" value:"+ $(this).find("option:selected").attr("value") +" (id: "+$(this).find("option:selected").attr("id")+ ") selected")};

            var selectedOptionScopes = $("[data-stemValueId~= "+$(this).find("option:selected").attr("id")+" ]");
            displayScopes($(this),selectedOptionScopes);
        }

        // if other(s) option(s) of triggerElement is a stemValue -> rinse scope of those stemValue
        $("select[name="+triggerName+"] option.stemValue:not(:selected)").each(function() {
            // if (window.verbose) console.log(window.indentation+"rinsing scope(s) of "+$(this).attr("name")+" other stemValue(s)");
            var idAutreStemValue=$(this).attr("id");
            //console.log(idAutreStemValue);
            var scopeAutreStemValue = $("[data-stemValueId~= "+idAutreStemValue+" ]");
            rinseScopes($(this),scopeAutreStemValue)
        });

        console.log(window.indentation+"--- end select "+rawTriggerName+" "+$(this).find("option:selected").val());
        window.indentation=window.indentation.substring(4);
    })
    console.log("formAutomatisms has been run");
}
/***
 * controls on form identified by it id (formId) : unconditional and conditional requirements
 * @param formId
 */
function formControls(formId) {
    window.isValid = true;
    // elements with .jq-allowZero class will not stop validation if value is zero (by default, zero is considered empty)

    // required : checks that every field (input,textarea,select) with required attribute that is NOT in a stemValue scope has a value if not, displays alert
    $("#" + formId +" [required]:not([data-stemValueId])").each(function() {
        // (:not([data-stemValueId] pas utile pour l'instant car un élément required ne doit pas être en même temps scope (doit être DANS le scope)
        if ($(this).parents("[data-stemValueId]").length == 0 ) { // todo pas trouvé la syntaxe pour mettre la condition sur n'importe quel élément avec cette class dans le selecteur initial
            var name = $(this).attr('name');
            name = name.replace("[","\\[").replace("]","\\]"); // unspecifies [] for arrays
            var value= "";
            if ($(this).attr('type') == "radio" || $(this).attr('type') == "checkbox") {
                value = $("[name="+name+"]:checked").val();
            } else {
                value = $(this).val();
            }
            if (!$(this).hasClass(".jq-allowZero") && value == "0"  || value === undefined || value.trim() == "" || value == "\N"  ) {
                window.isValid = false;
                if (window.verbose) console.log("required - unconditional : "+ name +" = *** vide ***");
                updateVerticalScroll($(this));
                var alert = trad("Please fill in (unconditionally required) ")+name;
                $(this).notify(alert, { className: "error",position: "top middle" });
            }
        }
    });

    //  checks if fac-required-in-element NOT in the scope of a stemValue are not empty = unconditionned required-in-element
    $("#" + formId +" .fac-required-in-element:not([data-stemValueId])").each(function() {
        if ($(this).parents("[data-stemValueId]").length == 0) {
            var thisId = ($(this).attr("id") !== undefined) ? " "+$(this).attr("id")+" " : "";
            window.isValid = !alertIfIsEmpty($(this),"fac-required-in-element" + thisId ) &&  window.isValid;
        }
    })

    /* if checked stemValue */
    $("#" + formId +" input.stemValue:checked, #" + formId +" option.stemValue:selected").each(function() {

        var stemValueId=$(this).attr("id");

        // checks that all required fields in stemValue scope(s) have a value, if not, displays alert
        $("[data-stemValueId*="+stemValueId+"]").find("[required]").each(function() {
            var scopeStemValueId = " "+$(this).closest("[data-stemValueId]").attr("data-stemValueId")+" ";
            var regex = new RegExp(" "+stemValueId+" ");
            if( scopeStemValueId.match(regex) ) {
                var name =$(this).attr("name");
                name = name.replace("[","\\[").replace("]","\\]"); // unspecifies [] for arrays
                var value= "";
                if ($(this).attr('type') == "radio" || $(this).attr('type') == "checkbox") {
                    value = $("[name="+name+"]:checked").val();
                } else {
                    value = $(this).val();
                }
                if ( (!$(this).hasClass(".jq-allowZero") && value == "0" ) || value === undefined || value.trim() == "" || value == "\\N" ) {
                    if (window.verbose) console.log("required in scope de "+stemValueId+" : "+ name +" = *** vide ***");
                    window.isValid = false;
                    var alert =trad("Please fill in ")+name;
                    if ($(this).hasClass("summernote")) {
                        // otherwise, alert on textearea with summernote get displayed at the top of the page (you tell me why...)
                        $(this).next("div").notify(alert, { className: "error",position: "top middle" });
                        updateVerticalScroll($(this).next("div"));
                    }
                    else {
                        $(this).notify(alert, { className: "error",position: "top middle" });
                        updateVerticalScroll($(this));
                    }
                } else {
                    if (window.verbose) console.log("required in scope de "+stemValueId+" : "+ name +" = "+ value +" : ok");
                }
            }
        });

        // checks if scope(s) of stemValue that ARE fac-required-in-element are not empty = required-in-element conditionned by stemValue
        $(".fac-required-in-element[data-stemValueId*="+stemValueId+"]").each(function() {
            var scopeStemValueId = " "+$(this).attr("data-stemValueId")+" ";
            var regex = new RegExp(" "+stemValueId+" ");
            var thisId = ($(this).attr("id") !== undefined) ? " "+$(this).attr("id") +" " : "";
            if ( scopeStemValueId.match(regex) ) {
                window.isValid =  !alertIfIsEmpty($(this),"scope de la stemValue" + scopeStemValueId + "= fac-required-in-element" + thisId ) &&  window.isValid;
            }
        });

        // checks if fac-required-in-element IN THE scope(s) of stemValue are not empty = required-in-element conditionned by stemValue
        $("[data-stemValueId*="+stemValueId+"]").find(".fac-required-in-element").each(function() {
            var scopeStemValueId = " "+$(this).closest("[data-stemValueId]").attr("data-stemValueId")+" ";
            var regex = new RegExp(" "+stemValueId+" ");
            var thisId = ($(this).attr("id") !== undefined) ? " "+$(this).attr("id") +" " :"";
            if( scopeStemValueId.match(regex) ) {
                window.isValid = !alertIfIsEmpty($(this),"scope de la stemValue" + scopeStemValueId + ": fac-required-in-element" + thisId ) &&  window.isValid;
            }
        })
    }); // end of checks for checked stemValue

    // end of DataTools formControls
}

$(document).ready(function() {
    formControlsPageInit();

    /*** loads debug display
     * requires the following html (adjust positionning to your taste...) to activate debug display

     <label id='debug'>debug display <input type='checkbox' /></label>
     <label id='names'>display names <input type='checkbox' /></label>

     * requires all (input, select, textarea) fields to be inside label tag ***/

    $("#fac-debug input").click(function () {
        if ($(this).is(":checked")) {
            showFacDebugDisplay();
        } else {
            hideFacDebugDisplay();
        }
    } );
    $("#fac-names input").click(function () {
        if ($(this).is(":checked")) {
            showNames();
        } else {
            hideNames();
        }
    } )
})

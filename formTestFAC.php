<?php
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


$pageTitle = "Tests des fonctionnalités de Formulaire Automatismes et Contrôles (formAutoAndControls.js) ";
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title><?= $pageTitle ?></title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="../dataTools.css" />

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://rawgit.com/notifyjs/notifyjs/master/dist/notify.js"></script>
    <script>$.notify.defaults( {
            position: "right middle",
            clickToHide: true,
            arrowShow: true,
            autoHide: true,
            autoHideDelay: 8000})
    </script>
</head>

<body>
    <div id="base" class="no-padding">
        <style>
            h1,h2 {margin-top:20px};
            h3 {margin-top:10px}
        </style>

        <div class="card">

            <div class="card-head style-primary">
                <header><?= $pageTitle ?></header>
            </div>
            <div class="card-body">
                <form action="formTestFac.php" method="get" id="formTestFAC">

                    <h1 class="no-margin-top"><span class="text-red">.stemValue</span> - scope : <span class="text-green">data-stemValueId</span></h1>
                        <h2>Default</h2>
                        <div class="row margin-top-10">
                            <div class="col-4">
                                <div>HER2</div>
                                <label>
                                    <input type="radio" class="stemValue" id ="HER2positif" name="HER2"  value="positif" >
                                    <span>positif</span>
                                </label>
                                <label>
                                    <input class="stemValue" id ="HER2negatif" type="radio" name="HER2"  value="negatif" >
                                    <span>négatif</span>
                                </label>
                                <div data-stemValueId="HER2positif" class="relative margin-top">
                                    <label>
                                        <input required type="text" maxlength="3" name="HER2value"  style="width: 4em"> %
                                    </label>
                                </div>
                                <div class="col-4 relative margin-top" data-stemValueId="HER2negatif">
                                    <label><select name="choix1" required class="form-control inline-block" style="width:10em">
                                            <option class="jq-default-value" value="">-</option>
                                            <option value="option11">option 1</option>
                                            <option value="option12">option 2</option>
                                            <option class="stemValue" id="choixOption13" value="option3">option 3</option>
                                        </select></label>
                                    <div data-stemValueId="choixOption13" class="margin-left-20 inline-block">
                                        <input name="choixOption3Precision" placeholder="préciser..."/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2>If stemValue checked or selected, input in scope required</h2>
                        <div class="row margin-top-10">
                            <div class="col-4">
                                <span>RO</span>
                                <label>
                                    <input type="radio" class="stemValue" id ="ROpositif2" name="RO2"  value="positif" >
                                    <span>positif</span>
                                </label>
                                <label>
                                    <input type="radio" name="RO2"  value="negatif" >
                                    <span>négatif</span>
                                </label>
                                <label data-stemValueId="ROpositif2">
                                    <input required type="text" maxlength="3" name="ROvalue2"  style="width: 4em"> %
                                </label>
                            </div>
                            <div class="col-4">
                                <label><select name="choix2" class="form-control inline-block" style="width:10em">
                                    <option value="option21">option 1</option>
                                    <option value="option22">option 2</option>
                                    <option class="stemValue" id="choixOption23" value="option3">option 3</option>
                                </select></label>
                                <div data-stemValueId="choixOption23" class="margin-left-20 inline-block">
                                    <label><input required name="choixOption3Precision2" placeholder="préciser..."/></label>
                                    <label><select name="choix4" class="form-control inline-block" style="width:10em">
                                        <option value="option41" class="jq-default-value">option 1</option>
                                        <option value="option42">option 2</option>
                                        <option id="choixOption43" value="option3">option 3</option>
                                    </select></label>
                                </div>
                            </div>
                        </div>

                        <h2>Scope always visible</h2>
                        <div class="row margin-top-10">
                            <div class="col-4">
                                <span>RO</span>
                                <label>
                                    <input type="radio" class="stemValue" id ="ROpositif3" name="RO3"  value="positif">
                                    <span>positif</span>
                                </label>
                                <label>
                                    <input type="radio" name="RO3"  value="negatif" >
                                    <span>négatif</span>
                                </label>
                                <label data-stemValueId="ROpositif3" class="no-hide ">
                                    <input type="text" maxlength="3" name="ROvalue3"  style="width: 4em"> %
                                </label>
                            </div>
                            <div class="col-4">
                                <label><select name="choix3" class="form-control inline-block" style="width:10em">
                                    <option value="option31">option 1</option>
                                    <option value="option32">option 2</option>
                                    <option class="stemValue" id="choixOption33" value="option3">option 3</option>
                                </select></label>
                                <label data-stemValueId="choixOption33" class="no-hide margin-left-20 inline-block">
                                    <input name="choixOption3Precision3" placeholder="préciser..."/>
                                </label>
                            </div>
                        </div>

                        <h2>Nested scopes (with automatic upward checking)</h2>
                        <div class="margin-top-10">

                            <div class="row border padding-tiny">
                                <div  class="col-sm-3">
                                    <label>
                                        <input class="stemValue" type="radio" name="financementPrive" id="financementPriveAcquis" value="acquis" required>
                                        <span>Acquis&nbsp;:</span>
                                    </label>
                                </div>
                                <div class="col-sm-3">
                                    <div id="financementPriveAcquisOui" class="no-hide" data-stemValueId="financementPriveAcquis" style="min-width: 24em">
                                        <label>
                                            <input class="stemValue" type="radio" name="financementPriveAcquis" id="financementPriveAcquisOuiAll" value="ouiAll" required >
                                            <span>Oui, pour toute la durée du projet</span>
                                        </label>
                                        <label>
                                            <input class="stemValue" type="radio" name="financementPriveAcquis" id="financementPriveAcquisOuiPart" value="ouiPart" >
                                            <span>Oui, pour une partie du projet</span>
                                        </label>
                                        <div class="relative" data-stemValueId="financementPriveAcquisOuiAll financementPriveAcquisOuiPart">
                                            <label class="block">
                                                <span class="text-bold">Organisme(s) financeur(s) :</span>
                                                <input type="text" name="financeursPrivesAcquis" id="financeursPrivesAcquis" maxlength="50" class="form-control" required >
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="no-hide" data-stemValueId="financementPriveAcquis">
                                        <label>
                                            <input type="radio" name="financementPriveAcquis" id="financementPriveAcquisPartNonPrecise" value="partNonPrecise" >
                                            <span>Non précisé</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row  padding-tiny border">
                                <div class="col-sm-3">
                                    <label>
                                        <input class="stemValue" type="radio" name="financementPrive" id="financementPriveEnCours" value="enCours" >
                                        <span>En cours de demande&nbsp;:</span>
                                    </label>
                                </div>
                                <div class="col-sm-3">
                                    <div id="financementPriveEnCoursOui" class="no-hide" data-stemValueId="financementPriveEnCours" style="min-width: 24em">
                                        <label>
                                            <input class="stemValue" type="radio" name="financementPriveEnCours" id="financementPriveEnCoursOuiAll" value="ouiAll" required >
                                            <span>Oui, pour toute la durée du projet</span>
                                        </label>
                                        <label>
                                            <input class="stemValue" type="radio" name="financementPriveEnCours" id="financementPriveEnCoursOuiPart" value="ouiPart" >
                                            <span>Oui, pour une partie du projet</span>
                                        </label>
                                        <div class="relative" data-stemValueId="financementPriveEnCoursOuiAll financementPriveEnCoursOuiPart">
                                            <label class="block">
                                                <span class="text-bold">Organisme(s) financeur(s) :</span>
                                                <input type="text" name="financeursPrivesEnCours" id="financeursPrivesEnCours" maxlength="50" class="form-control" required >
                                            </label>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="no-hide" data-stemValueId="financementPriveEnCours">
                                        <label>
                                            <input type="radio" name="financementPriveEnCours" id="financementPriveEnCoursPartNonPrecise" value="partNonPrecise" >
                                            <span>Non précisé</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row  padding-tiny border">
                                <div class="col-sm-3">
                                    <label>
                                        <input type="radio" name="financementPrive" id="financementPriveNon" value="non" >
                                        <span>Non</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <h2>Multi-commanded scope</h2>
                        <div class="margin-top relative">Veuillez selectionner le type de pathologie pour le champ en clair :
                            <label><select name='q01dIs' required>
                                <option value=''></option>
                                <option class="stemValue" id="q01dIsIDM" value='IDM' >IDM</option>
                                <option class="stemValue" value='insuffisance' id="q01dIsInsuffisance">Insuffisance</option>
                                <option class="stemValue" value='troubles' id="q01dIsTroubles" >Troubles</option>
                                <option value='casExclu' ><em>Cas exclu ou diagnostic alternatif non cardiologique</em></option>
                            </select></label>
                        </div>

                        <div class="margin-top-10"><u>Par ailleurs</u>, avez-vous identifié, l’existence de :</div>

                        <div class="margin-left">
                            <?php foreach (array("IDM","insuffisance","troubles") as $patho ) {?>
                                <div class="row">
                                    <div class="col-sm-4" style="width: 28em"><?= $patho ?></div>
                                    <label class="margin-right">
                                        <input required type="radio" class="stemValue" id="<?= $patho . "Adjudic" ?>" name="has<?= ucfirst($patho) ?>"
                                               value="adjudic">
                                        <span>Oui</span>
                                    </label>

                                    <label class="margin-right-10">
                                        <input type="radio" name="has<?= ucfirst($patho) ?>" value="non" >
                                        <span>Non</span>
                                    </label>
                                </div>
                            <?php } ?>
                        </div>

                        <div id="blockIDM" data-stemValueId="IDMAdjudic IDMDeclare q01dIsIDM">
                            <div class="text-bold bg-primary-bright text-white border-radius-2 margin-top align-center" style="height:2em;margin-bottom: 4px;vertical-align: middle;padding: 4px">
                               IDM
                            </div>

                            <div class="margin-left margin-right">
                                <div id="lstIDM">
                                </div>
                            </div>

                        </div>

                        <div id="blockInsuffisance" data-stemValueId=" insuffisanceAdjudic insuffisanceDeclare q01dIsInsuffisance">
                            <div class="text-bold bg-primary-bright text-white border-radius-2 margin-top align-center" style="height:2em;margin-bottom: 4px;vertical-align: middle;padding: 4px">
                                Insuffisance
                            </div>

                            <div class="margin-left margin-right">
                                <div id="lstInsuffisance">
                                </div>
                            </div>

                        </div>

                        <div id="blockTroubles" data-stemValueId="troublesAdjudic troublesDeclare q01dIsTroubles" >
                            <div class="text-bold bg-primary-bright text-white border-radius-2 margin-top align-center" style="height:2em;margin-bottom: 4px;vertical-align: middle;padding: 4px">
                                Troubles
                            </div>

                            <div class="margin-left margin-right">
                                <div id="lstTroubles">
                                </div>

                            </div>
                        </div>

                        <h1 style="color: rgb(175, 55, 250)">.fac-required-in-element</h1>
                        <h2>Inconditionnel</h2>
                        <div class="fac-required-in-element padding-small" id="teamQuality">
                            <div class="relative">
                                <strong>Quality of the research team</strong>
                                <label class="pull-right margin-15"><input type="text" name="teamQuality" step="0.1" min="1" max="5" style="width:80px;" maxlength="5" class="form-control text-center" ></label>
                            </div>

                            <div>
                                <em>Legitimacy - quality - expertise - productivity of applicants including PI and team - complementarity of teams if appropriate -
                                    interdisciplinary approach if appropriate</em>

                                <div class="margin-15 relative" >
                                    <em>Comments (if needed)</em>
                                    <label class="full-width"><textarea name="commTeamQuality" class="full-width" ></textarea></label>
                                </div>
                            </div>
                        </div>

                        <h2 class="no-margin-top">Conditionné par <span class="text-red">stemValue</span></h2>
                        <div class="row">
                            <p class="margin-top-10">utilisation d’échantillons biologiques <strong>conservés dans la biobanque</strong> : </p>
                            <div class="margin-top-10">
                                <label>
                                    <input type="radio" name="echantBiolBiobanque" value="non" >
                                    <span>Non</span>
                                </label>
                                <label>
                                    <input class="stemValue" type="radio" name="echantBiolBiobanque" id="echantBiolBiobanqueOui" value="oui"  >
                                    <span>Oui</span>
                                </label>

                                <span data-stemValueId="echantBiolBiobanqueOui" class="fac-required-in-element" id="echantBiolBiobanqueNature">
                                    préciser la nature :
                                    <label>
                                        <input type=checkbox name="echantBiolBiobanqueSerum" value="true" >
                                        <span>Sérum</span>
                                    </label>
                                    <label>
                                        <input type=checkbox name="echantBiolBiobanqueSangTotal" value="true" >
                                        <span>Sang total</span>
                                    </label>
                                    <label>
                                        <input type=checkbox name="echantBiolBiobanqueUrine" value="true" >
                                        <span>Urine</span>
                                    </label>
                                </span>
                            </div>
                        </div>

                        <button type="button" class="btn ink-reaction btn-success validation"  style="position:fixed;top:165px;right:250px"
                                data-msgSuccess="form is valid !"
                                data-msgError="Erreur !! Le formulaire n'a pas pu être enregistré définitivement"
                                data-action="Questionnaire - Test" data-commentHisto="Validation définitive du formulaire">
                                Validation</button>


                </form>
            </div>

        </div>
    </div> <!-- fin #base -->
</body>

<script type="text/javascript" src="../formAutoAndControls.js"></script>
<script>
    if ("<?= isset($_GET['lang']) ?>") window.lang= "<?= isset($_GET['lang']) ? $_GET['lang'] :""?>" ;
    if (window.lang!="fr") {
        $( "form" ).append( "<label id='fr' style='position: fixed;top:165px;right:40px'><input type='checkbox' /> alertes en français </label>" );
        $("#fr input").click(function () {
            if ($(this).is(":checked")) window.lang= "fr" ; else window.lang= "en";
            console.log(window.lang);
        })
    }

    if ("<?= isset($_GET['debug']) ?>") insertsToggleDebugDisplayCheckboxes("top","165px","right","480px");

    $(".validation").click(function () {
        formControls("formTestFAC");

        if (window.isValid) alert("Le formulaire est valide\n\nForm is valid"); else  $(window).scrollTop(window.verticalScroll - 150);
    })
</script>

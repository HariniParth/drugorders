/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global diagnosis, jq */

$(document).ready( function() {
    
    $(document).mouseup(function (e){
        var objects = $('.dialog');
        $(objects).each(function(){
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0){
                $(this).hide();
                clearHighlights();
                
                var ID = $(this).attr("id");
                
                if(ID === "showDrugOrderView")
                    hideDrugOrderViewWindow();
                else if(ID === "editMedPlanWindow")
                    hideMedPlanEditWindow();
                else if(ID === "createNewPlanWindow")
                    hideMedPlanCreateWindow();
                else if(ID === "singleOrderDetailsWindow")
                    hideIndividualOrderDetailsWindow();
                else if(ID === "showGroupOrderWindow")
                    hideGroupOrderWindow();
            }
        });        
    });

    jq("#existingPlansLinkHide").hide();
    $("#adminSavePlan").prop("disabled", true);
    $("#addOrderButton").prop("disabled", true);
    $("#adminEditPlanName").prop("disabled", true);
    
    $('#adminPlanName').autocomplete({
        select: function (event, ui) { adminRecord(); }
    });
    
    $('#adminDrugName').autocomplete({
        select: function (event, ui) { adminRecord(); }
    });
    
    $('#new_disease_name').autocomplete({
        select: function (event, ui) { 
            $("#adminEditPlanName").prop("disabled", false); 
        }
    });
    
    if($('#groupAction').val() === "DISCARD ORDER GROUP" || $('#groupAction').val() === "DISCARD MED PLAN"){
        $("#orderActionButton").prop("disabled", true);
        jq("#discontinueReasonSelect").show();
        document.getElementById("discontinueReasonSelect").style.display = 'block';
    }
    
    $("#discontinueReasonCoded, #discontinueReasonNonCoded").change(function(){
        enableOrderDiscard();
    });
    
    $("#adminPlanName, #adminDrugName, #adminRoute, #adminDose, #adminDoseUnits, #adminQuantity, #adminQuantityUnits, #adminDuration, #adminDurationUnits, #adminFrequency").change(function(){
        adminRecord();
    });
    
    $('#associatedDiagnosis').autocomplete({
        select: function (event, ui) { validate(); }
    });
    
    $("#drugRoute, #drugDose, #drugDoseUnits, #drugQuantity, #quantityUnits, #drugDuration, #durationUnits, #drugFrequency").change(function(){
        validate();
    });
});

function clearHighlights(){
    jq(".orderRow").each(function(){
        jq(this).children('td').slice(1, 3).css({'background-color':'','color':''});
    });
    jq(".groupDrugDetails").each(function(){
        jq(this).css({'background-color':'','color':''});
    });
    jq(".oldOrderRow").each(function(){
        jq(this).children('td').slice(0, 1).css({'background-color':'','color':''});
    });
    jq(".oldDrugOrdersID").each(function(){
        jq(this).children('*').css({'background-color':'','color':''});
    });
    jq(".detailsLink").each(function(){
        jq(this).children('div > *').slice(0, 1).css({'background-color':'','color':''});
    });
}

function validate(){
    if($("#drugNameEntered").val() !== "" && $("#drugRoute").val() !== "" && $("#drugDose").val() !== "" && $("#drugDoseUnits").val() !== "" && $("#drugQuantity").val() !== "" && $("#quantityUnits").val() !== "" && $("#drugDuration").val() !== "" && $("#durationUnits").val() !== "" && $("#drugFrequency").val() !== "" && $("#associatedDiagnosis").val() !== ""){
        $("#addOrderButton").prop("disabled", false);
    }
}

function adminRecord(){
    if($("#adminPlanName").val() !== "" && $("#adminDrugName").val() !== "" && $("#adminRoute").val() !== "" && $("#adminDose").val() !== "" && $("#adminDoseUnits").val() !== "" && $("#adminQuantity").val() !== "" && $("#adminQuantityUnits").val() !== "" && $("#adminDuration").val() !== "" && $("#adminDurationUnits").val() !== "" && $("#adminFrequency").val() !== ""){
        $("#adminSavePlan").prop("disabled", false);
    }
}

function showMedicationPlanOrderWindow(){
    jq("#medicationPlanWindow").show();
    document.getElementById("medicationPlanWindow").style.display = 'block';
}

function hideMedicationPlanOrderWindow(){
    jq("#medicationPlanWindow").hide();
}

function hideMedicationPlansWindow(){
    jq("#medPlanDetailsWindow").hide();
}

function showIndividualOrderDetailsWindow(orderType){
    $("#orderType").text(orderType);
    $("#orderAction").val(orderType);
    jq("#confirmOrderView").hide();
    jq("#singleOrderDetailsWindow").show();
    document.getElementById("singleOrderDetailsWindow").style.display = 'block';
}

function hideIndividualOrderDetailsWindow(){
    jq("#singleOrderDetailsWindow").hide();
    jq("#allergicDrugOrderReasonField").hide();
    $("#drugNameEntered").val("");
    $("#allergicOrderReason").val("");
    $("#drugRoute").val("");
    $("#drugDose").val("");
    $("#drugDoseUnits").val("");
    $("#drugQuantity").val("");
    $("#quantityUnits").val("");
    $("#drugDuration").val("");
    $("#durationUnits").val("");
    $("#drugFrequency").val("");
    $("#refill").val("0");
    $("#refillInterval").val("0");
    $("#associatedDiagnosis").val("");
    $("#patientInstructions").val("");
    $("#pharmacistInstructions").val("");
    $("#addOrderButton").prop("disabled", true);
    
    clearHighlights();
}

function showDrugOrderViewWindow(action,givenName,lastName,startdate,drugname,dose,doseUnits,route,duration,durationUnits,quantity,quantityUnits,frequency,numRefills,allergicOrderReason,priority,patientinstructions,pharmacistinstructions,pharmacomments){
    jq("#view_window_close_btn").show();
    $("#activeOrderAction").text(action);
    $("#patient_name").text(givenName+" "+lastName);
    $("#start_date").text(startdate);
    $("#order_priority").text(priority);
    $("#order_refills").text(numRefills);
    $("#order_details").text(drugname +" "+dose+" "+doseUnits+" "+route+" "+duration+" "+durationUnits+" "+quantity+" "+quantityUnits+" "+frequency);
    
    if(allergicOrderReason !== "" && allergicOrderReason !== "null"){
        $("#order_reason").text(allergicOrderReason);
        jq("#allergicOrderReasonView").show();
        document.getElementById("allergicOrderReasonView").style.display = 'block';
    }
    
    $("#patient_instructions").text(patientinstructions);
    $("#pharmacist_instructions").text(pharmacistinstructions);
    
    if(pharmacomments !== "" && pharmacomments !== null && pharmacomments !== "null" && pharmacomments !== undefined){
        $("#pharma_comments").text(pharmacomments);
        jq("#pharmacistCommentsView").show();
        document.getElementById("pharmacistCommentsView").style.display = 'block';
    }
    
    jq("#singleOrderView").show();
    document.getElementById("singleOrderView").style.display = 'block';
    jq("#showDrugOrderView").show();
    document.getElementById("showDrugOrderView").style.display = 'block';
}

function hideDrugOrderViewWindow(){
    jq("#showDrugOrderView").hide();
    jq("#discontinueReasonTextView").hide();
    $("#discontinueOrder").prop("disabled", true);
    $("#discontinueOrderReasonNonCoded").prop("disabled", true);
    $("#discontinueOrderReasonCoded").val("Choose option");
    $("#discontinueOrderReasonNonCoded").val("");
    
    clearHighlights();
}

function showEditIndividualDrugOrderWindow(orderType,orderClass,orderId,drugName,startDate,dose,doseUnits,route,duration,durationUnits,quantity,quantityUnits,frequency,numRefills,refillInterval,associateddiagnosis,allergicOrderReasons,priority,patientinstructions,pharmacistinstructions){
    $("#orderType").text(orderType);
    $("#orderAction").val(orderType);
    $("#orderClass").val(orderClass);
    $("#order_id").val(orderId);
    $("#drugNameEntered").val(drugName);
    $("#drugRoute").val(route);
    $("#drugDose").val(dose);
    $("#drugDoseUnits").val(doseUnits);
    $("#drugQuantity").val(quantity);
    $("#quantityUnits").val(quantityUnits);
    $("#drugDuration").val(duration);
    $("#durationUnits").val(durationUnits);
    $("#drugFrequency").val(frequency);
    $("#refill").val(numRefills);
    $("#refillInterval").val(refillInterval);
    $("#orderPriority").val(priority);
    $("#associatedDiagnosis").val(associateddiagnosis);
    if(allergicOrderReasons !== "" && allergicOrderReasons !== "null"){
        $("#allergicOrderReason").val(allergicOrderReasons);
        jq("#allergicDrugOrderReasonField").show();
        document.getElementById("allergicDrugOrderReasonField").style.display = 'block';
    }
    $("#patientInstructions").val(patientinstructions);
    $("#pharmacistInstructions").val(pharmacistinstructions);
    jq("#singleOrderDetailsWindow").show();
    document.getElementById("singleOrderDetailsWindow").style.display = 'block';
}

function showRenewIndividualDrugOrderWindow(orderType,orderId,drugName,dose,doseUnits,route,duration,durationUnits,quantity,quantityUnits,frequency,numRefills,refillInterval,associateddiagnosis,priority,patientinstructions,pharmacistinstructions){
    $("#orderType").text(orderType);
    $("#orderAction").val(orderType);
    $("#order_id").val(orderId);
    $("#drugNameEntered").val(drugName);
    $("#drugRoute").val(route);
    $("#drugDose").val(dose);
    $("#drugDoseUnits").val(doseUnits);
    $("#drugQuantity").val(quantity);
    $("#quantityUnits").val(quantityUnits);
    $("#drugDuration").val(duration);
    $("#durationUnits").val(durationUnits);
    $("#drugFrequency").val(frequency);
    $("#orderPriority").val(priority);
    $("#refill").val(numRefills);
    $("#refillInterval").val(refillInterval);
    $("#associatedDiagnosis").val(associateddiagnosis);
    $("#patientInstructions").val(patientinstructions);
    $("#pharmacistInstructions").val(pharmacistinstructions);
    jq("#singleOrderDetailsWindow").show();
    document.getElementById("singleOrderDetailsWindow").style.display = 'block';
}

function hideEditOrderWindow(){
    jq("#editOrderWindow").hide();
}

function hideRenewOrderWindow(){
    jq("#renewOrderWindow").hide();
}

function showDiscontinueIndividualDrugOrderWindow(action,orderid,givenName,lastName,startdate,drugname,dose,doseUnits,route,duration,durationUnits,quantity,quantityUnits,frequency,priority,patientinstructions,pharmacistinstructions){
    jq("#view_window_close_btn").hide();
    $("#activeOrderAction").text(action);
    $("#dis_order_id").val(orderid);
    $("#patient_name").text(givenName+" "+lastName);
    $("#start_date").text(startdate);
    $("#order_priority").text(priority);
    $("#order_details").text(drugname +" "+dose+" "+doseUnits+" "+route+" "+duration+" "+durationUnits+" "+quantity+" "+quantityUnits+" "+frequency);
    $("#patient_instructions").text(patientinstructions);
    $("#pharmacist_instructions").text(pharmacistinstructions);
    jq("#singleOrderView").show();
    document.getElementById("singleOrderView").style.display = 'block';
    jq("#showDrugOrderView").show();
}

function discardMedPlanOrder(plan){
    $("#selectedActivePlan").val(plan);
    $("#activePlanForm").submit();
}

function renewMedPlanWindow(plan){
    $("#selectedNonActivePlan").val(plan);
    $("#nonActivePlanForm").submit();
}

function autoCompleteDiagnosis(diagnosis){
    var list = diagnosis.replace("[","").replace("]","").split(',');
    console.log(list);
    $("#associatedDiagnosis").autocomplete({
       source : list
    });
}

function autoCompleteDrug(drug, allergies){
    $("#drugNameEntered").autocomplete({
       select : function( event , ui ) {
            var allergyList = allergies.split(",");
            var isAllergic = false;
            $.each(allergyList,function(index,value){
                var drugname = value.replace("[","").replace("]","").replace(" ","");
                var selectedDrug = (ui.item.label).replace(" ","");
                if(selectedDrug === drugname){
                    isAllergic = true;
                } 
            });
            if(isAllergic){
                jq("#allergicDrugOrderReasonField").show();
                document.getElementById("allergicDrugOrderReasonField").style.display = 'block';
            } else {
                jq("#allergicDrugOrderReasonField").hide();
            }
            validate();
        }
    });
}

function autoCompleteDisease(disease){
    var list = disease.replace("[","").replace("]","").split(',');
    console.log(list);
    $("#diseaseName").autocomplete({
       source : list,
       select : function( event , ui ) {
           $("#diseaseName").val(ui.item.label);
           $("#diseaseForm").submit();
           validate();
       }
    });
    
    $("#new_disease_name").autocomplete({
       source : list,
       select : function( event , ui ) {
           $("#diseaseName").val(ui.item.label);
           $("#diseaseForm").submit();
       }
    });
}

function selectDisease(drug, allergies){
    $("#diseaseForm").submit();
}

function autoCompletePlanItem(drugs){
    var list = drugs.replace("[","").replace("]","").split(',');
    console.log(list);
    $("#drug_name").autocomplete({
        select: function( event , ui ) {
            validate();
        } 
    });
}

function editDraftOrder(editDraftOrderID,drugname,startdate,dose,doseUnits,route,duration,durationUnits,quantity,quantityUnits,frequency,numRefills,diagnosis,patientinstructions,pharmacistinstructions){
    jq("#confirmOrderView").hide();
    $("#orderID").val(editDraftOrderID);
    $("#drugNameEntered").val(drugname);
    $("#allergicOrderReason").val("");
    $("#drugRoute").val(route);
    $("#drugDose").val(dose);
    $("#drugDoseUnits").val(doseUnits);
    $("#drugQuantity").val(quantity);
    $("#quantityUnits").val(quantityUnits);
    $("#drugDuration").val(duration);
    $("#durationUnits").val(durationUnits);
    $("#drugFrequency").val(frequency);
    $("#refill").val(numRefills);
    $("#associatedDiagnosis").val(diagnosis);
    $("#patientInstructions").val(patientinstructions);
    $("#pharmacistInstructions").val(pharmacistinstructions);
    jq("#singleOrderDetailsWindow").show();
    document.getElementById("singleOrderDetailsWindow").style.display = 'block';
}

function deleteDraftOrder(deleteDraftOrderID){
    alert(deleteDraftOrderID);
}

function displayPlanCreationWindow(){
    jq("#confirmNewPlanWindow").hide();
    jq("#createNewPlanWindow").show();
    document.getElementById("createNewPlanWindow").style.display = 'block';
    $("#adminActionType").text("CREATE NEW PLAN");
}

function addPlanItemWindow(diseaseName){
    jq("#confirmNewPlanWindow").hide();
    jq("#createNewPlanWindow").show();
    document.getElementById("createNewPlanWindow").style.display = 'block';
    $("#adminActionType").text("ADD DRUG TO PLAN");
    $("#adminPlanName").val(diseaseName);
}

function hideMedPlanCreateWindow(){
    jq("#createNewPlanWindow").hide();
    $("#planId").val("");
    $("#adminPlanName").val("");
    $("#adminDrugName").val("");
    $("#adminRoute").val("");
    $("#adminDose").val("");
    $("#adminDoseUnits").val("");
    $("#adminQuantity").val("");
    $("#adminQuantityUnits").val("");
    $("#adminDuration").val("");
    $("#adminDurationUnits").val("");
    $("#adminFrequency").val("");
    $("#adminSavePlan").prop("disabled", true);
    
    jq(".detailsLink").each(function(){
        jq(this).children('div > *').slice(0, 1).css({'background-color':'','color':''});
    }); 
}

function editPlanItemDetails(planid,diseaseName,drugName,dose,doseunits,route,quantity,quantityunits,duration,durationunits,frequency){
    jq("#confirmNewPlanWindow").hide();
    jq("#createNewPlanWindow").show();
    document.getElementById("createNewPlanWindow").style.display = 'block';
    $("#adminActionType").text("EDIT PLAN");
    $("#planId").val(planid);
    $("#adminPlanName").val(diseaseName);
    $("#adminDrugName").val(drugName);
    $("#adminDose").val(dose);
    $("#adminDoseUnits").val(doseunits);
    $("#adminRoute").val(route);
    $("#adminQuantity").val(quantity);
    $("#adminQuantityUnits").val(quantityunits);
    $("#adminDuration").val(duration);
    $("#adminDurationUnits").val(durationunits);
    $("#adminFrequency").val(frequency);
}

function deleteMedPlan(diseaseName){
    jq("#deleteMedPlanWindow").show();
    document.getElementById("deleteMedPlanWindow").style.display = 'block';
    $("#plan_name").val(diseaseName);
}

function editPlanDetails(diseaseName){
    jq("#editMedPlanWindow").show();
    document.getElementById("editMedPlanWindow").style.display = 'block';
    $("#disease_name").val(diseaseName);
}

function hideMedPlanEditWindow(){
    jq("#editMedPlanWindow").hide();
    $("#new_disease_name").val("");
    $("#adminEditPlanName").prop("disabled", true); 
}

function deleteMedPlanItem(planid,diseaseName,drugName,dose,doseunits,route,quantity,quantityunits,duration,durationunits,frequency){
    jq("#confirmNewPlanWindow").hide();
    jq("#deleteMedPlanItemWindow").show();
    document.getElementById("deleteMedPlanItemWindow").style.display = 'block';
    $("#medPlan_id").val(planid);
    $("#disease_value").text(diseaseName);
    $("#drug_value").text(drugName);
    $("#dose_value").text(dose);
    $("#dose_units_value").text(doseunits);
    $("#route_value").text(route);
    $("#quantity_value").text(quantity);
    $("#quantity_units_value").text(quantityunits);
    $("#duration_value").text(duration);
    $("#duration_units_value").text(durationunits);
    $("#frequency_value").text(frequency);
}

function hideMedPlanDeleteWindow(){
    jq("#deleteMedPlanWindow").hide();
}

function hideMedPlanItemDeleteWindow(){
    jq("#deleteMedPlanItemWindow").hide();
    
    jq(".detailsLink").each(function(){
        jq(this).children('div > *').slice(0, 1).css({'background-color':'','color':''});
    }); 
}

function viewMedPlanWindow(diseasename,drugname,dose,doseunits,route,quantity,quantityunits,duration,durationunits,frequency){
    jq("#viewPlanWindow").show();
    document.getElementById("viewPlanWindow").style.display = 'block';
    $("#plan_disease").text(diseasename);
    $("#plan_drug").text(drugname);
    $("#plan_dose").text(dose);
    $("#plan_dose_units").text(doseunits);
    $("#plan_route").text(route);
    $("#plan_quantity").text(quantity);
    $("#plan_quantity_units").text(quantityunits);
    $("#plan_duration").text(duration);
    $("#plan_duration_units").text(durationunits);
    $("#plan_frequency").text(frequency);
}

function hideMedPlanWindow(){
    jq("#viewPlanWindow").hide();
    jq(".detailsLink").each(function(){
        jq(this).children('div > *').slice(0, 1).css({'background-color':'','color':''});
    });
}

function showRenewGroupOrderWindow(orderID){
    $("#selectedNonActiveGroup").val(orderID);
    $("#nonActiveGroupForm").submit();
}

function showDiscardGroupOrderWindow(orderID){
   $("#selectedActiveGroup").val(orderID);
   $("#activeGroupForm").submit();
}

function hideGroupOrderWindow(){
    jq("#showGroupOrderWindow").hide();
    jq(".oldGroupRow").each(function(){
        jq(this).children('td').slice(0, 1).css({'background-color':'','color':''});
    });
    $('#groupOrderBlock > p').html("");
}

function showAddOrderToGroupWindow(orderType,groupID){
    $("#order_id").val(groupID);
    $("#orderType").text(orderType);
    $("#orderAction").val(orderType);
    jq("#confirmOrderView").hide();
    jq("#singleOrderDetailsWindow").show();
    document.getElementById("singleOrderDetailsWindow").style.display = 'block';
}

function discontinueReason(){
    if(document.getElementById("discontinueReasonCoded").value === "Other"){
        jq("#discontinueReasonText").show();
        document.getElementById("discontinueReasonText").style.display = 'block';
    } else {
        jq("#discontinueReasonText").hide();
    }
    if(document.getElementById("discontinueReasonCoded").value === ""){
        $("#orderActionButton").prop("disabled", true);
    } else {
        $("#orderActionButton").prop("disabled", false);
    }
}
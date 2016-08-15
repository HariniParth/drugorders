/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.openmrs.module.drugorders.fragment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang.StringUtils;
import org.openmrs.Concept;
import org.openmrs.OrderFrequency;
import org.openmrs.api.context.Context;
import org.openmrs.module.drugorders.api.medicationplansService;
import org.openmrs.module.drugorders.medicationplans;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author harini-geek
 */
public class AdministrationActionFragmentController {
    
    public final Map<String, medicationplans> diseaseplans = new HashMap<String,medicationplans>();
    
    public void controller(PageModel model, @RequestParam(value = "diseaseName", required = false) String diseaseNameSelected,
            @RequestParam(value = "drugName", required = false) String drugNameSelected,
            @RequestParam(value = "drugRoute", required = false) String drugRoute,
            @RequestParam(value = "drugDose", required = false) String drugDose,
            @RequestParam(value = "drugDoseUnits", required = false) String drugDoseUnits,
            @RequestParam(value = "drugQuantity", required = false) String drugQuantity,
            @RequestParam(value = "quantityUnits", required = false) String quantityUnits,
            @RequestParam(value = "drugDuration", required = false) Integer drugDuration,
            @RequestParam(value = "durationUnits", required = false) String durationUnits,
            @RequestParam(value = "drugFrequency", required = false) String drugFrequency,
            @RequestParam(value = "action", required = false) String action){
        
        String diseaseName = diseaseNameSelected.replace(" ", "");
        String drugName = drugNameSelected.replace(" ", "");
        
        model.addAttribute("diseaseName", diseaseName);
        
        medicationplans medPlans = new medicationplans();
        medPlans.setDose(Double.valueOf(drugDose));
        medPlans.setQuantity(Double.valueOf(drugQuantity));
        medPlans.setDiseaseid(Context.getConceptService().getConceptByName(diseaseName));
        medPlans.setDrugid(Context.getConceptService().getConceptByName(drugName));
        medPlans.setDoseunits(Context.getConceptService().getConceptByName(drugDoseUnits));
        medPlans.setDuration(drugDuration);
        medPlans.setDurationunits(Context.getConceptService().getConceptByName(durationUnits));
        medPlans.setQuantityunits(Context.getConceptService().getConceptByName(quantityUnits));
        medPlans.setRoute(Context.getConceptService().getConceptByName(drugRoute));
        
        OrderFrequency orderFrequency = Context.getOrderService().getOrderFrequencyByConcept(Context.getConceptService().getConceptByName(drugFrequency));
        if (orderFrequency == null) {
            medPlans.setFrequency(setOrderFrequency(drugFrequency));
        } else {
            medPlans.setFrequency(orderFrequency);
        }   
            
        diseaseplans.put(diseaseName, medPlans);
        
        model.addAttribute("medicationplans", medPlans);
        model.addAttribute("diseaseplans", diseaseplans);

        if (StringUtils.isNotBlank(action)) {
            try {
                if ("addPlanItem".equals(action)) {
                    System.out.println("Saving plan for "+medPlans.getDiseaseid().getDisplayString());
                    Context.getService(medicationplansService.class).saveNewTable(medPlans);
                }
            } catch(Exception e){
                System.out.println("Error message "+e.getMessage());
            }
        }
        
        Concept diseaseConcept = Context.getConceptService().getConceptByName(diseaseName);
        List<medicationplans> existingMedplans = Context.getService(medicationplansService.class).getMedicationPlansByDisease(diseaseConcept);
        model.addAttribute("existingMedplans", existingMedplans);
    }
    
    private OrderFrequency setOrderFrequency(String Frequency) {

        OrderFrequency orderFrequency = new OrderFrequency();
        orderFrequency.setFrequencyPerDay(0.0);
        orderFrequency.setConcept(Context.getConceptService().getConceptByName(Frequency));
        orderFrequency = (OrderFrequency) Context.getOrderService().saveOrderFrequency(orderFrequency);
        return orderFrequency;

    }
    
}
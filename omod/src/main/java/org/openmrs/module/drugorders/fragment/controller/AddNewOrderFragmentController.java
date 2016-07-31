/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.openmrs.module.drugorders.fragment.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.openmrs.Concept;
import org.openmrs.ConceptSet;
import org.openmrs.Patient;
import org.openmrs.api.context.Context;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author harini-geek
 */

public class AddNewOrderFragmentController {
    
    /**
     *
     * @param model
     * @param startDate
     * @param patient
     */

    List<Concept> diseases = new ArrayList<Concept>();
    
    public void controller(PageModel model, 
            @RequestParam(value = "disease_name", required = false) String disease_name,
            @RequestParam(value = "medPlanStartDate", required = false) Date medPlanStartDate,
            @RequestParam("patientId") Patient patient){

        model.addAttribute("disease_name", disease_name);
        model.addAttribute("medPlanStartDate", medPlanStartDate);
        model.addAttribute("patientid", patient.getPatientId());
        
        Concept diseaseConcept = Context.getConceptService().getConcept(160168);
        
        for(ConceptSet diseaseConcepts : diseaseConcept.getConceptSets()){
            Concept diseaseMember = diseaseConcepts.getConcept();
            diseases.add(diseaseMember);
        }
        
        model.addAttribute("diagnosis", diseases);
        
        List<String> diseaseNames = new ArrayList<String>();
        for(Concept diagnosisName : diseases){
            diseaseNames.add(diagnosisName.getDisplayString());
        }
        model.addAttribute("diseaseNames", diseaseNames);
    }
}
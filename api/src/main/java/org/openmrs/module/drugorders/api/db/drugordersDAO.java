/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.drugorders.api.db;

import java.util.List;
import org.openmrs.Concept;
import org.openmrs.Patient;
import org.openmrs.module.drugorders.drugorders;
import org.openmrs.module.drugorders.api.drugordersService;

/**
 *  Database methods for {@link drugordersService}.
 */
public interface drugordersDAO {
	
    public int getLastGroupID();
    public List<drugorders> getOrdersOnHold();
    public List<drugorders> getOrdersForDiscard();
    public drugorders saveDrugOrder(drugorders drugOrder);
    public drugorders getDrugOrderByOrderID(Integer orderId);    
    public List<drugorders> getDrugOrdersByGroupID(Integer groupId);
    public List<drugorders> getDrugOrdersByPatient(Patient patient);
    public drugorders getDrugOrderByDrugAndPatient(Concept drug, Patient patient);
    public List<drugorders> getDrugOrdersByPatientAndStatus(Patient patient, String status);
    
}
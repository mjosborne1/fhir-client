import type  { Concept } from './concept-type';

export interface FormInput {
    services: Concept[];
    category: Concept;
    bodySite: Concept;
    billingCategory: string;
    notes: string;
}


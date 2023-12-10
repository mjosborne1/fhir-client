import type  { Concept } from './concept-type';

export interface FormInput {
    service: Concept;
    category: Concept;
    bodySite: Concept;
    notes: string;
}


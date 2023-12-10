import type { FormInput } from '$lib/types/form-input';
import type { Bundle, BundleEntry } from 'fhir/r4';




export function createRequestBundle (formData:FormInput) {
    const requestBundle: Bundle = {
        resourceType: "Bundle",
        type: "transaction",
        timestamp: (new Date()).toJSON(),

    };
    return requestBundle;
}

import type { ServiceType } from "$lib/types/service-type";
// Service Categories
export const categories : ServiceType[] =
    [
      {
      code: "310074003", display: "Pathology" 
      },
      {
        code: "310125001", display: "Radiology"
      },
      {
        code: "1231393002", display: "Spirometry"
      }
    ];
// Radiology Services 
export const radiologyServices : ServiceType[] = [
    { code: "29357002", display: "X-Ray of face, head AND/OR neck"},
    { code: "783628002", display: "X-ray of hip"},
    { code: "427019001", display: "X-Ray of left knee "},
    { code: "427407003", display: "X-Ray of right knee"},
    { code: "399208008", display: "X-Ray of chest"},
    { code: "169069000", display: "CT chest"},
    { code: "419545005", display: "CT Angiography of coronary artery with contrast"}
];

// Pathology Services
export const pathologyServices : ServiceType[] = [
  { code: "26604007", display: "Full blood count"},
  { code: "401324008", display: "Urine microscopy, culture and sensitivities"}
];


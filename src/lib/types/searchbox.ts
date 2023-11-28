export interface SearchBoxProps {
    label?:string;
	heading?:string;
	formId?:string;
	formValueId?:string;
	formDisplayId?:string;
	fieldName?:string;
	valueId?: string;
	valueDisplay?: string;
	fieldSize?:number;
	apiEndpoint:string;
	apiECLQuery:string;
    preloadBehavior: 'tap' | 'hover';
	loadingState: 'waiting' | 'loading' | 'loaded' | 'error';
}
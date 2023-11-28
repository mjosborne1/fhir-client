export interface SearchBoxProps {
    label?:string;
	heading?:string;
	formId?:string;
	fieldName?:string;
	valueId?: string;
	valueDisplay?: string;
	fieldSize?:number;
	apiEndpoint:string;
	apiECLQuery:string;
    preloadBehavior: 'tap' | 'hover';
	loadingState: 'waiting' | 'loading' | 'loaded' | 'error';
}
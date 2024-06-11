import { ValidationError } from "yup";
import { passwordValidation } from "./validationSchemas";

export function capitalizeFirstLetterAndSetLength(string: string, maxLength: number): string {
    const alphaOnly: string = string.replace(/[^a-zA-Z]/g, '');
    const trimmedString: string= alphaOnly.slice(0, maxLength);
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1).toLowerCase();
}

export function formatLoginAndSetLength(inputString: string, maxLength: number): string {
    let sanitizedString = inputString.replace(/[^a-zA-Z0-9]/g, '');
    sanitizedString = sanitizedString.replace(/^[^a-zA-Z]+/, '');
    const trimmedString = sanitizedString.slice(0, maxLength);
    
    return trimmedString;
}



export function formatPostCode(value: string): string {
    let filteredValue: string = value.replace(/[^0-9-]/g, '');

    if (filteredValue.length === 2 && !filteredValue.includes('-')) {
        filteredValue += '-';
    }

    let parts: string[] = filteredValue.split('-');

    parts[0] = parts[0].substring(0, 2); 
    if (parts.length > 1) {
        parts[1] = parts[1].substring(0, 3);  
    }

    return parts.join(parts.length > 1 ? '-' : '');
}

export function formatPhoneNumber(value: string): string {
    const onlyNums: string = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 9)}`;
}

export function formatNumericField(value: string): string {
    return value.slice(0, 6).replace(/[^0-9]/g, '');
}

export function formatEmailInput(value: string): string {
    let sanitized: string = value.replace(/[^a-zA-Z0-9@.]/g, '');

    const atSigns: RegExpMatchArray | [] = sanitized.match(/@/g) || [];
    if (atSigns.length > 1) {
        sanitized = sanitized.substring(0, sanitized.lastIndexOf('@')) + sanitized.substring(sanitized.lastIndexOf('@') + 1);
    }

    sanitized = sanitized.replace(/\.{2,}/g, '.');

    const parts: string[] = sanitized.split('@');
    if (parts.length === 2) {
        let domainPart: string = parts[1].replace(/[^a-zA-Z.]/g, '');
        domainPart = domainPart.replace(/\.{2,}/g, '.');
        const domainSections: string[] = domainPart.split('.');
        if (domainSections.length > 1) {
            domainSections[1] = domainSections[1].slice(0, 5);
        }
        parts[1] = domainSections.join('.');
    }
    return parts.join('@');
}

export const formatPasswordInput = (value: string): string => {
    const sanitizedValue = value.replace(/\s+/g, ''); 
    try {
        passwordValidation.validateSync(sanitizedValue);
      return sanitizedValue;
    } catch (error) {
        const validationError = error as ValidationError;
        console.error(validationError.errors);
        return sanitizedValue; 
      }
    };
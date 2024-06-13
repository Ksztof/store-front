import { ValidationError } from "yup";
import { passwordValidation } from "./validationSchemas";

export function capitalizeFirstLetterAndSetLength(string: string, maxLength: number): string {
    const alphaOnly: string = string.replace(/[^a-zA-Z]/g, '');
    const trimmedString: string = alphaOnly.slice(0, maxLength);
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

export const formatEmailInput = (email: string) => {
    email = email.replace(/[^a-zA-Z0-9@.]/g, '');

    const atIndex: number = email.indexOf('@');
    if (atIndex !== -1) {
        email = email.slice(0, atIndex + 1) + email.slice(atIndex + 1).replace(/@/g, '');
    }

    email = email.replace(/\.{2,}/g, '.');

    const parts: string[] = email.split('@');
    const localPart: string = parts[0] || '';
    const domainPart: string | undefined = parts[1];
    if (!localPart || !/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/.test(localPart)) {
        return localPart || ''; 
    }

    if (!domainPart) return localPart + (atIndex !== -1 ? '@' : '');

    if (!/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}$/.test(domainPart)) {
        return `${localPart}@${domainPart}`;
    }

    return `${localPart}@${domainPart}`;
};


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
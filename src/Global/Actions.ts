import { format, isValid, parse } from "date-fns";

export const formatDate = (date: Date): string => {
    // if (isValid(date)) {
    return format(date, "MM/dd/yyyy hh:mm:ss aa");
    // } else return "0";
};

export const parseDate = (dateFormatted: string): Date => {
    return parse(dateFormatted, "MM/dd/yyyy hh:mm:ss aa", new Date());
};

export const isEmptyObject = (object: Object) => {
    if (Object.keys(object).length === 0) {
        return true;
    } else {
        return false;
    }
};

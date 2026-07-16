export interface Operator {
    id: string;
    label: string;
    syntax: string;
    placeholder?: string;
    category: string;
}


export const operators: Operator[] = [

    {
        id: "site",
        label: "Site",
        syntax: "site:",
        placeholder: "example.com",
        category: "Basic"
    },

    {
        id: "filetype",
        label: "File Type",
        syntax: "filetype:",
        placeholder: "pdf",
        category: "Files"
    },

    {
        id: "intitle",
        label: "In Title",
        syntax: "intitle:",
        placeholder: "admin",
        category: "Content"
    },

    {
        id: "inurl",
        label: "In URL",
        syntax: "inurl:",
        placeholder: "login",
        category: "URL"
    }

]
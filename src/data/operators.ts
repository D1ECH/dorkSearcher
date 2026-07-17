export interface Operator {
    id: string;
    label: string;
    syntax: string;
    placeholder?: string;
    category: string;
    type: "prefix" | "separator" | "modifier" | "logical";
    description?: string;
}


export const operators: Operator[] = [

    // ─── Basic ───
    {
        id: "site",
        label: "Site",
        syntax: "site:",
        placeholder: "example.com",
        category: "Basic",
        type: "prefix",
        description: "Search within a specific site or domain"
    },
    {
        id: "filetype",
        label: "File Type",
        syntax: "filetype:",
        placeholder: "pdf",
        category: "Basic",
        type: "prefix",
        description: "Search for a specific file type"
    },
    {
        id: "ext",
        label: "Extension",
        syntax: "ext:",
        placeholder: "doc | pdf | xls",
        category: "Basic",
        type: "prefix",
        description: "Search by file extension (alternative to filetype)"
    },

    // ─── Content ───
    {
        id: "intext",
        label: "In Text",
        syntax: "intext:",
        placeholder: "keyword",
        category: "Content",
        type: "prefix",
        description: "Search for keywords in the page body text"
    },
    {
        id: "allintext",
        label: "All In Text",
        syntax: "allintext:",
        placeholder: "keyword1 keyword2",
        category: "Content",
        type: "prefix",
        description: "All keywords must appear in the page body"
    },
    {
        id: "intitle",
        label: "In Title",
        syntax: "intitle:",
        placeholder: "admin",
        category: "Content",
        type: "prefix",
        description: "Search for keywords in the page title"
    },
    {
        id: "allintitle",
        label: "All In Title",
        syntax: "allintitle:",
        placeholder: "keyword1 keyword2",
        category: "Content",
        type: "prefix",
        description: "All keywords must appear in the page title"
    },

    // ─── URL ───
    {
        id: "inurl",
        label: "In URL",
        syntax: "inurl:",
        placeholder: "login",
        category: "URL",
        type: "prefix",
        description: "Search for keywords in the URL"
    },
    {
        id: "allinurl",
        label: "All In URL",
        syntax: "allinurl:",
        placeholder: "keyword1 keyword2",
        category: "URL",
        type: "prefix",
        description: "All keywords must appear in the URL"
    },

    // ─── Links ───
    {
        id: "link",
        label: "Link",
        syntax: "link:",
        placeholder: "example.com",
        category: "Links",
        type: "prefix",
        description: "Find pages linking to a specific URL"
    },
    {
        id: "inanchor",
        label: "In Anchor",
        syntax: "inanchor:",
        placeholder: "keyword",
        category: "Links",
        type: "prefix",
        description: "Search in link anchor text"
    },
    {
        id: "allinanchor",
        label: "All In Anchor",
        syntax: "allinanchor:",
        placeholder: "keyword1 keyword2",
        category: "Links",
        type: "prefix",
        description: "All keywords must be in anchor text"
    },

    // ─── Cache & Related ───
    {
        id: "cache",
        label: "Cache",
        syntax: "cache:",
        placeholder: "www.example.com",
        category: "Cache & Related",
        type: "prefix",
        description: "View Google's cached version of a page"
    },
    {
        id: "related",
        label: "Related",
        syntax: "related:",
        placeholder: "www.example.com",
        category: "Cache & Related",
        type: "prefix",
        description: "Find sites similar to a given URL"
    },

    // ─── Date & Range ───
    {
        id: "before",
        label: "Before Date",
        syntax: "before:",
        placeholder: "2020-01-01",
        category: "Date & Range",
        type: "prefix",
        description: "Search for results before a specific date"
    },
    {
        id: "after",
        label: "After Date",
        syntax: "after:",
        placeholder: "2020-01-01",
        category: "Date & Range",
        type: "prefix",
        description: "Search for results after a specific date"
    },
    {
        id: "numrange",
        label: "Number Range",
        syntax: "numrange:",
        placeholder: "100-200",
        category: "Date & Range",
        type: "prefix",
        description: "Search for numbers within a specific range"
    },

    // ─── Blog ───
    {
        id: "inpostauthor",
        label: "In Post Author",
        syntax: "inpostauthor:",
        placeholder: "John Doe",
        category: "Blog",
        type: "prefix",
        description: "Search blog posts by author"
    },
    {
        id: "allinpostauthor",
        label: "All In Post Author",
        syntax: "allinpostauthor:",
        placeholder: "John Doe",
        category: "Blog",
        type: "prefix",
        description: "All authors must match (blog search)"
    },

    // ─── Logical Operators ───
    {
        id: "or",
        label: "OR",
        syntax: " | ",
        placeholder: "term1 | term2",
        category: "Logical",
        type: "separator",
        description: "Search for either term (OR logic)"
    },
    {
        id: "and",
        label: "AND",
        syntax: " & ",
        placeholder: "term1 & term2",
        category: "Logical",
        type: "separator",
        description: "Search for both terms (AND logic)"
    },
    {
        id: "exclude",
        label: "Exclude",
        syntax: "-",
        placeholder: "term",
        category: "Logical",
        type: "modifier",
        description: "Exclude results containing this term"
    },
    {
        id: "include",
        label: "Include",
        syntax: "+",
        placeholder: "term",
        category: "Logical",
        type: "modifier",
        description: "Force inclusion of a term"
    },

    // ─── Special ───
    {
        id: "exact",
        label: "Exact Phrase",
        syntax: "\"",
        placeholder: "exact phrase",
        category: "Special",
        type: "prefix",
        description: "Search for an exact phrase in quotes"
    },
    {
        id: "synonym",
        label: "Synonym",
        syntax: "~",
        placeholder: "word",
        category: "Special",
        type: "modifier",
        description: "Include synonyms of the search term"
    },
    {
        id: "wildcard",
        label: "Wildcard",
        syntax: "*",
        placeholder: "word*",
        category: "Special",
        type: "modifier",
        description: "Match any word or unknown part"
    },

]

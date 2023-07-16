import { DSEP_SEARCH_FILTER } from './types';
export declare const contextGenerator: (transactionId: string, action: string, bap_uri: string, bap_id: string) => {
    transaction_id: string;
    message_id: string;
    action: string;
    timestamp: Date;
    domain: string;
    country: string;
    city: string;
    core_version: string;
    bap_uri: string;
    bap_id: string;
};
export declare const generateOrder: (action: string) => void;
export declare const intentGenerator: (intentFilters: DSEP_SEARCH_FILTER) => {
    intent: {
        provider: {
            descriptor: {
                name: string;
            };
        };
        item: {
            descriptor: {
                name: string;
            };
            price: {
                currency: string;
                minimum_value: string;
                maximum_value: string;
            };
            rating: string | number;
            tags: {
                display: boolean;
                descriptor: {
                    name: string;
                };
                list: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        category: {
            descriptor: {
                name: string;
            };
        };
        fulfillment: {
            type: string;
            customer: {
                person: {
                    contact: {
                        tags: {
                            email: string;
                        };
                    };
                };
            };
            agent: {
                name: string;
            };
        };
    };
};
export declare const catalogueGenerator: (query: string, response: ReadonlyArray<DSEP_SEARCH_FILTER>) => {
    catalogue: {
        descriptor: {
            name: string;
        };
        providers: {
            id: string;
            descriptor: {
                name: string;
            };
            items: any;
        }[];
    };
};

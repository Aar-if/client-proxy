"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogueGenerator = exports.intentGenerator = exports.generateOrder = exports.contextGenerator = void 0;
const contextGenerator = (transactionId, action, bap_uri, bap_id) => {
    return {
        transaction_id: transactionId,
        message_id: transactionId,
        action: action,
        timestamp: new Date(Date.now()),
        domain: 'dsep:courses',
        country: 'IND',
        city: '',
        core_version: '0.9.3',
        bap_uri: bap_uri,
        bap_id: bap_id,
    };
};
exports.contextGenerator = contextGenerator;
const generateOrder = (action) => {
    switch (action) {
        case 'select':
            break;
        case 'init':
            break;
        case 'confirm':
            break;
        default:
            break;
    }
};
exports.generateOrder = generateOrder;
const intentGenerator = (intentFilters) => {
    return {
        intent: {
            provider: {
                descriptor: {
                    name: intentFilters.provider,
                },
            },
            item: {
                descriptor: {
                    name: intentFilters.query,
                },
                price: {
                    currency: 'INR',
                    minimum_value: intentFilters.min_price,
                    maximum_value: intentFilters.max_price,
                },
                rating: intentFilters.rating ? intentFilters.rating : 0,
                tags: [
                    {
                        display: false,
                        descriptor: {
                            name: 'Course Description Meta Data',
                        },
                        list: [
                            { name: 'course_level', value: intentFilters.course_level },
                            { name: 'course_mode', value: intentFilters.course_mode },
                            { name: 'competency', value: intentFilters.competency },
                            { name: 'exams', value: intentFilters.exams },
                            { name: 'subjects', value: intentFilters.subjects },
                            { name: 'domain', value: intentFilters.domain },
                            { name: 'goal', value: intentFilters.goal },
                            { name: 'language', value: intentFilters.language },
                            { name: 'contentType', value: intentFilters.contentType },
                            { name: 'theme', value: intentFilters.theme },
                            {
                                name: 'isCertified',
                                value: intentFilters.isCertified === false ? 'N' : 'Y',
                            },
                            {
                                name: 'course_credits',
                                value: intentFilters.course_credits === false ? 'N' : 'Y',
                            },
                            { name: 'course_duration', value: intentFilters.course_duration },
                        ],
                    },
                ],
            },
            category: {
                descriptor: {
                    name: intentFilters.course_category,
                },
            },
            fulfillment: {
                type: intentFilters.course_type,
                customer: {
                    person: {
                        contact: {
                            tags: {
                                email: intentFilters.seller_email,
                            },
                        },
                    },
                },
                agent: {
                    name: intentFilters.seller_name,
                },
            },
        },
    };
};
exports.intentGenerator = intentGenerator;
const catalogueGenerator = (query, response) => {
    const providerWise = {};
    response.map((item) => {
        if (!providerWise[item.provider]) {
            providerWise[item.provider] = [item];
        }
        else {
            providerWise[item.provider].push(item);
        }
    });
    return {
        catalogue: {
            descriptor: {
                name: `Catalogue for search query: ${query}`,
            },
            providers: Object.keys(providerWise).map((provider) => {
                return {
                    id: provider,
                    descriptor: {
                        name: provider,
                    },
                    items: providerWise[provider].map((item) => {
                        return {
                            id: item.id,
                            descriptor: {
                                name: item.name,
                            },
                            price: {
                                currency: 'INR',
                                value: item.maximum_value,
                                maximum_value: item.maximum_value,
                                minimum_value: item.minimum_value,
                            },
                            provider: {
                                id: provider,
                            },
                            fulfilments: {
                                type: item.course_type,
                            },
                            tags: {
                                course_level: item.course_level,
                                competency: item.competency,
                                exams: item.exams,
                                subjects: item.subjects,
                                isCertified: item.isCertified ? 'Y' : 'N',
                            },
                        };
                    }),
                };
            }),
        },
    };
};
exports.catalogueGenerator = catalogueGenerator;
//# sourceMappingURL=generators.js.map
import { ApolloError, isApolloError } from '@apollo/client';
import { AxiosError, isAxiosError } from 'axios';

const errorsStringify = (e: any): string => {
    const {
        networkError,
        graphQLErrors,
        message
    } = e;

    if (isApolloError(e) && graphQLErrors.length) {
        const msg = [];
        for (const gQlI of graphQLErrors) {
            const { message: gqlm, status } = gQlI;
            if (status === 406) {
                msg.push(gqlm?.message || gqlm);
                break;
            }
            msg.push(gqlm?.message || gqlm);
        }

        return msg.join('\n');
    }

    if (isAxiosError(e)) {
        return e?.response?.data?.message || e?.message;
    }

    if (networkError?.result?.errors?.length) return networkError.result.errors.map(({ message: nm }: { message: string }) => nm).join('\n');
    return message;
};

const getErrorStatus = (e: ApolloError | AxiosError): number => {
    const {   
        graphQLErrors
    } = e as any;
    let errorStatus;
    if (isApolloError(e) && graphQLErrors.length) {
        for (const gQlI of graphQLErrors) {
            const { providerStatus, status } = gQlI;
            errorStatus = status || providerStatus;
        }
    } else if (isAxiosError(e)) {
        const { 
            response: {
                status = ''
            } = {}
        } = e as any;
        errorStatus = status;
    }

    return errorStatus;
};

errorsStringify.defaultProps = {
    networkError: {
        result: {
            errors: []
        }
    }
};

export {
    errorsStringify,
    getErrorStatus
};
